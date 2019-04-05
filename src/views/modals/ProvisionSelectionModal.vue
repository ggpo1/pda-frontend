<template>
    <Modal @close-modal="$emit('close-modal')" :visible="visible" title="Выбор финансирования">
        <div class="selection">
            <div class="prov-selection">
                <div style="overflow: hidden">
                    <FormTable :columns="formColumns" :columnCount="2" :source="source"
                        @set-value="setFormValue" state="ENABLED"/>
                </div>
                <DataTable class="table" v-if="source.type === 'MOSCOW_BUDGET'"
                    :headers="limitsHeaders"
                    :dataset="limits"
                    :enableSelection="true"
                    :selected="source.selectedSource"
                    @selected="selectSource"/>
                <DataTable class="table" v-if="source.type === 'FEDERAL_FUNDS'"
                    :headers="limitsHeaders"
                    :dataset="limits"
                    :enableSelection="true"
                    :selected="source.selectedSource"
                    @selected="selectSource"/>
                <DataTable class="table" v-if="source.type === 'FIN_ACTIONS'"
                    :headers="finActionsHeaders"
                    :dataset="finActions"
                    :enableSelection="true"
                    :selected="source.selectedSource"
                    @selected="selectSource"/>
                <DataTable class="table" v-if="source.type === 'OWN_FUNDS'"
                    :headers="ownFundsHeaders"
                    :dataset="ownFunds"
                    :enableSelection="true"
                    :selected="source.selectedSource"
                    @selected="selectSource"/>
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

interface IProvisionSelection {
    type: ProvisionType
    amount: number
    year: number
    selectedSource: IFinancialSource | null
}

@Component({ components: { Modal, Button, TreeView, FormTable, DataTable }})
export default class extends Vue {
    @Prop() private visible!: boolean
    @Prop({default: null}) private selected!: IUsedSource | null

    private source: IProvisionSelection = {
        type: ProvisionType.FIN_ACTIONS,
        amount: 0,
        year: 2019,
        selectedSource: null
    }

    private limits: ILimitSource[] = []
    private finActions: IFinancialActionSource[] = []
    private ownFunds: IOwnFundsSource[] = []

    private selectSource(src: IFinancialSource) {
        this.source.selectedSource = src
    }

