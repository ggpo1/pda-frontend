<template>
    <div class="panel" :class="[isPageHeader ? '' : 'padded']">
        
    </div>
</template>

<script>
    import Button from './Button.vue'

    export default {
        props: {
            isPageHeader: Boolean,
            forceInactiveSections: Boolean,
            sections: Array,
            actions: Array
        },
        components: { Button }
    }
</script>

<style scoped>
    .panel {
        display: flex;
        flex-direction: column;
        background: white;

        border-radius: 0 0 3px 3px;
        border-width: 0 0 1px 1px;
        border-style: solid;
        border-color: #bbc1d0;

        padding: 10px 20px;
    }

    .padded {
        border-width: 0 1px 1px;
        border-style: solid;
        border-color: transparent #ccd1de #bbc1d0;
        margin: 15px 0;
        border-radius: 3px;

        margin: 10px 1px;
    }

    .sections {
        display: flex;
    }

    .sections > div {
        display: flex;
        align-items: center;

        height: 48px;
        box-sizing: border-box;
        padding: 0 7px;
        border: 1px solid transparent;
        border-radius: 3px;

        font-size: 12px;
        color: #2a394f;
        user-select: none;
        cursor: pointer;

        margin-right: 10px;
    }
    
    .sections > div:hover, .sections > div.active {
        background: #d5dae6;
        border-color: #aaaeb7 #c7cbd7 #d5dae6;
    }

    .actions {
        display: flex;

        border-top: 1px solid #ccc;
        margin-top: 10px;
        padding-top: 10px;
    }

    .actions-spacing { flex-grow: 1; }
</style>