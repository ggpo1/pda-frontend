<template>
    <div>
        <FormBase :formDeclaration="formDecl.declaration" :source="source" @form-pick="pickFormValue" @set-value="setFormValue" @action="onAction" :bus="this"
            state="ENABLED"/>
        <SubjectClassSelectionModal
            title="Выбор КПГЗ" 
            :visible="isSubjClassModalVisible" 
            @close-modal="isSubjClassModalVisible = false"
            @select="selectSubjClass"/>
        <ProvisionSelectionModal
            :visible="isProvisionModalVisible"
            :selected="selectedSource"
            @close-modal="isProvisionModalVisible = false"
            @select="addFinancialSource"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormBase from '@/views/FormBase2.vue'
import { IForm, ISection, IconType } from '@/views/FormAbstractions'
import SubjectClassSelectionModal from '@/views/modals/SubjectClassSelectionModal.vue'
import ProvisionSelectionModal from '@/views/modals/ProvisionSelectionModal.vue'

import { IRow, ISetValueEvent } from '@/components/form-table/FormFields';
import { IPurchaseObject, IPurchaseObject44, GoalType, SpecialPurchaseType, TermsDuration, TermsPeriod, PurchaseObjectStatus, SmallVolumeType } from '@/models/PurchaseObject'
import { LawType } from '@/models/Shared'

import { IPurchaseObjectForm, FormDeclarationBuilder } from '@/form-declarations/purchaseObject44'
import { IFinancialSource, IUsedSource } from '@/models/FinancialSource';
import router from '@/router';

@Component({ components: { FormBase, SubjectClassSelectionModal, ProvisionSelectionModal } })
export default class extends Vue {
    @Prop({default: null}) private objectId!: string | null
    @Prop({default: false}) private clone!: boolean

    public isSubjClassModalVisible: boolean = false
    public isProvisionModalVisible: boolean = false
    public object: IPurchaseObject44 = {
        id: "",
        regNumber: "",
        law: LawType.F44,
        purchaseId: "",
        smallVolume: SmallVolumeType.NO,
        specialPurchaseType: SpecialPurchaseType.NO,
        goal: {
            type: GoalType.EVENT_EXECUTION,
            expectedResult: "",
            programName: "",
            programEvents: "",
            purchaseReason: "",
            legalActs: "",
            pt7Info: ""
        },
        terms: {
            duration: TermsDuration.ONE_TIME,
            beginDate: new Date(Date.now()),
            period: TermsPeriod.UNDEFINED,
            count: 0
        },
        isPublicDiscussionNotApplicableDueToClosedMethod: false,
        isPublicDiscussionNotApplicableDueToSingleProvider: false,
        subject: "",
        subjectClass: {
            code: "",
            description: ""
        },
        fundingCode: "",
        purchaseSize: 0,
        remainingSize: 0,
        status: PurchaseObjectStatus.CREATING,
        financialSources: []
    }
    public source: IPurchaseObjectForm = { object: this.object, isDiscussionRequired: false }

    private selectedSource: IUsedSource | null = null

    public formDecl = FormDeclarationBuilder()

    public pickFormValue(property: string, value: any) {
        switch (property) {
            case 'subjectClass':
                this.isSubjClassModalVisible = true
                break
            case 'provision':
                this.selectedSource = value
                this.isProvisionModalVisible = true
                break
        }
    }

    public mounted() { 
        this.updateFormDependencies()
        if (this.objectId) {
            const word = this.clone ? "Копирование" : "Редактирование"
            this.formDecl.declaration.header = word + " объекта закупки - " + this.objectId
            fetch(`http://192.168.10.20:5000/api/purchaseObjects/${this.objectId}`)
                .then(response => response.json())
                .then(response => { 
                    this.source = { object: response, isDiscussionRequired: false }
                    this.updateFormDependencies()
                })
        }
    }

    public selectSubjClass(subjClass: any) {
        this.source.object.subjectClass.code = subjClass.id
        this.source.object.subjectClass.description = subjClass.desc
    }

    public setFormValue(e: ISetValueEvent) {
        e.row.setter(this.source, e.value)
        this.updateFormDependencies()
    }

    public updateFormDependencies() {
        const isLargeVolume = this.object.smallVolume === SmallVolumeType.NO
        const isDiscussionRequired = isLargeVolume && this.object.financialSources.reduce((a, x) => a + x.amount, 0) >= 1000000000
        this.source.isDiscussionRequired = isDiscussionRequired

        for (const field of this.formDecl.discussionFields) {
            field.visible = isDiscussionRequired
        }

        for (const block of this.formDecl.largeVolumeBlocks) {
            block.visible = isLargeVolume
        }

        for (const field of this.formDecl.largeVolumeFields) {
            field.visible = isLargeVolume
        }

        const isAdditionalGoalFieldsRequired = this.object.goal.type == GoalType.EVENT_EXECUTION
        for (const field of this.formDecl.onlyEvExecFields) {
            field.visible = isAdditionalGoalFieldsRequired
        }
    }

    public addFinancialSource(newSrc: IUsedSource, oldSrc: IUsedSource) {
        const srcs = this.source.object.financialSources
        const ix = srcs.indexOf(oldSrc)
        if (ix !== -1) {
            srcs[ix] = newSrc
            this.source.object.financialSources = [...srcs]
        } else {
            srcs.push(newSrc)
        }
        this.updateFormDependencies()
    }

    public onAction(action: string) {
        switch (action) {
            case 'save': 
                this.source.object.status = PurchaseObjectStatus.CREATING
                fetch("http://192.168.10.20:5000/api/purchaseObjects", {
                        method: !this.clone && this.objectId ? "PUT" : "POST",
                        body: JSON.stringify(this.source.object),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(response => router.push(`/plan-objects/${response.id}`))
                break
            case 'close':
                router.back()
                break
        }
    }
}
</script>