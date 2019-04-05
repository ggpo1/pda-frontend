<template>
    <div class="table">
        <div class="header">
            <div>{{header}}</div>
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

        background: #eef1f7;
        border-radius: 3px;
        border-width: 0 1px 1px;
        border-style: solid;
        border-color: transparent #ccd1de #dadfea;

        font-size: 25px;
        color: black;
    }

    .header :first-child {
        flex-grow: 1;
    }
</style>

