<template>
    <Modal @close-modal="$emit('close-modal')" :visible="visible" title="Загрузка документации лота">
        <div class="selection">
            <div class="prov-selection">
                <div style="overflow: hidden">
                    <FormTable :columns="formColumns" :columnCount="2" :source="source"
                        @set-value="setFormValue"/>
                </div>
            </div>
            <div class="modal-footer">
                <Button title="Выбрать"
                    color="green" 
                    @click="selectItemAndExit"/>
                <div class="actions-spacing"/>
                <Button color="red" :icon="{ type: 'CLASS', name: 'close'}" @click="$emit('close-modal')"/>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import TreeView from '@/components/TreeView.vue'
import FormTable from '@/components/FormTable.vue'
import DataTable from '@/components/DataTable.vue'
import { IColumn, ISetValueEvent } from '@/components/form-table/FormFields'
import { ILimitSource, IOwnFundsSource, IFinancialActionSource, IFinancialSource, FinancialSourceType, IUsedSource } from '@/models/FinancialSource'
import { ITableColumn } from '@/components/TableAbstractions';

enum ProvisionType {
    FIN_ACTIONS = 'FIN_ACTIONS',
    OWN_FUNDS = 'OWN_FUNDS',
    MOSCOW_BUDGET = 'MOSCOW_BUDGET',
    FEDERAL_FUNDS = 'FEDERAL_FUNDS'
}

interface IUploadDocument {
    documentType: string
    documentInfo: string
    document: any
}

const enum SourceType {
    CONTRACT_PROJECT = "CONTRACT_PROJECT",
    TECH_SPECS = "TECH_SPECS",
    MSV_CALC = "MSV_CALC",
    MSV_PROTOCOL = "MSV_PROTOCOL",
    PRODUCT_REQUIREMENTS = "PRODUCT_REQUIREMENTS",
    PRESENTATION_MATERIALS = "PRESENTATION_MATERIALS",
    EXPLANATORY_NOTE = "EXPLANATORY_NOTE",
    EXPECTING_EFFECT_INFO = "EXPECTING_EFFECT_INFO",
    MSV_CALC_INFO = "MSV_CALC_INFO",
    MSV_EXPLANATION = "MSV_EXPLANATION",
    PROJECT_DOCS = "PROJECT_DOCS",
    REQUEST_EVALUATION_PROCEDURE = "REQUEST_EVALUATION_PROCEDURE",
    PRODUCT_INFO = "PRODUCT_INFO",
    OTHER = "OTHER",
    TECH_SPECS_APPLICATIONS = "TECH_SPECS_APPLICATIONS",
    PAYMENT_ORDER_FORM = "PAYMENT_ORDER_FORM",
    BANK_WARRANTY_FORM = "BANK_WARRANTY_FORM",
    PURCHASE_APPROVE_REQUEST = "PURCHASE_APPROVE_REQUEST",
    CONCLUSION_CONFIRMATION_DOC = "CONCLUSION_CONFIRMATION_DOC",
    REQUEST_EXPLANATORY_LETTER = "REQUEST_EXPLANATORY_LETTER",
    CONTRACT_COPY = "CONTRACT_COPY"
}

@Component({ components: { Modal, Button, TreeView, FormTable, DataTable }})
export default class extends Vue {
    @Prop() private visible!: boolean
    @Prop({default: null}) private selected!: IUsedSource | null

    private source: IUploadDocument = {
        documentType: "",
        documentInfo: "",
        document: ""
    }

    private limits: ILimitSource[] = []
    private finActions: IFinancialActionSource[] = []
    private ownFunds: IOwnFundsSource[] = []

    private selectSource(src: IFinancialSource) {
        // this.source.selectedSource = src
    }

    // todo: move to model

    private formColumns: IColumn[] = [{
        rows: [{
            id: 'sourceType',
            title: 'Тип финансирования',
            visible: true,
            type: 'SELECT',
            selectOptions: [
                { key: SourceType.CONTRACT_PROJECT, desc: 'Проект контракта' },
                { key: SourceType.TECH_SPECS, desc: 'Техническое задание' },
                { key: SourceType.MSV_CALC, desc: 'Расчет НМЦ' },
                { key: SourceType.MSV_PROTOCOL, desc: 'Протокол НМЦ' },
                { key: SourceType.PRODUCT_REQUIREMENTS, desc: 'Требования к товарам' },
                { key: SourceType.PRESENTATION_MATERIALS, desc: 'Краткие презентационные материалы' },
                { key: SourceType.EXPLANATORY_NOTE, desc: 'Пояснительная записка' },
                { key: SourceType.EXPECTING_EFFECT_INFO, desc: 'Информация по ожидаемому социально-экономическому эффекту' },
                { key: SourceType.MSV_CALC_INFO, desc: 'Информационные материалы по расчету НМЦ' },
                { key: SourceType.MSV_EXPLANATION, desc: 'Обоснование НМЦ' },
                { key: SourceType.PROJECT_DOCS, desc: 'Проектно-сметная документация' },
                { key: SourceType.REQUEST_EVALUATION_PROCEDURE, desc: 'Порядок оценки заявок по критериям' },
                { key: SourceType.PRODUCT_INFO, desc: 'Сведения о товаре (форма №2)' },
                { key: SourceType.OTHER, desc: 'Другое' },
                { key: SourceType.TECH_SPECS_APPLICATIONS, desc: 'Приложения к Техническому заданию' },
                { key: SourceType.PAYMENT_ORDER_FORM, desc: 'Форма платежного поручения' },
                { key: SourceType.BANK_WARRANTY_FORM, desc: 'Форма банковской гарантии' },
                { key: SourceType.PURCHASE_APPROVE_REQUEST, desc: 'Запрос на согласование закупки ответственным отраслевым ОИВ' },
                { key: SourceType.CONCLUSION_CONFIRMATION_DOC, desc: 'Документ для подтверждения бумажного заключения' },
                { key: SourceType.REQUEST_EXPLANATORY_LETTER, desc: 'Пояснительное письмо о причинах подачи заявки на подтверждение' },
                { key: SourceType.CONTRACT_COPY, desc: 'Копии договоров (соглашений), в соответствии со ст.15 44-ФЗ' }
            ],

            getter(src: IUploadDocument) {  },
            setter(src: IUploadDocument, type: ProvisionType) {  }
        }, {
            title: 'Примечание',
            visible: true,
            type: 'MULTILINE_TEXT',

            getter(src: IUploadDocument) {  },
            setter(src: IUploadDocument, val: string) {  }
        }, {
            title: 'Документ',
            type: 'FILE',

            getter(src: any) { return "" },
            setter(src: any, val: any) {  }
        },{
            title: 'Допустимые типы файлов: doc, docx, xls, xlsx, pdf, tiff, jpg, jpeg, zip, rar. Максимальный размер файла - 50 МБ',
            type: 'TEXT',

            getter(src: any) { return "" },
            setter(src: any, val: any) {  }
        }]
    }]

    public selectItemAndExit() {
        this.$emit('close-modal')
    }

    public setFormValue(e: ISetValueEvent) { 
        e.row.setter(this.source, e.value)
    }
}
</script>

<style scoped>
.selection {
    display: flex;
    flex-direction: column;
}

.prov-selection {
    margin: 30px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-shrink: 100000; /* костыль для хрома */
}

.prov-selection > * {
    flex-shrink: 0;
}

.table {
    margin: 15px 0 0 0;
}

.modal-footer {
    border-top: 1px solid #ddd;
    padding: 10px;
    display: flex;
}

.modal-footer .actions-spacing { flex-grow: 1; }
</style>