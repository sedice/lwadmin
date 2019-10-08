<template>
  <div id="rootapp">
    <router-view></router-view> 
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body {
  margin: 0px;
  padding: 0px;
}

#rootapp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(250,250,250);
}
</style>
