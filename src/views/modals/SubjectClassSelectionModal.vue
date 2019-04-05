<template>
    <Modal @close-modal="$emit('close-modal')" :visible="visible" :title="title">
        <div class="subj-modal">
            <div class="subj-selection">
                <input class="subj-class-filter" type="text" placeholder="Наименование / Код КПГЗ" v-model="filter" @input="resetItemsCollapse"/>
                <TreeView 
                    :dataset="entries" 
                    :filterArg="filter"
                    :predicate="subjClassPredicate"
                    @toggle-item="entries[$event].collapsed = !entries[$event].collapsed">
                    <template v-slot="{ item }">
                        <label class="subj-class-selector">
                            <input type="radio" name="selected-subj-class" @change="selectItemAndDeselectOther(item)"/>
                            <div>{{item.id}} {{item.desc}}</div>
                        </label>
                    </template>
                </TreeView>
            </div>
            <div class="subj-modal-footer">
                <Button title="Заявка на КПГЗ"
                        color="green" />
                <Button title="Полный справочник КПГЗ"
                        color="green" />
                <div class="actions-spacing"/>
                <Button title="Выбрать"
                        color="green" 
                        @click="selectItemAndExit"/>
                <Button :icon="{ type: 'CLASS', name: 'close'}" @click="$emit('close-modal')"/>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import TreeView from '@/components/TreeView.vue'

interface ISubjectClass {
    id: string
    desc: string
    collapsed: boolean
    selected: boolean
}

@Component({ components: { Modal, Button, TreeView }})
export default class extends Vue {
    @Prop() private title!: string
    @Prop() private visible!: boolean

    private entries: ISubjectClass[] = []
    private filter: string = ""

    private mounted() {
        fetch('http://192.168.10.20:5000/api/directory/subjectClasses')
            .then(response => response.json())
            .then(response => {
                this.entries = response
                    .sort((x: any, y: any) => x.code > y.code ? 1 : -1)
                    .map((x: any) => ({id: x.code, desc: x.description, collapsed: true, selected: false, level: x.code.split('.').length }))
            })
    }

    private subjClassPredicate(item: any, filter: string) {
        return filter === null || filter.length < 3 || item.desc.toLowerCase().includes(filter.toLowerCase())
    }

    private resetItemsCollapse() {
        for (const item of this.entries) {
            item.collapsed = !this.filter || this.filter.length < 3
        }
    }

    private selectItemAndDeselectOther(selected: any) {
        for (const item of this.entries) {
            item.selected = item === selected;
        }
    }

    private selectItemAndExit() {
        for (const item of this.entries) {
            if (item.selected) {
                this.$emit('select', item)
                break
            }
        }
        this.$emit('close-modal')
    }
}
</script>

<style scoped>
.subj-modal {
    display: flex;
    flex-direction: column;
    max-height: 100%;
}

.subj-class-selector {
    display: flex;
    align-items: center;

    font-size: 13px;
    font-family: Tahoma;
}

.subj-class-selector > input {
    margin: 0 5px 0 0;
}

.subj-class-filter { 
    width: 100%;
    box-sizing: border-box; 
    margin-bottom: 10px;
}

.subj-selection { 
    margin: 10px;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow-y: auto;
    flex-shrink: 100000; /* костыль для хрома */
}

.subj-modal-footer {
    border-top: 1px solid #ddd;
    padding: 10px;
    display: flex;
}

.subj-modal-footer .actions-spacing { flex-grow: 1; }
</style>