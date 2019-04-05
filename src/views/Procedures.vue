<template>
    <div>
        <SingleTableView
            header="Все процедуры"
            :canAdd="true" 
            :canFilter="true"
            :canSync="true"
            :canSearch="true"
            :headers="[{title: 'foo', property: 'foo', filter: { type: 'TEXT' }}, 
                       {title: 'bar', property: 'bar', filter: { type: 'SELECT', options: [{key: 'a', value: 'a-value'}, {key: 'b', value: 'b-value'}] }},
                       {title: 'baz', property: 'baz', filter: { type: 'DATE' }}]"
            :dataset="[{foo: 1, bar: 'barbar'}, {foo: 2, bar: 'barbar'}]"
            @add-object="addProc"/>

            <Modal @close-modal="isAddObjectModalVisible = false" :visible="isAddObjectModalVisible" title="Выбор закона-основания">
            <div>
                <div class="subj-law-selection">
                    <div>Закон-основание:</div>
                    <label>
                        <input type="radio" name="selectedLawType" value="44" v-model="selectedLaw"/>
                        44-ФЗ
                    </label>
                    <label>
                        <input type="radio" name="selectedLawType" value="223" v-model="selectedLaw"/>
                        223-ФЗ
                    </label>
                </div>
                <div class="subj-modal-footer">
                    <Button title="Создать"
                            color="green" 
                            @click="confirmAdd"/>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SingleTableView from '@/components/SingleTableView.vue'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import router from '@/router'

@Component({ components: { SingleTableView, Modal, Button } })
export default class Procedures extends Vue {
    private isAddObjectModalVisible: boolean = false
    private selectedLaw: string = "44"

    private addProc() {
        this.isAddObjectModalVisible = true
    }

    private confirmAdd() {
        if (this.selectedLaw == "44")
            router.push("/procedures/create44proc");
        
        this.isAddObjectModalVisible = false
    }
}
</script>