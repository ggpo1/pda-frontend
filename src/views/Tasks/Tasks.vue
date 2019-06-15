<template>
    <div class="boards-wrapper">
        <Board title="Список задач" boardType="tasks" :tasksList="todoTasks" />
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
</style>
