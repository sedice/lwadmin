<template>
  <div>
    <x-header :right-options="{showMore: false}" 
    style="position:fixed; top:0;width:100%; z-index:1">详情</x-header>

    <div style = "margin-top:50px;">

      <!-- 获取成功 -->
      <div v-if = "datagroup.length > 0" class = "content" style="background-color:#eee; font-size:12px;">
        <x-table :cell-bordered="true" style="background-color:#fff;">
        <thead>
          <tr>
            <th style="width:10%;">序号</th>
            <th style="width:50%;">商品名称</th>
            <th style="width:15%;">当日销售量</th>
            <th style="width:15%;">剩余库存量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value,index) in datagroup"
          :key = index>
            <td>{{index + 1}}</td>
            <td>{{value.name}}</td>
            <td>{{value.saleNum}}</td>
            <td>{{value.restNum}}</td>
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
      var url = `/api/hotgoodsstore/history/${id}`
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
