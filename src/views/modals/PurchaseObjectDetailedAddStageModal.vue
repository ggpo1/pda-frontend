Mmd109<template>
    <Modal @close-modal="$emit('close-modal')" :visible="visible" title="Новый этап поставки">
        <div class="selection">
            <div class="prov-selection">
                <div style="overflow: hidden" class="section">                    
                    <FormTable id="first-field" :formStyle="'HORIZONTAL'" :columns="formColumns" :columnCount="2" :source="stage"
                        @set-value="setFormValue" state="ENABLED" class="padded-block"/>
                    <div class="section-header">Срок (период) поставки</div>
                    <div class="padded-block">
                        <RadioComponent radioGroup="supplyTerms" radioValue="relative" :selected="selectedSupplyTermsGroup === 'relative'"
                            @radio-select="selectSupplyTermsGroup">
                            <template v-slot="{selected}">
                                <div>
                                    <FormTable class="fields" :formStyle="'HORIZONTAL'" :columns="[{rows: relative}]" :columnCount="2" :source="stage"
                                        @set-value="setFormValue" :state="selected ? 'ENABLED' : 'DISABLED'"/>
                                </div>
                            </template>
                        </RadioComponent>
                        <div style="height: 15px"><!--spacing--></div>
                        <RadioComponent radioGroup="supplyTerms" radioValue="absolute" :selected="selectedSupplyTermsGroup === 'absolute'"
                            @radio-select="selectSupplyTermsGroup">
                            <template v-slot="{selected}">
                                <FormTable class="fields" :formStyle="'HORIZONTAL'" :columns="[{rows: absolute}]" :columnCount="2" :source="stage"
                                    @set-value="setFormValue" :state="selected ? 'ENABLED' : 'DISABLED'"/>
                            </template>
                        </RadioComponent>
                        <div style="height: 15px"><!--spacing--></div>
                        <RadioComponent :hideRadio="true">
                            <FormTable class="fields" :formStyle="'HORIZONTAL'" :columns="[{rows: conditions}]" :columnCount="2" :source="stage"
                                @set-value="setFormValue" state="ENABLED"/>
                        </RadioComponent>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="actions-spacing"/>
                <Button :icon="{ type: 'CLASS', name: 'save' }" @click="selectItemAndExit"/>
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
import FormBase from '@/views/FormBase2.vue'
import FormTable from '@/components/FormTable.vue'
import DataTable from '@/components/DataTable.vue'
import RadioComponent from '@/components/RadioComponent.vue'
import { IColumn, ISetValueEvent, IRow } from '@/components/form-table/FormFields'
import { ILimitSource, IOwnFundsSource, IFinancialActionSource, IFinancialSource, FinancialSourceType, IUsedSource } from '@/models/FinancialSource'
import { ITableColumn } from '@/components/TableAbstractions';
import { ISupplyStage, SupplyStagePeriodType, DayType } from '@/models/PurchaseObjectDetailedSpecification';

@Component({ components: { Modal, FormBase, Button, TreeView, FormTable, DataTable, RadioComponent }})
export default class extends Vue {
    @Prop() private visible!: boolean
    @Prop({default: null}) private selected!: ISupplyStage | null

