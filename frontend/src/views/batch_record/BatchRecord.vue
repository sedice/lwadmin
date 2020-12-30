<template>
  <div>
    <x-header
      :right-options="{ showMore: false }"
      style="position:fixed; top:0;width:100%; z-index:1"
      >{{ isOut ? "历史出库批次统计单" : "历史入库批次统计单" }}</x-header
    >

    <div class="container" style="margin-top:50px;">
      <group v-if="requestedServer && tableArray.length > 0">
        <cell
          is-link
          v-for="(value, index) in tableArray"
          class="cellItem"
          :key="index"
          :title="getTitle(value)"
          :link="transfromHistory(value._id)"
          :border-intent="false"
        >
          <div slot="icon" style="margin-right:5px;width:60px;">
            {{ index + 1 }}>
          </div>
        </cell>
      </group>

      <divider v-else-if="requestedServer && tableArray.length == 0">
        暂无记录
      </divider>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, Divider } from "vux";

import MyLoadMore from "../../components/MyLoadMore";

export default {
  components: {
    XHeader,
    Group,
    Cell,
    Divider
  },
  data() {
    return {
      tableArray: [],
      requestedServer: false
    };
  },
  computed: {
    isOut() {
      return this.$route.query.type === "out" ? true : false;
    }
  },
  methods: {
    transfromHistory(id) {
      return `/history_batch_record/${id}?type=${this.isOut ? "out" : "in"}`;
    },
    getTitle(item) {
      let { createtime, createindex } = item;
      var time = new Date(createtime);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      if (month < 10) month = "0" + month;
      var day = time.getDate();
      if (day < 10) day = "0" + day;
      const prefix = this.isOut ? "出" : "入";
      return prefix + "库批次统计单_" + year + month + day + "_" + createindex;
    },
    getDataFromServer() {
      const url = `/api/batch_record?type=${this.isOut ? "out" : "in"}`;
      this.$http.get(url).then(res => {
        this.tableArray = res.data;
        this.requestedServer = true;
      });
    }
  },
  created() {
    this.getDataFromServer();
  }
};
</script>

<style scoped>
.cellItem {
  height: 25px;
}
</style>
