<template>
    <div class="board-wrapper" v-if="boardType === 'goals'">
        <div class="board-title">
            {{ title }}
        </div>
        <div class="board-body">
            <div class="task-wrapper" v-for="(task, i) in tasksList" :key="'task_'+i">

                {{ task.title }}<br>
                {{ task.description }}
                <div>Прогресс: {{ task.progress }}%</div>
            </div>
            <!-- <div>123</div> -->
        </div>
    </div>
    <div class="board-wrapper" v-else-if="boardType === 'tasks'">
        <div class="board-title">
            {{ title }}
        </div>
        <div class="board-body">
            <div class="task-wrapper" v-for="(task, i) in tasksList" :key="'task_'+i">
                {{ task.title }}<br>
                {{ task.description }}
                <div>Приоритет: {{ task.priority }}</div>
            </div>
            <!-- <div>123</div> -->
        </div>
    </div>
</template>

<script lang="ts" src="./Board.ts" />

<style>
.board-wrapper {
    display: flex;
    flex-direction: column;
    padding: 10px;
    /* border: 0px solid #bbc1d0; */
    width: 100%;
    /* background: green; */

}
.task-wrapper {
    margin-top: 5px;
    padding: 10px;
    text-align: left;
    border: 1px solid #bbc1d0;
    display: flex;
    justify-content: space-between;
}
.board-title {
    padding-bottom: 10px;
    border-bottom: 5px solid #bbc1d0;
}

.board-components {
    display: flex;
}
</style>
