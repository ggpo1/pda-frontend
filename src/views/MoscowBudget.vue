<template>
    <div>
        <HeadTitle header="Бюджет города Москвы" />

        <SingleTableView
            header="Дата обновления информации из АСУ ГФ: ДАТА"
            :canAdd="true"
            :canFilter="true"
            :greenAddButton="true"
            :headers="[{title: 'foo', property: 'foo', filter: { type: 'TEXT' }}, 
                       {title: 'bar', property: 'bar', filter: { type: 'SELECT', options: [{key: 'a', value: 'a-value'}, {key: 'b', value: 'b-value'}] }},
                       {title: 'baz', property: 'baz', filter: { type: 'DATE' }}]"
            :dataset="[{foo: 1, bar: 'barbar'}, {foo: 2, bar: 'barbar'}]"
            @add-object="addObject"/>
            <Modal @close-modal="isAddObjectModalVisible = false" :visible="isAddObjectModalVisible" title="Новая запись в бюджете">
            <div>
                <div class="subj-modal-fields">
                    <FormField fieldTitle="Код главы" isRequired="true"/>
                    <FormField fieldTitle="Раздел/Подраздел" isRequired="true"/>
                    <FormField fieldTitle="ЦСР" isRequired="true"/>
                    <FormField fieldTitle="ВР" isRequired="true"/>
                    <FormField fieldTitle="КОСГУ" isRequired="true"/>
                    <FormField fieldTitle="Сумма средств ГРБС" isRequired="true"/>
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
import HeadTitle from '@/components/HeadTitle.vue'
import SingleTableView from '@/components/SingleTableView.vue'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import FormField from '@/components/FormField.vue'
import router from '@/router'

@Component({ components: { SingleTableView, HeadTitle, Modal, Button, FormField } })
export default class MoscowBudget extends Vue {
    private isAddObjectModalVisible: boolean = false
    
    private addObject() {
        this.isAddObjectModalVisible = true
    }


}
</script>

<style scoped>
.subj-modal-footer {
    border-top: 1px solid #ddd;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
}
.subj-modal-fields{
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 94%;
    padding-left: 30px;
}
</style>

