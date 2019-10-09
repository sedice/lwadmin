<template>
  <div>
    <x-header :right-options="{showMore: false}" 
    style="position:fixed; top:0;width:100%; z-index:1">详情</x-header>

    <div style = "margin-top:50px;">

      <!-- 获取成功 -->
      <div v-if = "datagroup.length > 0" class = "content" style="background-color:#eee">
        <x-table :cell-bordered="true" style="background-color:#fff;">
        <thead>
          <tr>
            <th>序号</th>
            <th>商品名称</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value,index) in datagroup"
          :key = index>
            <td>{{index + 1}}</td>
            <td>{{value}}</td>
          </tr>
        </tbody>
      </x-table>
      </div>
      
    </div>
  </div>
</template>

<script>

import {
  XHeader,
  Group,
  Cell,
  XTable
} from "vux";
 
export default {
  components:{
    XHeader,
    Group,
    Cell,
    XTable
  },
  data () {
    return {
      datagroup:[],
    }
  },
  methods :{
    getDataFromServer () {
      var id  = this.$route.params.serchId;
      var url = `/api/replenish/history/${id}`
      this.$http.get(url).then((res)=>{
        this.datagroup = res.data.datagroup;
      })
    },
  },
  created () {
    this.getDataFromServer();
  }
}
</script>

<style scoped>
  .cellItem {
    height: 25px;
  }
</style>
