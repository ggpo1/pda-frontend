<template>
    <div class="table">
        <div class="header">
            <div>{{header}}</div>
            <GreenButton header="Перенести сроки"/>
            <GreenButton header="утвердить все"/>
            <div class="btn btn-add" @click="$emit('add-lot')"></div>
            <div class="btn btn-filter"></div>
            <div class="btn btn-fa"><fa-icon class="fa" icon="sync"/></div>
            <div class="btn btn-fa green"><fa-icon class="fa" icon="search"/><div>Поиск</div></div>
        </div>
    </div>
</template>

<script lang="ts">
import GreenButton from '@/components/GreenButton.vue'

export default {
        props: {
            header: String,
        },
        components: {
            GreenButton
        },
}
</script>

<style scoped>
    .table {
        display: flex;
        flex-direction: column;

        padding: 30px;
        padding-bottom: 0px;
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


</style>

