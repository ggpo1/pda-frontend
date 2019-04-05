<template>
    <Modal @close-modal="$emit('close-modal', formDecl.declaration, isAddStageBtn = false, source)" :visible="visible" title="Добавление спецификации">
        <div class="selection">
            <div class="prov-selection">
                <div style="overflow: hidden">
                    <!-- <FormTable :formStyle="'HORIZONTAL'" :columns="formColumns" :columnCount="2" :source="source"
                        @set-value="setFormValue"/> -->

                    <FormBase :onModal="true" :formDeclaration="formDecl.declaration" @form-pick="formPick" :source="source" @set-value="setFormValue" state="ENABLED" />
                    <Card title="График поставки" v-if="isStagesVisible" class="sched-card" :padding="30">
                        <DataTable :headers="schedHeaders" v-if="schedEntries.length" :dataset="schedEntries" :actions="schedActions"
                            @item-action="onSchedStageAction"/>
                        <div v-else>Поставок нет</div>
                        <Button title="Добавить этап оплаты" @click="requestAddStage" color="green" class="add-sched-entry"/>
                    </Card>
                    <SubjectClassSelectionModal
                        title="Выбор КПГЗ" 
                        :visible="isSubjClassModalVisible" 
                        @close-modal="isSubjClassModalVisible = false"
                        @select="selectSubjClass"/>
                    <SubjectDeclarationSelectionModal
                        title="Выбор СПГЗ" 
                        :visible="isSubjDeclModalVisible" 
                        @close-modal="isSubjDeclModalVisible = false"
                        @select="selectSubjDecl"/>
                    <PurchaseObjectDetailedAddStageModal 
                        :visible="isAddStageModalVisible"
                        @close-modal="isAddStageModalVisible = false"
                        @select="addStage"
                        :selected="selectedStage"/>
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
import Card from '@/components/Card.vue'
import { IColumn, ISetValueEvent } from '@/components/form-table/FormFields'
import { ILimitSource, IOwnFundsSource, IFinancialActionSource, IFinancialSource, FinancialSourceType, IUsedSource } from '@/models/FinancialSource'
import { ITableColumn, ITableAction } from '@/components/TableAbstractions';
import FormDeclarationBuilder from '@/form-declarations/purchaseObjectDetailedSpecifications'
import { ISpecification, ISupplyStage, DayType, SupplyStagePeriodType } from '@/models/PurchaseObjectDetailedSpecification'
import SubjectClassSelectionModal from '@/views/modals/SubjectClassSelectionModal.vue'
import SubjectDeclarationSelectionModal from '@/views/modals/SubjectDeclarationSelectionModal.vue'
import PurchaseObjectDetailedAddStageModal from '@/views/modals/PurchaseObjectDetailedAddStageModal.vue'

@Component({ components: { 
    Modal, 
    FormBase,
    Button, 
    TreeView, 
    FormTable, 
    DataTable, 
    SubjectClassSelectionModal, 
    SubjectDeclarationSelectionModal, 
    Card,
    PurchaseObjectDetailedAddStageModal }})
export default class extends Vue {
    @Prop() private visible!: boolean
    @Prop({default: null}) private selected!: ISpecification | null

    public isStagesVisible: boolean = true
    public isSubjClassModalVisible: boolean = false
    public isSubjDeclModalVisible: boolean = false
    public isAddStageModalVisible: boolean = false
    
    private formatDate(stage: ISupplyStage, end: boolean): string {
        switch (stage.type) {
            case SupplyStagePeriodType.RELATIVE:
                const offset = end ? stage.relativePeriod.endOffset : stage.relativePeriod.startOffset
                const type = end ? stage.relativePeriod.endOffsetType : stage.relativePeriod.startOffsetType
                const typeStr = type === DayType.NORMAL ? "календарных" : "рабочих"
                return `${offset} ${typeStr} дней с момента заключения контракта`
            default:
                return (end ? stage.absolutePeriod.endDate : stage.absolutePeriod.startDate) + ""
        }
    }

    private schedHeaders: ITableColumn[] = [{
        title: "Объем поставки",
        filter: "TEXT",
        getter(v: ISupplyStage) { return v.volume + "" }
    }, {
        title: "Дата начала поставки",
        filter: "TEXT",
        getter: (v: ISupplyStage) => this.formatDate(v, false)
    }, {
        title: "Дата окончания поставки",
        filter: "TEXT",
        getter: (v: ISupplyStage) => this.formatDate(v, true)
    }, {
        title: "Условия поставки",
        filter: "TEXT",
        getter(v: ISupplyStage) { return v.conditions }
    }]

    private schedActions: ITableAction[] = [{
        id: "edit",
        title: "Редактировать"
    }, {
        id: "delete",
        title: "Удалить"
    }]

    private schedEntries: ISupplyStage[] = []

    private createNewSpec(): ISpecification { return {
        subjectDeclaration: {
            id: "",
            subjectClass: {
                code: "",
                description: ""
            },
            subject: ""
        },
        
        volume: 0,
        units: "?",

        hasJustification: true,
        justification: "",
        
        supplyStages: []
    }}

    private newSpec: ISpecification = this.createNewSpec()

    private get source(): ISpecification { return this.selected || this.newSpec }

    public formDecl = FormDeclarationBuilder()

    private selectSource(src: ISpecification) {
        // this.source.selectedSource = src
    }

    public setFormValue(e: ISetValueEvent) {
        e.row.setter(this.source, e.value)
        this.updateFormDependencies()
    }

    public formPick(id: string) {
        switch (id) {
            case "subjectType":
                this.isSubjClassModalVisible = true
                break
            case "subjectDeclaration":
                this.isSubjDeclModalVisible = true
                break
            default:
                console.log(id)
        }
    }

    public selectSubjClass(subjClass: any) {
        this.source.subjectDeclaration.subjectClass.code = subjClass.id
        this.source.subjectDeclaration.subjectClass.description = subjClass.desc
        
        this.formDecl.subjDeclRow.visible = true
    }

    public selectSubjDecl(subjDecl: any) {
        console.log(subjDecl)
        this.source.subjectDeclaration = subjDecl

        this.formDecl.declaration.sections.forEach(section => {
            section.visible = true
        })
        this.isStagesVisible = true
    }
    
    private selectedStage: ISupplyStage | null = null

    public requestAddStage() {
        this.selectedStage = null
        this.isAddStageModalVisible = true
    }

    public addStage(stage: any) { 
        if (this.selectedStage === null) 
            this.schedEntries.push(stage)
    }

    public updateFormDependencies() {
    }

    public selectItemAndExit () {
        this.$emit('select', this.source)
        this.newSpec = this.createNewSpec()

        this.$emit('close-modal')
    }

    public onSchedStageAction(item: any, action: string) {
        switch (action) {
            case 'delete': 
                this.schedEntries = this.schedEntries.filter(x => x !== item)
                break
            case 'edit':
                this.selectedStage = item
                this.isAddStageModalVisible = true
                break
        }
    }
}
</script>

<style scoped>
.selection {
    display: flex;
    flex-direction: column;
}

.prov-selection {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-shrink: 100000; /* костыль для хрома */
}

.sched-card {
    margin-top: 15px;
}

.add-sched-entry {
    margin-top: 15px;
    align-self: flex-start;
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