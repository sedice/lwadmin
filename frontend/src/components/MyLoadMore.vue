<template>
  <div>
    <load-more v-if = 'status == 0' 
      tip="正在加载数据" 
      style = "margin-top:80px; font-size:20px" > </load-more>
    <load-more v-if = 'status == 1'
      :show-loading="false" 
      tip="当前没有任何记录" 
      style = "margin-top:80px; font-size:20px" > </load-more>
    <load-more v-else-if = 'status == 3' 
      :show-loading="false" 
      @click.native = 'click' 
      tip="加载失败,点击重试" 
      style = "margin-top:100px; font-size:20px" > </load-more>
    <div v-else></div>
  </div>
</template>

<script>
import {LoadMore} from "vux";

export default {
  components :{LoadMore},
  props:['status'],
  data () {
    return {
     
    }
  },
  methods:{
    click () {
      this.$emit('click');
    },
  }
}
</script>

