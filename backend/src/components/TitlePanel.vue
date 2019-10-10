<template>
  <div class="titlePanel">
      <i class="el-icon-location iconItem"></i>
      <span class="titleContent">{{title}}</span>
    </div>
</template>

<script>
export default {
  props:{
    title:String
  },
  data () {
    return {

    }
  },
  methods: {

  }
};
</script>

<style scoped>
  .titlePanel  {
  padding: 16px;
  margin-bottom:20px;
  border-radius: 5px;
  box-shadow:1px 1px 3px #555555;
  width:fit-content;
  background-color: #324057;
  display: inline-box;
}

.titleContent {
  color:#fff;
  margin-left:10px;
}

.iconItem{
  color:white;
}
</style>
