<template>
    <div v-if="formStyle === 'HORIZONTAL'" class="form-container">
        <div 
            class="form-column" 
            v-for="(column, index) in filteredColumns" 
            :key="index"
            :style="{flexBasis: calculateBasis(index) }">
            <template v-for="(row, index) in column.rows">
                <div class="form-row" :key="index" v-if="row.visible === undefined || row.visible"
                    :class="[row.type === 'FORMTABLE_SELECT' ? 'formtable-select' : '', row.type === 'CHECKBOX' ? 'inline' : '', formStyle === 'HORIZONTAL' ? 'form-row-horizontal' : '']">

                    <div v-if="row.type !== 'FORMTABLE_SELECT'" class="form-field-header" 
                        :class="[row.editable === false ? 'disabled' : '', formStyle === 'HORIZONTAL' ? 'form-field-header-horizontal' : '']">
                        {{row.title}} 
                        <span v-if="row.required == true" class="red-star">*</span>
                        <img v-if="row.hint" src="@/assets/question.png" class="question" @click="openHint(row.hint, $event)"/>
                    </div>

                    <div v-else-if="row.type === 'FORMTABLE_SELECT'" class="form-field-header" 
                        :class="[row.editable === false ? 'disabled' : '', formStyle === 'HORIZONTAL' ? 'form-field-header-horizontal' : '']">
                        <input v-if="row.radio || row.radio === undefined" type="radio" :name="row.groupName" id="">
                        <span v-if="row.required == true" class="red-star">*</span>
                        <img v-if="row.hint" src="@/assets/question.png" class="question" @click="openHint(row.hint, $event)"/>
                    </div>
                    
                    <div v-if="row.type === 'TEXT'" class="basic-component">
                        <TextField v-if="!row.editable" class="" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                        
                        <TextField v-else class="text-border" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'MULTILINE_TEXT'" class="basic-component">
                        <TextField class="component-colors" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'CHECKBOX'" class="basic-component">
                        <CheckBoxField class="component-colors" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'SELECT'" class="basic-component">
                        <ComboBoxField class="component-colors combobox" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'RADIO_SELECT'" class="basic-component">
                        <RadioGroupField class="component-colors" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'INLINE_RADIO_SELECT'" class="basic-component">
                        <RadioGroupField class="component-colors" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'PICK'" class="basic-component">
                        <PickField class="component-colors" @form-pick="$emit('form-pick', $event)"
                            :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>
                    
                    <div v-else-if="row.type === 'DATE_RANGE'" class="basic-component">
                        <DateRangeField class="component-colors" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'LABEL_BUTTON'" class="basic-component">
                        <LabelButtonField :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'STATIC_FIELD'" class="basic-component">
                        <StaticField :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'FILE'" class="basic-component">
                        <FileField class="component-colors" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>

                    <div v-else-if="row.type === 'DATE_PICKER'" class="basic-component">
                        <DatePicker :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>
                        
                    <div v-else-if="row.type === 'TABLE'" class="basic-component">
                        <TableField class="component-colors" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    </div>                    
                </div>
            </template>
        </div>
    </div>
    <div v-else-if="formStyle == 'VERTICAL'" class="form-container">
        <div 
            class="form-column" 
            v-for="(column, index) in filteredColumns" 
            :key="index"
            :style="{flexBasis: calculateBasis(index) }">
            <template v-for="(row, index) in column.rows">
                <div class="form-row" :key="index" v-if="row.visible === undefined || row.visible"
                    :class="[row.type === 'CHECKBOX' ? 'inline' : '']">

                    <div class="form-field-header" :class="[row.editable === false ? 'disabled' : '']">
                        {{row.title}} 
                        <span v-if="row.required == true" class="red-star">*</span>
                        <img v-if="row.hint" src="@/assets/question.png" class="question" @click="openHint(row.hint, $event)"/>
                    </div>
                    
                    <TextField :style="row.cssStyle" :class="row.cssClass" v-if="row.type === 'TEXT'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <TextField :class="row.cssClass" v-else-if="row.type === 'MULTILINE_TEXT'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <CheckBoxField v-else-if="row.type === 'CHECKBOX'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <ComboBoxField v-else-if="row.type === 'SELECT'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <RadioGroupField v-else-if="row.type === 'RADIO_SELECT'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <RadioGroupField v-else-if="row.type === 'INLINE_RADIO_SELECT'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <PickField class="" v-else-if="row.type === 'PICK'" @form-pick="$emit('form-pick', $event)"
                        :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <DateRangeField v-else-if="row.type === 'DATE_RANGE'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <LabelButtonField v-else-if="row.type === 'LABEL_BUTTON'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <StaticField v-else-if="row.type === 'STATIC_FIELD'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)" />
                    <FileField v-else-if="row.type === 'FILE'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <DatePicker v-else-if="row.type === 'DATE_PICKER'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                    <TableField v-else-if="row.type === 'TABLE'" :props="fieldProps(row)" @set-value="$emit('set-value', $event)"/>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang='ts'>
