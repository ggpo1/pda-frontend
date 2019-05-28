<template>
  <div class="boards-wrapper">
    <Board title="Список задач" :tasksList="todoTasks" />
    <Board title="В работе" />
    <Board title="Выполнено" />
  </div>
</template>

<script lang="ts" src="./Boards.ts" />

<style scoped>
.boards-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
}
</style>
