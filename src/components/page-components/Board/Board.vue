<template>
    <div class="board-wrapper">
        <div class="board-title">
            {{ title }}
        </div>
        <div class="board-body">
            <div class="task-wrapper" v-for="(task, i) in tasksList" :key="'task_'+i">
                {{ task.title }}<br>
                {{ task.description }}
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
    border: 1px solid #bbc1d0;
    width: 100%;
    height: 100%;
}
.task-wrapper {
    margin-top: 5px;
    padding: 10px;
    text-align: left;
    border: 1px solid #bbc1d0;
    height: auto;
}
.board-title {
    padding-bottom: 10px;
    border-bottom: 1px solid #bbc1d0;
    height: auto;
}
</style>
