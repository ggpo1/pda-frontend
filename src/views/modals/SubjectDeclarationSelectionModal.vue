<template>
    <Modal @close-modal="$emit('close-modal')" :visible="visible" :title="title">
        <div class="subj-modal">
            <div class="subj-selection">
                <DataTable 
                    :dataset="entries" 
                    :headers="headers"
                    :enableSelection="true"
                    :selected="selectedDecl"
                    @selected="selectSource">
                </DataTable>
            </div>
            <div class="subj-modal-footer">
                <!-- <Button title="Заявка на КПГЗ"
                        color="green" />
                <Button title="Полный справочник КПГЗ"
                        color="green" /> -->
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
import DataTable from '@/components/DataTable.vue'
import { ITableColumn } from '@/components/TableAbstractions';

interface ISubjectDeclaration {
    id: string
    subjectClass: string
    subject: string
}

@Component({ components: { Modal, Button, DataTable }})
export default class extends Vue {
    @Prop() private title!: string
    @Prop() private visible!: boolean

    private entries: ISubjectDeclaration[] = []
    private selectedDecl: ISubjectDeclaration | null = null

    private headers: ITableColumn[] = [{
        title: "Код КПГЗ",
        filter: "TEXT",
        getter: (v: ISubjectDeclaration) => v.subjectClass
    }, {
        title: "Наименование",
        filter: "TEXT",
        getter: (v: ISubjectDeclaration) => v.subject
    }]

    private mounted() {
        fetch('http://192.168.10.20:5000/api/directory/subjectDeclarations')
            .then(response => response.json())
            .then(response => this.entries = response)
    }

    private subjClassPredicate(item: any, filter: string) {
        return filter === null || filter.length < 3 || item.desc.toLowerCase().includes(filter.toLowerCase())
    }

    private selectItemAndExit() {
        if (this.selectedDecl)
            this.$emit('select', this.selectedDecl)
        this.$emit('close-modal')
    }

    private selectSource(decl: ISubjectDeclaration) { this.selectedDecl = decl }
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