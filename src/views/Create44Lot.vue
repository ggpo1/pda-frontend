<template>
    <div>
        <FormBase :formDeclaration="formDeclaration" :source="source" @form-pick="pickFormValue" @set-value="setFormValue" @button-click="buttonClick"
            state="ENABLED" />

        <LotDetailedObjectSelectionModal
            :visible="isLotDetailedObjectSelectionModal"
            @close-modal="isLotDetailedObjectSelectionModal = false"/>
        <PurchaseStageModal
            :visible="isPurchaseStageModal"
            @close-modal="isPurchaseStageModal = false"/>
        <UploadDocumentModal
            :visible="isUploadDocumentModal"
            @close-modal="isUploadDocumentModal = false"/>
        <EditPersonInfoModal
            :visible="isEditPersonInfoModal"
            @close-modal="isEditPersonInfoModal = false"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormBase from '@/views/FormBase2.vue'
import { IForm, ISection, IconType } from '@/views/FormAbstractions'

import { IRow, ISetValueEvent } from '@/components/form-table/FormFields';
import { ILot, ILot44, LotContractType, LotStatus, ProviderSetWayType, IncludingInSmpOrMspType } from '@/models/Lot'
import { LawType } from '@/models/Shared'

import FormDeclarationBuilder from '@/form-declarations/lot44'

import LotDetailedObjectSelectionModal from '@/views/modals/LotDetailedObjectSelectionModal.vue'
import PurchaseStageModal from '@/views/modals/PurchaseStageModal.vue'
import UploadDocumentModal from '@/views/modals/UploadDocumentModal.vue'
import EditPersonInfoModal from '@/views/modals/EditPersonInfoModal.vue'



@Component({ components: { FormBase, LotDetailedObjectSelectionModal, PurchaseStageModal, UploadDocumentModal, EditPersonInfoModal } })
export default class extends Vue {
    public isLotDetailedObjectSelectionModal: boolean = false
    public isPurchaseStageModal: boolean = false
    public isUploadDocumentModal: boolean = false 
    public isEditPersonInfoModal: boolean = false

    public source: ILot44 = {
        id: "",
        regNumber: "",
        law: LawType.F44,
        ekz: "",
        purchaseObject: "",
        contractNmz: 0,
        providerSetWay: "",
        purchaseStartDate: new Date(Date.now()),
        includingInSmpOrMsp: IncludingInSmpOrMspType.NO,
        rePurchaseNumber: 0,

        isMultiLot: false,
        multiPurchase: false,
        haveStages: false,
        contractProvision: true,
        haveAdditProviderReq: false,
        haveAddirRfReq: false,
        
        lotContractType: LotContractType.SELECT,
        providerSetWayType: ProviderSetWayType.SELECT,

        status: LotStatus.CREATING
    }
    

    public formDeclaration = FormDeclarationBuilder()

    public setFormValue(e: ISetValueEvent) {
        e.row.setter(this.source, e.value)
        this.updateFormDependencies()
    }

    public pickFormValue(property: string, value: any) {
        switch (property) {
            case 'lotSpecifications':
                this.isLotDetailedObjectSelectionModal = true
                break
            case 'purchaseStage':
                this.isPurchaseStageModal = true
                break
            case 'uploadDocument':
                this.isUploadDocumentModal = true
                break
        }
    }

    public buttonClick(id: string){
        if (id === 'editPersonInfoBtn') this.isEditPersonInfoModal = true
    }

    public updateFormDependencies() {
        // const isNotSmallVolume = this.source.smallVolume === 'NO'
        // this.subjectClassField.visible = isNotSmallVolume
        // this.goalSection.visible = isNotSmallVolume
        // this.discussionSection.visible = isNotSmallVolume
        // this.termsSection.visible = isNotSmallVolume
    }
    
}
</script>