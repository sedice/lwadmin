<template style="background-color:#eef">
  <div class="index_conainer">
    <x-header :left-options="{ showBack: false }">首页</x-header>

    <group class="groupItem" title="库存系统" title-color="rgb(150,0,0)">
      <cell
        class="cellItem"
        title="新建库存统计单"
        is-link
        link="/new_store"
      ></cell>
      <cell
        class="cellItem"
        title="历史库存统计单"
        is-link
        link="/history_store"
      ></cell>
    </group>

    <group title="缺货系统" title-color="rgb(150,0,0)">
      <cell
        class="cellItem"
        title="新建缺货统计单"
        is-link
        link="/new_lack_store"
      ></cell>
      <cell
        class="cellItem"
        title="历史缺货统计单"
        is-link
        link="/history_lack_store"
      ></cell>
    </group>

    <!-- <group title="爆品监控" title-color="rgb(150,0,0)">
      <cell
        class="cellItem"
        title="新建爆品统计单"
        is-link
        link="/new_hotgoodsstore"
      ></cell>
      <cell
        class="cellItem"
        title="历史爆品统计单"
        is-link
        link="/history_hotgoodsstore"
      ></cell>
    </group> -->
    <group title="入库批次统计" title-color="rgb(150,0,0)">
      <cell
        class="cellItem"
        title="新建入库批次统计单"
        is-link
        link="/new_batch_record?type=in"
      ></cell>
      <cell
        class="cellItem"
        title="历史入库批次统计单"
        is-link
        link="/history_batch_record?type=in"
      ></cell>
    </group>

    <group title="出库批次统计" title-color="rgb(150,0,0)">
      <cell
        class="cellItem"
        title="新建出库批次统计单"
        is-link
        link="/new_batch_record?type=out"
      ></cell>
      <cell
        class="cellItem"
        title="历史出库批次统计单"
        is-link
        link="/history_batch_record?type=out"
      ></cell>
    </group>

    <group title="个人资料" title-color="rgb(150,0,0)">
      <cell
        class="cellItem"
        title="查看个人资料"
        is-link
        link="/userinfo"
      ></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XHeader, CellBox, XButton, Divider } from "vux";
export default {
  components: { Group, Cell, XHeader, CellBox, XButton, Divider },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    signout() {
      localStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");
      // 页面跳转
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.cellItem {
  height: 14px;
}
</style>
