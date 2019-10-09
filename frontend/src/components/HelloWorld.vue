<template>
  <div class="hello" style="height:100%; font-size:11px" >
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true"
    style="position:fixed; top:0;width:100%; z-index:1"
    >新建库存统计单</x-header>
    <div style="padding:0 5px; margin:47px 0;" :cell-bordered="true">
      <x-table>
        <thead>
          <tr>
            <th style="width:5%">序号</th>
            <th >商品名称</th>
            <th style="width:6%">16月</th>
            <th style="width:6%">15月</th>
            <th style="width:6%">14月</th>
            <th style="width:6%">13月</th>
            <th style="width:6%">12月</th>
            <th style="width:6%">11月</th>
            <th style="width:10%">修改</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = ' (num) in 100 ' :key = num @click="touch(num)">
            <td>55</td>
            <td style="text-algin:left">我我我我我我我我我我我我</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td><x-button type="warn" style="margin:5px 4px; font-size:8px" >修改</x-button></td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>

<script>

import { XTable, XButton,XHeader } from "vux";

export default {
  name: 'HelloWorld',
  components:{XTable,XButton,XHeader},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods :{
    touch (num) {
      console.log(num);
    }
  }
}
</script>

<style scoped>

</style>
