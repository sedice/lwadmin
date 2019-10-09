<template>
  <div>
    <x-header :right-options="{showMore: false}" 
    style="position:fixed; top:0;width:100%; z-index:1">历史库存统计单</x-header>
    
    <div class = 'container' style="margin-top:50px;">
      <group v-if = "requestedServer && tableArray.length > 0">
        <cell is-link v-for = "(value,index) in tableArray"
          class = "cellItem"
          :key = index
          :title = 'getTitle(value)'
          :link = "'/history_store/' + value._id"
          :border-intent="false"
        >
          <div slot="icon" style="margin-right:5px;width:60px;">{{index + 1}}></div>
        </cell>
      </group>

      <divider v-else-if="requestedServer && tableArray.length == 0">
        暂无记录
      </divider>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  Group,
  Cell,
  Divider
} from "vux";
 
import MyLoadMore from "../../components/MyLoadMore";

export default {
  components:{
    XHeader,
    Group,
    Cell,
    Divider
  },
  data () {
    return {
      tableArray:[],
      requestedServer:false,
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
      return "库存统计单_" + year + month + day + "_" + createindex;
    },
    getDataFromServer () {
      this.$http.get('/api/store')
      .then((res)=>{
        this.tableArray = res.data;
        this.requestedServer = true;
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
