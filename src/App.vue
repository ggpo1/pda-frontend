<template>
  <div class="center-horizontal">
    <div id="app">
      <Sidebar/>
      <div class="main-wrapper">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./App.ts" />

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 60%;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 400;
  text-align: center;
  color: #2d3e50;
  border: 1px solid #0747a6;
}

.main-wrapper {
  width: 100%;
}

.center-horizontal {
  display: flex;
  justify-content: center;
  height: 700px;
  margin-top: 100px;
}
</style>
