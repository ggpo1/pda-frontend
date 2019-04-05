<template>
    <div>
        <FormBase :formDeclaration="formDeclaration" :source="source" @form-pick="pickFormValue" @action="onAction" v-if="source" @set-value="setFormValue"
            state="ENABLED"/>
        <PurchaseObjectDetailedSpecModal
            :visible="isPurchaseObjectDetailedSpecModal"
            @close-modal="isPurchaseObjectDetailedSpecModal = false"
            :selected="selectedSpec"
            @select="addSpec"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormBase from '@/views/FormBase2.vue'
import { IForm, ISection, IconType } from '@/views/FormAbstractions'

import { IRow, ISetValueEvent } from '@/components/form-table/FormFields';

import FormDeclarationBuilder from '@/form-declarations/purchaseObjectDetailed'
import { IPurchaseObjectDetailed, PurchaseObjectDetailStatus, PurchaseObjectDetailedAddressType } from '@/models/PurchaseObjectDetailed'

import PurchaseObjectDetailedSpecModal from '@/views/modals/PurchaseObjectDetailedSpecModal.vue'
import PurchaseObjectDetailedAddStageModal from '@/views/modals/PurchaseObjectDetailedAddStageModal.vue'

import router from '@/router';
import { ISpecification } from '@/models/PurchaseObjectDetailedSpecification';

@Component({ components: { FormBase, PurchaseObjectDetailedSpecModal, PurchaseObjectDetailedAddStageModal } })
export default class extends Vue {
    @Prop({default: null}) private objectId!: string | null
    @Prop({default: null}) private detailedObjectId!: string | null
    @Prop({default: false}) private clone!: boolean

    private selectedSpec!: ISpecification | null

    private isPurchaseObjectDetailedSpecModal: boolean = false
    private isAddStageModal = false

    public source: IPurchaseObjectDetailed | null = null
    
    public formDeclaration = FormDeclarationBuilder()

    public mounted() {
        if (this.objectId) {
            fetch(`http://192.168.10.20:5000/api/purchaseObjects/${this.objectId}`)
                .then(response => response.json())
                .then(response => { 
                    this.source = { 
                        object: response, 
                        id: "",
                        status: PurchaseObjectDetailStatus.CREATING, 
                        subject: response.subject,
                        addressType: PurchaseObjectDetailedAddressType.FROM_BTE,
                        specifications: [],
                        isPerItemPurchase: false
                    }
                    this.updateFormDependencies()
                })
        } else {
            fetch(`http://192.168.10.20:5000/api/purchaseObjectDetails/${this.detailedObjectId}`)
                .then(response => response.json())
                .then(response => { 
                    this.source = response
                    if (!this.source.specifications) this.source = {...this.source, specifications: []}
                    this.formDeclaration.header = (this.clone ? "Копирование" : "Редактирование") + " детализированного объекта закупки"
                    this.updateFormDependencies()
                })
        }
    }

    public setFormValue(e: ISetValueEvent) {
        e.row.setter(this.source, e.value)
        this.updateFormDependencies()
    }

    public pickFormValue(property: string, value: any) {
        switch (property) {
            case 'specification':
                if (value) {
                    switch (value.action) {
                        case 'edit':
                            this.selectedSpec = value.item
                            break
                        case 'calculate':
                            this.source.specifications = this.source.specifications.filter(x => x !== value.item)
                            return
                    }
                }
                else {
                    this.selectedSpec = null
                }
                this.isPurchaseObjectDetailedSpecModal = true
                break
        }
    }

    public addSpec(spec: any) {
        if (!this.source.specifications.includes(spec))
            this.source.specifications = [...this.source.specifications, spec]
    }
    
    public updateFormDependencies() {
    }

    public onAction(action: string) {
        switch (action) {
            case 'save': 
                this.source!.status = PurchaseObjectDetailStatus.CREATING
                fetch("http://192.168.10.20:5000/api/purchaseObjectDetails", {
                        method: this.clone || this.objectId ? "POST" : "PUT",
                        body: JSON.stringify(this.source),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(response => router.push(`/plan-objects/detailed/${response.code}`))
                break
            case 'close':
                router.back()
                break
        }
    }
}
</script>

<style>

</style>
