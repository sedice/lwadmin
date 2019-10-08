<template>
  <div>
    <x-header :right-options="{showMore: false}" 
    style="position:fixed; top:0;width:100%; z-index:1">历史缺货定单</x-header>
    
    <div class = 'container' style="margin-top:50px;">
      <group v-if = "tableArray.length > 0">
        <cell is-link v-for = "(value,index) in tableArray"
          class = "cellItem"
          :key = index
          :title = 'getTitle(value)'
          :link = "'/history_replenish/' + value._id"
          :border-intent="false"
        >
          <div slot="icon" style="margin-right:5px;width:60px;">{{index + 1}}></div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  Group,
  Cell,
} from "vux";

export default {
  components:{
    XHeader,
    Group,
    Cell
  },
  data () {
    return {
      tableArray:[],
    }
  },
  methods :{
    getTitle (item) {
      let {createtime,createindex} = item;
      var time = new Date(createtime);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      if (month < 10) month = '0' + month;
      var day = time.getDate();
      if (day < 10) day = '0' + day;
      return "补货单_" + year + month + day + "_" + createindex;
    },
    getDataFromServer () {
      this.$http.get('/api/replenish')
      .then((res)=>{
        this.tableArray = res.data;
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