    private limitsHeaders: ITableColumn[] = [{
        title: 'Код главы',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.chapterCode }
    }, {
        title: 'Раздел/Подраздел',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.sectionCode }
    }, {
        title: 'ЦСР',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.targetExpenseAccount }
    }, {
        title: 'ВР',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.expenseKind }
    }, {
        title: 'КОСГУ',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.govOperationClass }
    }, {
        title: 'ТБД',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.territorialIncome }
    }, {
        title: 'Сумма лимита',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.total + "" }
    }, {
        title: 'Запланировано',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.used + "" }
    }, {
        title: 'Остаток',
        filter: 'TEXT',
        getter(row: ILimitSource) { return (row.total - row.used) + "" }
    }]
    private finActionsHeaders: ITableColumn[] = [{
        title: 'Код главы',
        filter: 'TEXT',
        getter(row: IFinancialActionSource) { return row.chapterCode }
    }, {
        title: 'КВР',
        filter: 'TEXT',
        getter(row: IFinancialActionSource) { return row.expenseKind }
    }, {
        title: 'КОСГУ',
        filter: 'TEXT',
        getter(row: IFinancialActionSource) { return row.govOperationClass }
    }, {
        title: 'Сумма лимита',
        filter: 'TEXT',
        getter(row: IFinancialActionSource) { return row.total + "" }
    }, {
        title: 'Запланировано',
        filter: 'TEXT',
        getter(row: IFinancialActionSource) { return row.used + "" }
    }, {
        title: 'Остаток',
        filter: 'TEXT',
        getter(row: IFinancialActionSource) { return (row.total - row.used) + "" }
    }]
    private ownFundsHeaders: ITableColumn[] = [{
        title: 'Наименование средств',
        filter: 'TEXT',
        getter(row: IOwnFundsSource) { return row.name }
    }, {
        title: 'Сумма лимита',
        filter: 'TEXT',
        getter(row: IOwnFundsSource) { return row.total + "" }
    }, {
        title: 'Запланировано',
        filter: 'TEXT',
        getter(row: IOwnFundsSource) { return row.used + "" }
    }, {
        title: 'Остаток',
        filter: 'TEXT',
        getter(row: IOwnFundsSource) { return (row.total - row.used) + "" }
    }]

    private formColumns: IColumn[] = [{
        rows: [{
            id: 'sourceType',
            title: 'Тип финансирования',
            visible: true,
            type: 'RADIO_SELECT',
            selectOptions: [
                { key: ProvisionType.MOSCOW_BUDGET, desc: 'Бюджет города Москвы' },
                { key: ProvisionType.FEDERAL_FUNDS, desc: 'Федеральные средства' },
                { key: ProvisionType.FIN_ACTIONS, desc: 'ПФХД' },
                { key: ProvisionType.OWN_FUNDS, desc: 'Собственные средства' }
            ],

            getter(src: IProvisionSelection) { return src.type },
            setter(src: IProvisionSelection, type: ProvisionType) { src.type = type }
        }, {
            title: 'Сумма закупки',
            visible: true,
            type: 'TEXT',

            getter(src: IProvisionSelection) { return src.amount },
            setter(src: IProvisionSelection, val: string) { src.amount = parseInt(val) }
        }]
    }, {
        rows: [{
            title: 'Год',
            visible: true,
            type: 'SELECT',
            selectOptions: [...Array(100 - 15 + 1).keys()].map((x: number) => ({ key: (x + 2015) + "", desc: (x + 2015) + "" })),

            getter(src: IProvisionSelection) { return src.year + "" },
            setter(src: IProvisionSelection, type: string) { src.year = parseInt(type) }
        }, {
            title: 'Текущий источник',
            visible: true,
            type: 'TEXT',
            editable: false,
            
            getter(src: IProvisionSelection) {
                if (src.selectedSource === null) return "";

                switch (src.selectedSource.type) {
                    case FinancialSourceType.OWN_FUNDS: 
                        const o = src.selectedSource as IOwnFundsSource
                        return o.name
                    case FinancialSourceType.LIMIT:
                        const l = src.selectedSource as ILimitSource
                        return `КБК: ${l.chapterCode}-${l.sectionCode}-${l.targetExpenseAccount}-${l.expenseKind}-${l.govOperationClass}`
                    case FinancialSourceType.FIN_ACTIONS:
                        const a = src.selectedSource as IFinancialActionSource
                        return `Код: ${a.expenseKind}-${a.govOperationClass}`
                }
            },
            setter(src: IProvisionSelection, type: string) { }
        }]
    }]

    private mounted() {
        this.requestSources()
    }

    @Watch("selected") private selectedSourceChanged() {
        this.source.amount = 0
        this.source.type = ProvisionType.FIN_ACTIONS
        this.source.year = 2019
        this.source.selectedSource = this.selected ? this.selected.source : null
        console.log(this.source.selectedSource)
    }

    private requestSources() {
        const method = 
            this.source.type === ProvisionType.FIN_ACTIONS 
                ? 'financialActions' 
                : this.source.type === ProvisionType.OWN_FUNDS ? 'ownFunds' : 'limits'
        fetch(`http://192.168.10.20:5000/api/finance/${method}`)
            .then(response => response.json())
            .then(response => {
                switch (this.source.type) {
                    case ProvisionType.FIN_ACTIONS:
                        this.finActions = response
                        break
                    case ProvisionType.OWN_FUNDS:
                        this.ownFunds = response
                        break
                    default:
                        this.limits = response
                        break
                }
            })
    }

    public selectItemAndExit() {
        if (this.source.selectedSource) {
            this.$emit('select', { source: this.source.selectedSource, amount: this.source.amount, year: this.source.year }, this.selected)
            this.source.selectedSource = null
        }
        this.$emit('close-modal')
    }

    public setFormValue(e: ISetValueEvent) { 
        e.row.setter(this.source, e.value)
        if (e.row.id === 'sourceType') this.requestSources()
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