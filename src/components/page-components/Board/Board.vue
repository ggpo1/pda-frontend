<template>
    <div class="board-wrapper">
        <div class="board-title">
            {{ title }}
        </div>
        <div class="board-body">
            <div v-for="(task, i) in tasksList" :key="'task_'+i" class="board-title">
                {{ task.title }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./Board.ts" />

<style>
.board-wrapper {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background: green;

}
</style>
