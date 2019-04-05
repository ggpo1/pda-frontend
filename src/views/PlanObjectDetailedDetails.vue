<template>
    <div>
        <FormBase :formDeclaration="formDeclaration" :source="source" v-if="source" state="READONLY" @action="onAction"/>
        <ObjectDeletionModal @close-modal="isDeleteConfirmationModalVisible = false" :visible="isDeleteConfirmationModalVisible"
            @confirm-delete="confirmDelete"
            title="Удаление"
            description="При удалении объекта закупки будут удалены все связанные с ним детализированные объекты закупок и лоты, продолжить?"/>
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

import FormDeclarationBuilder from '@/form-declarations/purchaseObjectDetailedReadOnly'
import { SmallVolumeType, TermsDuration, GoalType, PurchaseObjectStatus } from '@/models/PurchaseObject';
import router from '@/router';
import { PurchaseObjectDetailStatus } from '@/models/PurchaseObjectDetailed';

@Component({ components: { FormBase, SubjectClassSelectionModal, ProvisionSelectionModal, ObjectDeletionModal } })
export default class extends Vue {
    public isDeleteConfirmationModalVisible: boolean = false
    public source: any | null = null

    @Prop() private objectId!: number
    private formDeclaration = FormDeclarationBuilder()

    private mounted() {
        this.formDeclaration.header = "Детализированная закупка - " + this.objectId
        fetch(`http://192.168.10.20:5000/api/purchaseObjectDetails/${this.objectId}`)
            .then(response => response.json())
            .then(response => { 
                this.source = response
                this.formDeclaration.header = "Детализированная закупка - " + this.objectId + " - " + statusTexts[response.status]

                const actions = ["approve", "create-lot"]
                switch (response.status) {
                    case PurchaseObjectStatus.CREATING:
                        this.formDeclaration.actions = 
                            this.formDeclaration.actions.filter(x => !actions.includes(x.name) || x.name === "approve")
                        break
                    case PurchaseObjectStatus.APPROVED:
                        this.formDeclaration.actions = 
                            this.formDeclaration.actions.filter(x => !actions.includes(x.name) || x.name === "create-lot")
                        break
                }

                this.updateFormDependencies()
            })
    }

    public updateFormDependencies() {
    }

    public onAction(action: string) {
        switch (action) {
            case 'edit': 
                router.push(`/plan-objects/detailed/${this.objectId}/edit`)
                break
            case 'delete':
                this.isDeleteConfirmationModalVisible = true
                break
            case 'clone':
                router.push(`/plan-objects/detailed/${this.objectId}/clone`)
                break
            case 'approve':
                this.source!.status = PurchaseObjectDetailStatus.APPROVED;
                fetch(`http://192.168.10.20:5000/api/purchaseObjectDetails`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.source)
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