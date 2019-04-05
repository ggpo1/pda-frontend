<template>
    <div class="details">
        <div ref="dynamic-header" class="dynamic-header" :style="[isScrolledOverPanel ? {} : {display: 'none'}]">
            <NavPanel
                v-if="!onModal || onModal === undefined"
                :sections="filteredNavSections"
                :actions="formDeclaration.actions"
                :isPageHeader="true"
                @section-selected='selectSection'
                @action="$emit('action', $event)"/>
        </div>
        <div class="page-content" :class="[onModal ? 'page-content-modal' : '']">
            <div v-if="!onModal || onModal === undefined" class="stats-expander">
                <Expander closedTitle="Показать статистику" openTitle="Скрыть статистику"/>
            </div>
            <Card v-if="!onModal || onModal === undefined" :title="formDeclaration.header" :padding="0" :isLargeHeader="true" :hasBorder="false"/>
            <NavPanel v-if="!onModal || onModal === undefined" ref="in-page-panel"
                :sections="filteredNavSections"
                :forceInactiveSections="true"
                :actions="formDeclaration.actions"
                @section-selected='selectSection'
                @action="$emit('action', $event)"/>
            <Card v-for="(sec, ix) in filteredSections" :key="'sec-' + ix" ref="section" :title="sec.name" :padding="0" :required="sec.required"
                :hint="sec.hint">
                <component :is="sec.component" :data="sec.data" :source="source" :bus="bus"
                    :state="state"
                    :formStyle="formDeclaration.formStyle"
                    @button-click="(id) => $emit('button-click', id)"
                    @form-pick="(n, v) => $emit('form-pick', n, v)"
                    @set-value="$emit('set-value', $event)"/>
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
import NavPanel from '@/components/NavPanel.vue'
import Expander from '@/components/Expander.vue'
import Card from '@/components/Card.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IForm, ISection, FormStyle } from '@/views/FormAbstractions';

import EventBus from '@/EventBus'
import smoothScroll from '@/components/SmoothScroll'
import { FieldState } from '@/components/form-table/FieldBase';

interface INavSection {
    title: string
    active: boolean
}

@Component({components: {NavPanel, Card, Expander}})
export default class extends Vue {
    @Prop() private formDeclaration!: IForm
    @Prop() private source!: any
    @Prop() private bus!: Vue
    @Prop({default: FieldState.READONLY}) private state!: FieldState
    @Prop() private onModal!: boolean

    private isScrolledOverPanel: boolean = false
    private navSections: INavSection[] = []

    private get filteredNavSections(): INavSection[] {
        return this.navSections.filter((x, ix) => this.formDeclaration.sections[ix].visible)
    }

    private get filteredSections(): ISection[] {
        return this.formDeclaration.sections.filter((x) => x.visible)
    }

    private mounted() {
        this.navSections = this.formDeclaration.sections.map((x, ix) => ({ title: x.name, active: true }))
    }

    private sectionAt(ix: number) { return ((this.$refs.section as Vue[])[ix] as Vue).$el as HTMLElement }

    private selectSection(foo: any, sectionIndex: number) {
        const section = this.sectionAt(sectionIndex)

        const root = this.$el as HTMLElement
        const header = this.$refs['dynamic-header'] as HTMLElement
        const offset = header ? header.clientHeight : 0
        smoothScroll(section.offsetTop - root.offsetTop - offset)
    }

    private created() {
        if (this.onModal) return
        EventBus.$on('global-scroll', this.onScroll)
    }

    private beforeDestroy() {
        if (this.onModal) return
        EventBus.$off('global-scroll')
    }

    private onScroll(pos: number) {
        if (this.onModal) return
        const root = this.$el as HTMLElement

        const panel = (this.$refs['in-page-panel'] as Vue).$el as HTMLElement
        const offset = panel.offsetTop - root.offsetTop

        this.isScrolledOverPanel = pos > offset

        for (const sec of this.navSections) { sec.active = false }

        const secCount = this.formDeclaration.sections.length
        for (let i = 0; i < secCount; i++) {
            const diff = this.sectionAt(i).offsetTop - root.offsetTop - pos
            if (diff < 0) { continue }

            this.navSections[i].active = true
            break
        }
    }
}
</script>

<style scoped>
    .related-objects {
        display: flex;
        flex-wrap: wrap;
    }

    .page-content:not(.page-content-modal) {
        margin: 30px;
    }
    
    .stats-expander {
        margin-bottom: 15px;
    }

    .dynamic-header {
        position: fixed;
        width: calc(100% - var(--sidebar-width));

        margin-top: -30px;
    }

    .subj-modal {
        display: flex;
        flex-direction: column;
        max-height: 100%;
    }

    .subj-class-selector {
        display: flex;
        align-items: center;

        font-size: 13px;
        font-family: Tahoma;
    }

    .subj-class-selector > input {
        margin: 0 5px 0 0;
    }

    .subj-class-filter { 
        width: 100%;
        box-sizing: border-box; 
        margin-bottom: 10px;
    }

    .subj-selection { 
        margin: 10px;
        display: flex;
        flex-direction: column;
        max-height: 100%;
        overflow-y: auto;
        flex-shrink: 100000; /* костыль для хрома */
    }

    .subj-modal-footer {
        border-top: 1px solid #ddd;
        padding: 10px;
        display: flex;
    }

    .subj-modal-footer .actions-spacing { flex-grow: 1; }

    .sec-provision {
        display: flex;
    }

    .add-provision-btn {
        margin: 15px 0;
        align-self: flex-start;
    }
</style>