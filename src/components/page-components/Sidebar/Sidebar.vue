<template>
    <div>
        <router-link to="/">
            <div>
                Доски
            </div>
        </router-link>
        <router-link to="/tasks">
            <div>
                Задачи
            </div>
        </router-link>
        <router-link to="/books">
            <div>
                Книжная полка
            </div>
        </router-link>
        <router-link to="/calendar">
            Календарь
        </router-link>
        <router-link to="/purchases">
            Покупки
        </router-link>
        <router-link to="/trainings">
            Тренировки
        </router-link>
        <router-link to="/settings">
            Настройка
        </router-link>
    </div>
</template>

<script lang="ts" src="./Sidebar.ts" />

<style scoped>

</style>
