<template>
    <card>
      <div slot = "header">
        <!-- 第一行 序号 按钮-->
        <div style="height:35px; line-height:35px; ">
          <span style="margin:0px 15px;">序号:</span><span >{{itemdata.index}}</span>
          <x-button v-if = "showButton" type="warn" style=" float:right; margin:5px 5px; width:65px; font-size:12px;"
          @click.native="clickModify(itemdata.index)" >修改</x-button>
        </div>
        <!-- 第一行 名称-->
        <div style="height:35px; line-height:35px; ">
          <span style="margin:0px 15px 0 15px;">名称:</span><span >{{itemdata.name}}</span>
        </div>
      </div>
      <div slot="content" class="table_wrapper">
        <XTable>
        <thead>
          <tr>
            <th class = "col" v-for = "(month) in preMonthArray" :key="month" >{{month}}月</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for = "(num,index) in preNumArray" :key="index">{{num}}</td>
          </tr>
        </tbody>
        </XTable>

        <XTable>
        <thead>
          <tr>
            <th class = "col" v-for = "(month) in afterMonthArray" :key="month" >{{month}}月</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for = "(num,index) in afterNumArray" :key="index">{{num}}</td>
          </tr>
        </tbody>
        </XTable>
      </div>
    </card>
</template>

<script>
import {Card,XTable,XButton} from "vux";

export default {
  components :{Card,XTable,XButton},
  props:['itemdata','monthgroup','showButton'],
  data () {
    return {
     
    }
  },
  computed:{
    preMonthArray:function () {
      return this.monthgroup.slice(0,6);
    },
    afterMonthArray:function() {
      return this.monthgroup.slice(6);
    },
    preNumArray:function () {
      return this.itemdata.numgroup.slice(0,6);
    },
    afterNumArray:function() {
      return this.itemdata.numgroup.slice(6);
    },
  },
  methods:{
    clickModify (index) {
      this.$emit('clickModifyItem',index);
    }
  }
}
</script>

<style lang="css" scoped>
  .col {
    width:16.6667%;
  }
</style>

