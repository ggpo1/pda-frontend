<template>
  <div class="boards-wrapper">
    <Board title="Список целей" boardType="goals" :tasksList="todoTasks" />
  </div>
</template>

<script lang="ts" src="./Goals.ts" />

<style scoped>
.boards-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  /* padding: 10px; */
  height: 100%;
}
</style>
