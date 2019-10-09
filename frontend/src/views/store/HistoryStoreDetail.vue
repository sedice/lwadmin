<template>
  <div>
    <x-header :right-options="{showMore: false}" 
    style="position:fixed; top:0;width:100%; z-index:1">详情</x-header>

    <div style = "margin-top:50px;">
      <!-- 获取成功 -->
      <div v-if = "datagroup.length > 0" class = "content" style="background-color:#eee">
         <GoodsCard 
          class = "GoodsItem"
          v-for = "(goods) in datagroup" 
          :key = 'goods.name'
          :itemdata = 'goods'
          :monthgroup = "monthgroup"
        ></GoodsCard>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsCard from "../../components/GoodsCard";

import {
  XHeader,
  Group,
  Cell,
  LoadMore
} from "vux";
 
export default {
  components:{
    XHeader,
    Group,
    Cell,
    GoodsCard,
    LoadMore,
  },
  data () {
    return {
      monthgroup:[],
      datagroup:[],
    }
  },
  methods :{
    getDataFromServer () {
      var id  = this.$route.params.serchId;
      var url = `/api/store/history/${id}`
      this.$http.get(url).then((res)=>{
          this.monthgroup = res.data.monthgroup;
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
