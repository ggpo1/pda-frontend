<template>
    <div>
        <FormBase :formDeclaration="formDecl.declaration" :source="source" v-if="source" state="READONLY" @action="onAction"/>
        <ObjectDeletionModal @close-modal="isDeleteConfirmationModalVisible = false" :visible="isDeleteConfirmationModalVisible"
            @confirm-delete="confirmDelete"
            title="Подтверждение удаления детализированного объекта закупки"
            description="Вы действительно хотите удалить детализированный объект закупки?"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormBase from '@/views/FormBase2.vue'
import { IForm, ISection } from '@/views/FormAbstractions'
import FieldSection from '@/views/form-renderers/FieldSection.vue'
import ProvisionSection from '@/views/form-renderers/ProvisionSection.vue'
import TableSection from '@/views/form-renderers/TableSection.vue'
import SubjectClassSelectionModal from '@/views/modals/SubjectClassSelectionModal.vue'
import ProvisionSelectionModal from '@/views/modals/ProvisionSelectionModal.vue'
import ObjectDeletionModal from '@/views/modals/ObjectDeletionModal.vue'

import { IRow, ISetValueEvent } from '@/components/form-table/FormFields';

// todo: move to file w/ enums
const statusTexts: { [index: string]: string } = {
    CREATING: "Формирование",
    PUBLISHED: "Опубликован",
    APPROVED: "Утвержден"
}

import { FormDeclarationBuilder, IPurchaseObjectForm } from '@/form-declarations/purchaseObject44ReadOnly'
import { SmallVolumeType, TermsDuration, GoalType, PurchaseObjectStatus } from '@/models/PurchaseObject';
import router from '@/router';

@Component({ components: { FormBase, SubjectClassSelectionModal, ProvisionSelectionModal, ObjectDeletionModal } })
export default class extends Vue {
    public isDeleteConfirmationModalVisible: boolean = false
    public source: IPurchaseObjectForm | null = null

    @Prop() private objectId!: number
    private formDecl = FormDeclarationBuilder()

    private mounted() {
        this.formDecl.declaration.header = "Объект закупки - " + this.objectId
        fetch(`http://192.168.10.20:5000/api/purchaseObjects/${this.objectId}`)
            .then(response => response.json())
            .then(response => { 
                this.source = { object: response, isDiscussionRequired: false }
                this.formDecl.declaration.header = "Объект закупки - " + this.objectId + " - " + statusTexts[response.status]

                const actions = ["approve", "detail"]
                switch (response.status) {
                    case PurchaseObjectStatus.CREATING:
                        this.formDecl.declaration.actions = 
                            this.formDecl.declaration.actions.filter(x => !actions.includes(x.name) || x.name === "approve")
                        break
                    case PurchaseObjectStatus.APPROVED:
                        this.formDecl.declaration.actions = 
                            this.formDecl.declaration.actions.filter(x => !actions.includes(x.name) || x.name === "detail")
                        break
                }

                this.updateFormDependencies()
            })
    }

    public updateFormDependencies() {
        const object = this.source!.object
        const isLargeVolume = object.smallVolume === SmallVolumeType.NO
        const isDiscussionRequired = isLargeVolume && object.financialSources.reduce((a, x) => a + x.amount, 0) >= 1000000000
        this.source!.isDiscussionRequired = isDiscussionRequired

        for (const field of this.formDecl.discussionFields) {
            field.visible = isDiscussionRequired
        }

        for (const block of this.formDecl.largeVolumeBlocks) {
            block.visible = isLargeVolume
        }

        for (const field of this.formDecl.largeVolumeFields) {
            field.visible = isLargeVolume
        }

        const isAdditionalGoalFieldsRequired = object.goal.type == GoalType.EVENT_EXECUTION
        for (const field of this.formDecl.onlyEvExecFields) {
            field.visible = isAdditionalGoalFieldsRequired
        }
        
        (object.terms.duration === TermsDuration.ONE_TIME ? this.formDecl.singleTerm : this.formDecl.periodicTerm).visible = true
    }

    public onAction(action: string) {
        switch (action) {
            case 'edit': 
                router.push(`/plan-objects/${this.objectId}/edit`)
                break
            case 'delete':
                this.isDeleteConfirmationModalVisible = true
                break
            case 'clone':
                router.push(`/plan-objects/${this.objectId}/clone`)
                break
            case 'approve':
                this.source!.object.status = PurchaseObjectStatus.APPROVED;
                fetch(`http://192.168.10.20:5000/api/purchaseObjects`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.source!.object)
                    })
                    .then(response => router.go(0))
                break
            case 'detail':
                router.push(`/plan-objects/${this.objectId}/new-detailed`)
                break
            case 'close':
                router.back()
                break
        }
    }

    private confirmDelete() {
        // delete object request
        this.isDeleteConfirmationModalVisible = false
        fetch(`http://192.168.10.20:5000/api/purchaseObjects/${this.objectId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => router.push("/"))
    }
}
</script>