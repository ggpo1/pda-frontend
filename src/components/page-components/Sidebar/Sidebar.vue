<template>
    <div class="sidebar-wrapper">
        <router-link to="/">
            <div></div>
        </router-link>
        <router-link to="/tasks">
            <div></div>
        </router-link>
        <router-link to="/books">
            <div></div>
        </router-link>
        <router-link to="/calendar">
            <div></div>
        </router-link>
        <router-link to="/purchases">
            <div></div>
        </router-link>
        <router-link to="/trainings">
            <div></div>
        </router-link>
        <router-link to="/settings">
            <div></div>
        </router-link>
    </div>
</template>

<script lang="ts" src="./Sidebar.ts" />

<style scoped>
.sidebar-wrapper {
    width: 3%;
    padding: 10px;
    background: #0747A6;
}
.sidebar-wrapper div {
    text-align: left;
}
</style>
