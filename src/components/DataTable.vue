<template>
    
    <div>
        <table>
            <thead>
                <th v-for="(header, i) in headers" :key="'th-' + i">{{header.title}}</th>
                <th colspan="2" v-if="canEdit"/>
                <th v-if="actions.length">Действия</th>
            </thead>
            <tbody>
                <tr v-if="canFilter" class="filters">
                    <td v-for="(header, i) in headers" :key="'filt-td-' + i">
                        <input v-if="header.filter === 'TEXT'" :placeholder="'asd'"/>
                        <select v-if="header.filter === 'SELECT'">
                            <!-- <option v-for="opt in header.filter.options" :key="opt.key" :value="opt.key">{{opt.value}}</option> -->
                        </select>
                        <Datetime v-if="header.filter === 'DATE'" input-style="width: 100%; box-sizing: border-box;"/>
                    </td>
                    <td colspan="2" v-if="canEdit"/>
                </tr>
                <template v-if="groupBy">
                    <template v-for="(group, i) in grouped">
                        <tr :key="'group-' + i">
                            <td :colspan="headers.length + (canEdit ? 2 : 0)" class="group-header">{{group.header}}</td>
                        </tr>
                        <tr v-for="(item, ix) in group.items" :key="item.id" :class="[selected && selected.id === item.id ? 'selected' : '']" @click="select(item)">
                            <td v-for="(header, i) in headers" :key="'td-' + item.id + '-' + i">
                                <Button v-if="header.action" :icon="header.action.icon" :title="header.action.title" 
                                    @click="$emit('item-action', item, header.action.id)"/>
                                <router-link v-else-if="header.url" :to="header.url(item)">{{header.getter(item, ix)}}</router-link>
                                <span v-else>{{header.getter(item, ix)}}</span>
                            </td>
                            <td v-if="canEdit">
                                <div style="display: flex">
                                    <Button title="Изменить" @click="$emit('edit', item)"/>
                                </div>
                            </td>
                            <td v-if="canEdit">
                                <div style="display: flex; flex-direction: row-reverse">
                                    <Button :icon="{type: 'CLASS', name: 'close'}" @click="$emit('delete', item)"/>
                                </div>
                            </td>
                            <td v-if="actions.length" class="action-popup-wrap">
                                <Button title="Действия" @click="openActions($event, ix)"/>
                                <div class="action-popup-wrap2" ref="action-block" :style="[openActionsIx !== ix ? {display: 'none'} : {}]">
                                    <div class="action-popup">
                                        <div v-for="(action, ix) in actions" :key="'act-' + ix" @click="$emit('item-action', item, action.id)">
                                            {{action.title}}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </template>
                </template>
                <template v-if="!groupBy">
                    <tr v-for="(item, ix) in dataset" :key="item.id" :class="[selected && selected.id === item.id ? 'selected' : '']" @click="select(item)">
                        <td v-for="(header, i) in headers" :key="'td-' + item.id + '-' + i">
                            <Button v-if="header.action" :icon="header.action.icon" :title="header.action.title" 
                                @click="$emit('item-action', item, header.action.id)"/>
                            <router-link v-else-if="header.url" :to="header.url(item)">{{header.getter(item, ix)}}</router-link>
                            <span v-else>{{header.getter(item, ix)}}</span>
                        </td>
                        <td v-if="canEdit">
                            <div style="display: flex">
                                <Button title="Изменить" @click="$emit('edit', item)"/>
                            </div>
                        </td>
                        <td v-if="canEdit">
                            <div style="display: flex; flex-direction: row-reverse">
                                <Button :icon="{type: 'CLASS', name: 'close'}" @click="$emit('delete', item)"/>
                            </div>
                        </td>
                        <td v-if="actions.length" class="action-popup-wrap">
                            <Button title="Действия" @click="openActions($event, ix)"/>
                            <div class="action-popup-wrap2" ref="action-block" :style="[openActionsIx !== ix ? {display: 'none'} : {}]">
                                <div class="action-popup">
                                    <div v-for="(action, ix) in actions" :key="'act-' + ix" @click="$emit('item-action', item, action.id)">
                                        {{action.title}}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
                
                <tr v-if="(!dataset || dataset.length === 0) && (tableStyle === undefined || tableStyle === '')">
                    <td v-for="(header, i) in headers" :key="'td-empty-' + i"/>
                    <td v-if="canEdit" colspan="2"/>
                    <td v-if="actions.length"/>
                </tr>
            </tbody>
        </table>
        <h2 v-if="(!dataset || dataset.length === 0) && tableStyle == 'nmz'" class="nmz-empty">Информация отсутствует</h2>
    </div>
