<template>
    <div style="margin: 30px">
        <DataTable
            :headers="data.headers"
            :dataset="data.items"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ISection } from '@/views/FormAbstractions'
import DataTable from '@/components/DataTable.vue'

// todo: move to DataTable.vue
interface IHeader {
    title: string
}

interface ITableSectionData {
    headers: IHeader[]
    items: any[]
}

@Component({ components: { DataTable } })
export default class extends Vue {
    @Prop() private data!: ITableSectionData
    @Prop() private source!: any
}
</script>