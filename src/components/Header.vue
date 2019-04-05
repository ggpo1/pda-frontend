<template> 
    <div class="header">
        <div class="first-line">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PlanObjects extends Vue {}
</script>


<style scoped>
    .header {
        display: flex;
        flex-direction: column;
        position: fixed;

        width: 100%;

        z-index: 999;
    }

    .header * {
        color: white;
    }

    .header > div { 
        height: 50px; 
        padding: 0 40px;
    }

    .first-line {
        display: flex;
        background: #647b8c;
        align-items: center;
    
        font-size: 16px;
    }

    .second-line {
        display: flex;
        background: #e0e5e9;
    }

    .logo {
        display: block;
        height: 36px;
    }

    svg { 
        fill: white;
        width: auto;
        height: 100%;
    }

    .year-selector {
        display: flex;
        align-items: center;
        margin-left: 125px;

        cursor: pointer;
    }

    .organization {
        display: flex;
        align-items: center;
        margin-left: 38px;
        flex-grow: 1;

        cursor: pointer;
    }

    .year-selector:before, .organization:before {
        display: block;
        content: '';
        color: #c4c7cc;
        font-family: 'EaistFont';
        font-size: 24px;
        margin-right: 10px;
    }
    
    .with-icon {
        display: flex;
        align-items: center;
        margin-left: 30px;

        text-decoration: none;
    }

    .with-icon:visited {
        color: white;
    }
    
    .with-icon::before {
        display: block;
        color: #b7e0ff;
        margin-right: 15px;
        font-family: "EaistFont";
        font-size: 24px;
    }

    .icon-add::before { content: ""; }
    .icon-notification::before { content: ""; }
    .icon-user::before { content: ""; }

    .badge, .badge:visited {
        margin-left: 30px;
        display: flex;
        background: #999;

        width: 20px;
        height: 20px;
        font-size: 12px;

        justify-content: center;
        align-items: center;
        
        text-decoration: none;
        color: white;

        border-radius: 50%;
    }

    .header-link, .header-link:visited {
        display: flex;
        padding: 0 20px;

        color: #4d4d4d;
        text-decoration: none;

        align-items: center;
        cursor: pointer;
    }

    .header-link ~ .header-link {
        margin-left: 7px;
    }

    .header-link:hover {
        background: #4c4c4c08;
    }

    .header-link.router-link-active {
        background: #cad3db;
        border-top: 6px solid #00000000;
        border-bottom: 6px solid #4db2ff;
    }

    .panel-link {
        font-family: "EaistFont";
        font-size: 24px;
        color: #999;
    }
</style>