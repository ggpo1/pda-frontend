<template>
    <div class="boards-wrapper">
        <Board title="Список задач" :goalId="goalId" boardType="tasks" :todoList="todoTasks" :doneTodoList="doneTasks"/>
    </div>
</template>

<script lang="ts" src="./Tasks.ts" />

<style>
.boards-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  /* padding: 10px; */
  height: 100%;
}
.controls {
  background-color: yellow;
  display:block;
  position:fixed;
  text-align: left;
  margin-left: calc(100% - 170px);

}
</style>
