<template>
    <div class="sidebar-wrap">
        
    </div>
</template>

<style scoped>
    .sidebar-wrap {
        cursor: default;
        height: 100%;
        background: #f0f3f5;
        color: #2d3e50;

        position: fixed;
        padding-top: 100px;

        z-index: 999;
    }

    .sidebar-collapse-icon-wrap {
        position: absolute;
        top: 100px;
        right: -15px;
        margin-top: 30px;

        width: 15px;
        height: 30px;
        
        cursor: pointer;
        overflow: hidden;
    }


    .sidebar-collapse-icon {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        margin-left: -15px;

        width: 30px;
        height: 30px;
        background: #f0f3f5;
        border-radius: 50%;
        
        cursor: pointer;
    }

    .sidebar-collapse-icon::before {
        font-size: 20px;
        font-family: "EaistFont";

        content: '';
        transform: rotate(90deg);
    }

    .sidebar {
        width: 100%;
        height: calc(100% - 100px);

        

        overflow-y: auto;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    li > div {
        font-size: 13px;
        padding: 10px 30px;

        border-bottom: 1px solid #00000010;
    }

    .nested-li div {
        padding-left: 45px;
    }

    .sidebar > li:not(.router-link-active) .nested-li {
        display: none;
    }

    .nested-li li.router-link-exact-active div {
        background: #becad2;
    }

    .sidebar > li.router-link-active:not(.use-exact-hint), .sidebar > li.router-link-exact-active:not(.single-element) {
        background: #e0e5e9;
    }

    .sidebar > li.router-link-exact-active.single-element {
        background: #becad2;
    }
</style>