    private createNewStage(): ISupplyStage { return {
        volume: 0,
        type: SupplyStagePeriodType.RELATIVE,
        relativePeriod: {
            startOffset: 0,
            startOffsetType: DayType.NORMAL,
            endOffset: 0,
            endOffsetType: DayType.NORMAL
        },
        absolutePeriod: {
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now())
        },
        conditions: "в соответствии с проектом Контракта и Техническим заданием"
    }}

    private newStage: ISupplyStage = this.createNewStage()

    private get stage(): ISupplyStage { return this.selected || this.newStage }

    private selectedSupplyTermsGroup: string = "relative"
    private selectSupplyTermsGroup(g: string, value: string) {
        console.log(value)
        this.selectedSupplyTermsGroup = value
    }

    private formColumns: IColumn[] = [{
        rows: [{
            title: 'Объём поставки',
            visible: true,
            type: 'TEXT',
            
            getter(src: ISupplyStage) { return src.volume + "" },
            setter(src: ISupplyStage, value: number) { src.volume = value }
        }]
    }]

    private relative: IRow[] = [{
        title: 'Начало поставки',
        visible: true,
        type: 'TEXT',
        fieldDescription: "дней с момента заключения контракта",
            
        getter(src: ISupplyStage) { return src.relativePeriod.startOffset + "" },
        setter(src: ISupplyStage, value: number) { src.relativePeriod.startOffset = value }
    }, {
        title: '',
        visible: true,
        type: 'INLINE_RADIO_SELECT',
        groupName: 'startDayType',
                        
        selectOptions: [
            { key: DayType.WORKDAY, desc: 'Рабочие дни' },
            { key: DayType.NORMAL, desc: 'Календарные дни' }
        ],
            
        getter(src: ISupplyStage) { return src.relativePeriod.startOffsetType },
        setter(src: ISupplyStage, value: DayType) { src.relativePeriod.startOffsetType = value }
    }, {
        title: 'Окончание поставки',
        visible: true,
        type: 'TEXT',
        fieldDescription: "дней с момента заключения контракта",
            
        getter(src: ISupplyStage) { return src.relativePeriod.endOffset + "" },
        setter(src: ISupplyStage, value: number) { src.relativePeriod.endOffset = value }
    }, {
        title: '',
        visible: true,
        type: 'INLINE_RADIO_SELECT',
        groupName: 'endDayType',
                        
        selectOptions: [
            { key: DayType.WORKDAY, desc: 'Рабочие дни' },
            { key: DayType.NORMAL, desc: 'Календарные дни' }
        ],

        getter(src: ISupplyStage) { return src.relativePeriod.endOffsetType },
        setter(src: ISupplyStage, value: DayType) { src.relativePeriod.endOffsetType = value }
    }, {
        title: 'Год окончания поставки',
        type: 'SELECT',

        selectOptions: [
            { key: 'WORKING_DAYS', desc: '2007' },
            { key: 'CALENDAR_DAYS', desc: '2007' }
        ],

        getter(src: any) {  }, // todo
        setter(src: any) {  }
    }]

    private absolute = [{
        title: 'Дата начала поставки',
        visible: true,
        type: 'DATE_PICKER',
            
        getter(src: ISupplyStage) { return src.absolutePeriod.startDate },
        setter(src: ISupplyStage, value: Date) { src.absolutePeriod.startDate = value }
    }, {
        title: 'Дата окончания поставки',
        visible: true,
        type: 'DATE_PICKER',
            
        getter(src: ISupplyStage) { return src.absolutePeriod.endDate },
        setter(src: ISupplyStage, value: Date) { src.absolutePeriod.endDate = value }
    }]

    private conditions: IRow[] = [{
        title: 'Условия поставки',
        visible: true,
        type: 'TEXT',

        getter(src: ISupplyStage) { return src.conditions },
        setter(src: ISupplyStage, value: string) { src.conditions = value }
    }]

    private selectSource(src: ISupplyStage) {
        // this.source.selectedSource = src
    }

    public selectItemAndExit () {
        this.$emit('select', this.stage)
        this.newStage = this.createNewStage()

        this.$emit('close-modal')
    }

    public setFormValue(e: ISetValueEvent) { 
        e.row.setter(this.stage, e.value)
    }
}
</script>

<style scoped>
.selection {
    display: flex;
    flex-direction: column;
}

.fields {
    padding-left: 30px;
}

.padded-block {
    padding: 30px;
}

.section-header {
    padding-top: 25px;
    background: #eef1f7;
    border-bottom: 1px solid #dadfea;
    padding: 20px 30px 20px;
}

.prov-selection {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-shrink: 100000; /* костыль для хрома */
}

.add-stage-btn {
    width: 200px;
    margin-left: 30px;
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