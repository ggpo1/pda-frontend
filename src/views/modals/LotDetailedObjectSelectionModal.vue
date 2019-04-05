<template>
    <Modal @close-modal="$emit('close-modal')" :visible="visible" title="Выбор детализированного объекта">
        <div class="selection">
            <div class="prov-selection">
                <DataTable class="table"
                    :headers="tableHeaders"
                    :dataset="limits"
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

    private tableHeaders: ITableColumn[] = [{
        title: 'Реестровый номер',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.chapterCode }
    }, {
        title: 'КПГЗ',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.sectionCode }
    }, {
        title: 'Описание',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.targetExpenseAccount }
    }, {
        title: 'Код финансирования',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.expenseKind }
    }, {
        title: 'Стоимость',
        filter: 'TEXT',
        getter(row: ILimitSource) { return row.govOperationClass }
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