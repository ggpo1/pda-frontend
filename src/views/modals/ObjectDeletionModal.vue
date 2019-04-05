<template>
    <Modal @close-modal="$emit('close-modal')" :visible="visible" :title="title">
        <div>
            <div class="modal-block">
                {{description}}
            </div>
            <div class="modal-footer">
                <Button title="Удалить"
                        color="green" 
                        @click="$emit('confirm-delete')"/>
                <Button :icon="{type: 'CLASS', name: 'close'}"
                        @click="$emit('close-modal')"/>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'

@Component({ components: { Modal, Button }})
export default class extends Vue {
    @Prop() private visible!: boolean
    @Prop() private title!: string
    @Prop() private description!: string
}
</script>

<style scoped>
.modal-footer {
    border-top: 1px solid #ddd;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
}

.modal-block {
    display: flex;
    align-items: center;
    margin: 30px;
}
</style>