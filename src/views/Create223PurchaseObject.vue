<template>
    <div>
        <FormBase :formDeclaration="formDeclaration" @form-pick="pickFormValue"/>
        <SubjectClassSelectionModal
            title="Выбор КПГЗ" 
            :visible="isSubjClassModalVisible" 
            @close-modal="isSubjClassModalVisible = false"
            @select="selectSubjClass"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormBase from '@/views/FormBase2.vue'
import { IForm } from '@/views/FormAbstractions'
import FieldSection from '@/views/form-renderers/FieldSection.vue'
import ProvisionSection from '@/views/form-renderers/ProvisionSection.vue'
import TableSection from '@/views/form-renderers/TableSection.vue'
import SubjectClassSelectionModal from '@/views/modals/SubjectClassSelectionModal.vue'

@Component({ components: { FormBase, SubjectClassSelectionModal } })
export default class extends Vue {
    public isSubjClassModalVisible: boolean = false

    public subjectClassField = {
        property: 'subject-class',
        title: 'КПГЗ',
        type: 'PICK',
        value: { key: "", desc: "" },
        visible: true, // todo - bind to prev selection
    }

    public formDeclaration: any = {
        header: "Новый объект закупки",
        stats: undefined,
        sections: [{
            name: "Содержание закупки",
            component: FieldSection,
            data: {
                columnCount: 2,
                columns: [{
                    rows: [{
                        property: 'law',
                        title: 'Закон-основание',
                        type: 'TEXT',
                        value: { desc: '44-ФЗ' },
                        editable: false,
                    }, {
                        property: 'customer',
                        title: 'Заказчик',
                        type: 'TEXT',
                        value: { desc: 'ГАУЗ СП № 11 ДЗМ' },
                        editable: false
                    }, {
                        property: 'payment-size',
                        title: 'Закупка малого объема',
                        type: 'RADIO_SELECT',
                        editable: false,
                        value: { key: 'no', desc: 'Нет' },

                        selectOptions: [
                            { key: 'no', desc: 'Нет' },
                            { key: 'aggregated', desc: 'Агрегированная закупка (не включается в план закупок)' },
                        ]
                    }, this.subjectClassField]
                }]
            }
        }, {
            name: "Финансовое обеспечение закупки",
            component: ProvisionSection
        }, {
            name: "История изменений",
            component: TableSection,
            data: {
                headers: [
                    { title: "Пользователь" },
                    { title: "Дата и время изменения" },
                    { title: "Статус" },
                    { title: "Время выполнения операции" }
                ],
                items: [{}, {}]
            }
        }]
    }

    public pickFormValue(property: string) {
        switch (property) {
            case 'subject-class':
                this.isSubjClassModalVisible = true
                break;
        }
    }

    public selectSubjClass(subjClass: any) {
        this.subjectClassField.value = {key: subjClass.id, desc: subjClass.desc }
    }
}
</script>