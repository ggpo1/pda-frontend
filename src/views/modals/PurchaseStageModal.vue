<template>
    <Modal @close-modal="$emit('close-modal')" :visible="visible" title="Новая дата оплаты">
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

interface IPurchaseStage {
    purchaseStage: Date
    percent: any
    purchase: string
}

@Component({ components: { Modal, Button, TreeView, FormTable, DataTable }})
export default class extends Vue {
    @Prop() private visible!: boolean
    @Prop({default: null}) private selected!: IUsedSource | null

    private source: IPurchaseStage = {
        purchaseStage: new Date(),
        percent: undefined,
        purchase: "0,00 Российский рубль"
    }

    private limits: ILimitSource[] = []
    private finActions: IFinancialActionSource[] = []
    private ownFunds: IOwnFundsSource[] = []

    private selectSource(src: IFinancialSource) {
        // this.source.selectedSource = src
    }


    private formColumns: IColumn[] = [{
        rows: [{
            id: 'sourceType',
            title: 'Дата платежа',
            visible: true,
            type: 'DATE_PICKER',

            getter(src: IPurchaseStage) {  },
            setter(src: IPurchaseStage) {  }
        }, {
            id: 'percent',
            title: 'Процент от НМЦ контракта',
            visible: true,
            type: 'TEXT',

            getter(src: IPurchaseStage) { return src.percent },
            setter(src: IPurchaseStage, val: string) { src.percent = val }
        }, {
            title: 'Сумма платежа',
            type: 'TEXT',
            editable: false,

            getter(src: IPurchaseStage) { return src.purchase },
            setter(src: IPurchaseStage, val: string) {  }
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