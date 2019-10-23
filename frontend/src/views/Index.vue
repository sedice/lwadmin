<template style="background-color:#eef">
  <div >
    <x-header :left-options="{showBack: false}" >首页</x-header>

      <group class = 'groupItem' title="库存系统" title-color = "rgb(150,0,0)">
        <cell class="cellItem" title="新建库存统计单" is-link link="/new_store" ></cell>
        <cell class="cellItem" title="历史库存统计单" is-link link="/history_store" ></cell>
      </group>

      <group title="缺货系统" title-color = "rgb(150,0,0)">
        <cell class="cellItem" title="新建缺货统计单" is-link link="/new_lack_store" ></cell>
        <cell class="cellItem" title="历史缺货统计单" is-link link="/history_lack_store" ></cell>
      </group>

      <!-- <group title="补货系统" title-color = "rgb(150,0,0)">
        <cell class="cellItem" title="新建补货统计单" is-link link="/new_replenish" ></cell>
        <cell class="cellItem" title="历史补货统计单" is-link link="/history_replenish" ></cell>
      </group> -->

      <group title="个人资料" title-color = "rgb(150,0,0)">
        <cell class="cellItem" title="查看个人资料" is-link link="/userinfo" ></cell>
      </group>
  </div>
</template>

<script>
import { Group, Cell,XHeader,CellBox,XButton,Divider} from "vux";
export default {
  components:{Group,Cell,XHeader,CellBox,XButton,Divider},
  data () {
    return {
      showContent001:false,
      showContent002:false,
      showContent003:false,
      showContent004:false,
    }
  },
  computed:{
    user() {
      return this.$store.state.user;
    }
  },
  methods:{
    signout () {
      localStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");
      // 页面跳转
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
  .cellItem {
    height:25px;
  }

</style>
