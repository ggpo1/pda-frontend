<template>
    <div class="table">
        <div v-if="notNeedHeader == null || notNeedHeader == false" class="header">
            <div>{{header}}</div>
            <div v-if="greenAddButton && canAdd" class="btn btn-fa green" @click="$emit('add-object')"><div>добавить позицию</div></div>
            <div v-if="!greenAddButton && canAdd" class="btn btn-add" @click="$emit('add-object')"></div>
            <div v-if="canFilter" class="btn btn-filter"></div>
            <div v-if="canSync" class="btn btn-fa"><fa-icon class="fa" icon="sync"/></div>
            <div v-if="canSearch" class="btn btn-fa green"><fa-icon class="fa" icon="search"/><div>Поиск</div></div>
        </div>
        <div class="table-wrap">
            <DataTable :headers="headers" :dataset="dataset.items"
                :actions="itemActions"
                @item-action="(i, a) => $emit('item-action', i, a)"/>
        </div>
        <div class="pagination">
            <div class="page-selector">
                <div class="page-link to-start" @click="$emit('change-page', 'TO_START')" :disable="dataset.from == 0"></div>
                <div class="page-link to-prev" @click="$emit('change-page', 'TO_PREVIOUS')"></div>
                <div class="page-link to-page" 
                    @click="$emit('change-page', page)"
                    v-for="page in pages" 
                    :key="'page-' + page" 
                    :class="[page == activePage ? 'active' : '']">{{page + 1}}</div>
                <div class="page-link to-next" @click="$emit('change-page', 'TO_NEXT')"></div>
                <div class="page-link to-end" @click="$emit('change-page', 'TO_END')"></div>
            </div>
            <div class="page-info" v-if="dataset.totalCount">
                Записи {{((dataset.from + 1) | 0)}} - {{((dataset.to + 1) | 0)}} из {{(dataset.totalCount | 0)}}
            </div>
            <div class="page-info" v-else>
                Записи 0 - 0 из 0
            </div>
        </div>
    </div>
</template>

<script>
    import { Datetime } from 'vue-datetime'
    import DataTable from '@/components/DataTable.vue'

    export default {
        props: {
            header: String,
            canAdd: Boolean,
            canSearch: Boolean,
            greenAddButton: Boolean,
            canFilter: Boolean,
            canSync: Boolean,
            notNeedHeader: Boolean,
            headers: Array,
            dataset: Object,
            pages: Array,
            activePage: Number,
            itemActions: Array
        },
        components: {
            Datetime,
            DataTable
        }
    }
</script>

<style scoped>
    .table {
        display: flex;
        flex-direction: column;

        padding: 30px;
    }

    .header {
        display: flex;
        align-items: center;
        padding: 9px 15px;

        background: white;
        border-radius: 3px;
        border-width: 0 1px 1px;
        border-style: solid;
        border-color: transparent #ccd1de #dadfea;

        font-size: 30px;
        color: #6e7c90;
    }

    .header :first-child {
        flex-grow: 1;
    }

    .btn {
        box-sizing: border-box;
        min-width: 30px;
        height: 30px;

        background-color: #3f8fca;
        border-style: solid;
        border-width: 1px 1px 2px;
        border-color: #3f8fca #3f8fca #246da2;
        border-radius: 3px;

        color: white;
        font-size: 14px;
        font-weight: 500;
        text-transform: lowercase;
        user-select: none;
    }

    .btn:hover {
        background-color:#4ea1df;
        border-color:#4ea1df #4ea1df #246da2;
    }

    .btn:active {
        background-color:#3f8fca;
        border-color:#246da2 #3f8fca #3f8fca;
        border-width: 1px;
    }

    .green { 
        background-color: #00b191;
        border-color: #00b191 #00b191 #007e67;
    }

    .green:hover {
        background-color:#03bd9b;
        border-color:#03bd9b #03bd9b #0d9c83;
    }

    .green:active {
        background-color:#00b191;
        border-color:#007e67 #00b191 #00b191;
        border-width: 1px;
    }

    .btn + .btn {
        margin-left: 10px;
    }

    .btn-add { background-image: url("../assets/buttons.png"); background-position: -3px -387px; }
    .btn-filter { background-image: url("../assets/buttons.png"); background-position: -4px -2px; }

    .btn-fa {
        display: flex;
        justify-content: center;
        align-items: center;
        
        padding: 0 7px;
    }

    .btn-fa:active .fa {
        margin-top: 0;
    }

    .fa {
        margin-top: 1px;
        margin-left: -1px;
        width: 16px;
        height: 16px;
    }

    .fa + * {
        margin-left: 5px;
    }

    .table-wrap {
        width: 100%;
        table-layout: fixed;
        margin-top: 15px;

        background: white;
        border-radius: 3px;
        border-width: 0 1px 1px;
        border-style: solid;
        border-color: transparent #ccd1de #bbc1d0;
    }

    .pagination {
        display: flex;
        align-items: center;
        margin-top: 15px;
    }

    .page-selector {
        display: flex;

        background: white;
        border-radius: 3px;
        border-width: 0 1px 1px;
        border-style: solid;
        border-color: transparent #ccd1de #bbc1d0;
    }

    .page-link {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 22px;
        height: 24px;
        
        font-weight: 500;
        font-size: 13px;
        
        border: 1px solid transparent;

        cursor: pointer;
        user-select: none;
    }

    .page-link.to-page + .page-link.to-page {
        margin-left: 3px;
    }

    .page-link:not(.to-page):hover {
        border-top: 1px solid #999;
    }

    .page-link.to-page:hover, .page-link.active {
        border: 1px solid #3f8fca;
    }

    .to-start { background: url("../assets/icons.png") -9px -527px no-repeat; }
    .to-prev { background: url("../assets/icons.png") -9px -447px no-repeat; }
    .to-next { background: url("../assets/icons.png") -47px -447px no-repeat; }
    .to-end { background: url("../assets/icons.png") -47px -527px no-repeat; }

    .page-info {
        font-size: 12px;
        margin-left: 10px;
    }
</style>
