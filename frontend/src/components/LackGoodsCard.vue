<template>
    <card>
      <div slot = "header">
        <!-- 第一行 序号 按钮-->
        <div style="height:35px; line-height:35px; ">
          <span style="margin:0px 15px;">序号:</span><span >{{index + 1}}</span>
          <x-button v-if = "showButton" type="warn" style=" float:right; margin:5px 5px; width:65px; font-size:12px;"
          @click.native="clickDelete(index)" >删除</x-button>
          <x-button v-if = "showButton" type="primary" style=" float:right; margin:5px 5px; width:65px; font-size:12px;"
          @click.native="clickModify(index)" >修改</x-button>
        </div>
      </div>
      <div slot="content" >
        <div style="height:35px; line-height:35px; ">
          <span style="margin:0px 15px 0 15px;">名称:</span><span >{{name}}</span>
        </div>
        <div style="height:35px; line-height:35px; ">
          <span style="margin:0px 15px 0 15px;">数量:</span><span >{{num}}</span>
        </div>
      </div>
    </card>
</template>

<script>
import {Card,XButton} from "vux";

export default {
  components :{Card,XButton},
  props:['name','num','showButton','index'],
  data () {
    return {
     
    }
  },
  methods:{
    clickModify (index) {
      this.$emit('clickModify',index);
    },
    clickDelete (index) {
      this.$emit('clickDelete',index);
    }
  }
}
</script>

