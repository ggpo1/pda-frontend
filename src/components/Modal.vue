<template>
    <div class="modal" :class="[visible ? 'visible' : '']" @click="$emit('close-modal')">
        <div class="modal-block" @click="handleModalEvent">
            <Card :title="title" :padding="0" :hasBorder="true" :hasCloseButton="true" @close="$emit('close-modal')">
                <slot/>
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import EventBus from '@/EventBus';

@Component({ components: { Card } })
export default class extends Vue {
    @Prop() private visible!: boolean
    @Prop() private title!: string

    private handleModalEvent($event: Event) {
        $event.stopPropagation()
        EventBus.$emit('close-popup')
    }
}
</script>

<style scoped>
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        top: 0;
        left: 0;
        
        width: 100%;
        height: 100%;

        z-index: 999999;
        
        background: #00000060;
        
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.1s, opacity 0.1s linear;

        box-sizing: border-box;
        padding: 30px;
    }

    .modal-block {
        display: flex;
        flex-direction: column;

        box-sizing: border-box;
        max-height: 100%;
        width: 80%;
        overflow-y: auto;
    }

    .modal-block > * {
        max-height: 100%;
    }

    .modal.visible {
        visibility: visible;
        opacity: 1;
    }
</style>