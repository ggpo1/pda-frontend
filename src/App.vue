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
  height:  100%;
}
#app {
  display: flex;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: auto;       /* These two lines were the key. */
  min-height: 100%;
  width: 100%;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 400;
  text-align: center;
  color: #2d3e50;
  border: 1px solid #0747a6;
}

.main-wrapper {
  width: 100%;
  height: auto;
}

.center-horizontal {
  display: flex;
  justify-content: center;
  
  /* margin-top: 100px; */
}
</style>
