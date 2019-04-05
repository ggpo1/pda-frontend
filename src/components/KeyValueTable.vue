<template>
    <table v-if="isVerticalLayout">
        <template v-for="(row, index) in rows">
            <tr :key="'th-' + index">
                <th v-for="(column, index) in row.columns" :key="index">{{column.key}}</th>
            </tr>
            <tr :key="'td-' + index">
                <td v-for="(column, index) in row.columns" :key="index">{{column.value}}</td>
            </tr>
        </template>
    </table>
    <table v-else>
        <tr v-for="(row, index) in rows" :key="index">
            <template v-for="(column, index) in row.columns">
                <th :key="'th-' + index">{{column.key}}</th>
                <td :key="'td-' + index">{{column.value}}</td>
            </template>
        </tr>
    </table>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from 'vue-property-decorator'
    
    interface IColumn {
        key: string
        value: string
    }

    interface IRow {
        columns: IColumn[]
    }

    @Component
    export default class KeyValueTable extends Vue {
        @Prop() private isVerticalLayout: boolean = false
        @Prop() private rows: IRow[] = []
    }
</script>

<style scoped>
    table { 
        width: 100%;
    }

    th {
        width: 25%;

        vertical-align: top;
        text-align: left;
        color: #9da8b0;
        font-weight: 500;
        font-size: 12px;
    }

    tr:not(:last-child) > td { 
        padding-bottom: 15px;
    }

    td {
        vertical-align: top;
        text-align: left;
        color: #2e4358;
        font-weight: 400;
        font-size: 14px;
    }
</style>