import { IColumn, IHint, IRow } from './form-table/FormFields'
import TextField from './form-table/TextField.vue'
import CheckBoxField from './form-table/CheckBoxField.vue'
import ComboBoxField from './form-table/ComboBoxField.vue'
import RadioGroupField from './form-table/RadioGroupField.vue'
import PickField from './form-table/PickField.vue'
import LabelButtonField from './form-table/LabelButtonField.vue'
import StaticField from './form-table/StaticField.vue'
import FileField from './form-table/FileField.vue'
import DatePicker from './form-table/DatePick.vue'
import DateRangeField from './form-table/DateRangeField.vue'
import TableField from './form-table/TableField.vue'

import { IForm, ISection, FormStyle } from '@/views/FormAbstractions';

import { Component, Prop, Vue } from 'vue-property-decorator'
import EventBus from '@/EventBus';
import { IFieldProps, FieldState } from '@/components/form-table/FieldBase';

@Component({ components: { TextField, CheckBoxField, ComboBoxField, RadioGroupField, PickField, DateRangeField, LabelButtonField, StaticField, FileField, DatePicker, TableField } })
export default class FormTable extends Vue {
    @Prop({ default: true }) private isVerticalLayout!: boolean
    @Prop() private columns!: IColumn[]
    @Prop() private columnCount!: number
    @Prop({ default: false }) private autospan!: boolean
    @Prop() private source!: any
    @Prop() private bus!: Vue

    private fieldProps(row: IRow): IFieldProps {
        return { bus: this.bus, source: this.source, state: this.state, row }
    }

    @Prop({default: FieldState.READONLY}) private state!: FieldState
    @Prop({default: FormStyle.VERTICAL}) private formStyle!: FormStyle
    

    private get filteredColumns(): IColumn[] { return this.columns.map(x => ({...x, rows: x.rows.filter(y => y.visible === undefined || y.visible)})) }

    private calculateBasis(index: number): string {
        const actualColumnCount = this.autospan 
            ? Math.min(this.columns.length - index, this.columnCount) 
            : this.columnCount
        return 'calc(' + (100 / this.columnCount) + '% - ' + (15 * this.columnCount * 2) + 'px)'
    }

    private openHint(hint: IHint, ev: MouseEvent) {
        EventBus.$emit("show-hint", hint, ev)
    }

    public buttonClick(id: string){
        alert(id)
    }
}
</script>

<style scoped>
    .form-container {
        display: flex;
        justify-content: stretch;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .red-star{
        color: red;
    }

    .form-container + .form-container {
        margin-top: 0;
    }

    .form-column {
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 0;
        min-width: 300px;
        margin-top: 15px;
    }

    .form-column:first-child {
        margin-top: 0;
    }

    .form-row {
        font-size: 14px;
        font-weight: 400;
    }


    
    .form-row.inline {
        display: flex;
        align-items: center;
    }

    .form-row:not(.form-row-horizontal).inline > :first-child {
        margin-right: 10px;
        margin-bottom: 0;
    }

    .form-row:not(:first-child) {
        margin-top: 15px;
    }

    .form-field-header {
        font-size: 12px;
        font-weight: 500;
        color: #2e4358;
        margin-bottom: 5px;
    }

    .form-field-header-horizontal {
        width: 400px;
    }

    .form-field-header-horizontal + * {
        flex-grow: 1;
    }

    .form-field-header.disabled {
        color: #9da8b0;
    }

    .question {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
    }


    /* HORIZONTAL */
    .form-row-horizontal {
        font-size: 14px;
        font-weight: 400;
        display: flex;
        
        justify-content: space-between;
    }

    .basic-component{
        width: 65%;
        flex-basis: content;
    }
    
    .combobox{
        height: 30px;
       -left: 10px;
       -top: 5px;
       -bottom: 5px;
    }

    .text-border{
        border:none;
        border: 1px solid  #b2b2b2;
        background: #fafafa;
    }

    .component-colors{
        border-color: #b2b2b2;
        background: #fafafa;
    }

    .formtable-select {
        /* width: 70%; */
    }
    /* --------- */
</style>