</template>

<script lang ="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Datetime } from 'vue-datetime'
import Button from '@/components/Button.vue'
import { ITableColumn, ITableGroupConfig, ITableAction } from '@/components/TableAbstractions'
import EventBus from '@/EventBus';

@Component({components: {Datetime, Button}})
export default class extends Vue {
    @Prop() private canFilter!: boolean
    @Prop() private headers!: ITableColumn[]
    @Prop({default: null}) private groupBy!: ITableGroupConfig
    @Prop() private dataset!: any[]
    @Prop({default: null}) private selected!: any
    @Prop({default: false}) private enableSelection!: boolean
    @Prop({default: false}) private canEdit!: boolean
    @Prop() private tableStyle!: string
    @Prop({default: () => []}) private actions!: ITableAction[]
    private openActionsIx: number | null = null

    private created() {
        EventBus.$on('close-popup', () => this.openActionsIx = null)
    }

    private beforeDestroy() {
        EventBus.$off('close-popup')
    }

    private openActions(ev: Event, ix: number) {
        this.openActionsIx = ix
        ev.stopPropagation()
    }

    private get grouped() { return this.groupBy ? this.groupBy.group(this.dataset) : [] }
    
    private select(item: any) {
        if (this.enableSelection) {
            this.$emit('selected', item)
        }
    }
}
</script>

<style scoped>
    table {
        width: 100%;
        margin: 10;
        font-size: 13px;
        border-collapse: collapse;
        border-spacing: 0;
        box-sizing: border-box;
    }

    th {
        font-weight: 600;
        padding: 15px 20px;

        background: #eef1f7;
        border-right: 1px solid #d7dee3;
        border-top: 1px solid #d7dee3;
        border-bottom: 1px solid #d7dee3;

        text-align: left;
    }

    th:first-child {
        border-left: 1px solid #d7dee3;
    }

    td {
        padding: 12px 10px;

        border-right: 1px solid #d7dee3;
        border-bottom: 1px solid #d7dee3;
        
        word-wrap: break-word;
        word-break: break-all;
    }

    td:first-child {
        border-left: 1px solid #d7dee3;
    }

    .filters > td > * { 
        box-sizing: border-box;
        width: 100%; 
    }

    .selected {
        background: #ddd;
    }

    .group-header {
        padding-left: 30px;
        font-size: 16px;
        font-weight: 600;
    }

    .action-popup-wrap2 {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        
        z-index: 99999;
    }
    
    .action-popup {
        box-sizing: border-box;
        margin: 5px;
        background: white;
        font-size: 12px;
        padding: 5px 0;
        
        flex-grow: 0;
    
        border-radius: 3px;
        border-width: 1px 1px 1px;
        border-style: solid;
        border-color: #ccd1de #ccd1de #bbc1d0;

        box-shadow: 0 3.5px 10px 0px rgba(0, 0, 0, 50%);
        white-space: nowrap;
        overflow-x: auto;

        user-select: none;
        width: 100%;
    }

    .action-popup > * {
        margin: 3px 0px;
        padding: 8px 3px;
        cursor: pointer;
    }
    
    .action-popup > :hover {
        background: #eee;
    }

    .action-popup-wrap {
        position: relative;
        min-width: 150px;
    }

    .nmz-empty {
        text-align: center;
        font-size: 14pt; font-weight: 500;
        padding: 10px 0;
        background: #d6dae6;
        color: #263344;
    }
    
</style>