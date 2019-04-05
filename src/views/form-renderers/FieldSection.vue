<template>
    <div style="margin: 30px">
        <FormTable :columnCount="data.columnCount" :source="source" :columns="data.columns" :bus="bus"
            :state="state"
            :formStyle="formStyle"
            @button-click="(id) => $emit('button-click', id)"
            @form-pick="$emit('form-pick', $event)"
            @set-value="$emit('set-value', $event)"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormTable from '@/components/FormTable.vue'
import { IColumn } from '@/components/form-table/FormFields';
import { IForm, ISection, FormStyle } from '@/views/FormAbstractions';
import { FieldState } from '@/components/form-table/FieldBase';

interface IFieldSectionData {
    columnCount: number
    columns: IColumn[]
}

@Component({ components: { FormTable } })
export default class extends Vue {
    @Prop() private data!: IFieldSectionData
    @Prop() private source!: any
    @Prop() private bus!: Vue
    @Prop() private state!: FieldState
    @Prop() private formStyle!: FormStyle
}
</script>