<template>
  <div>
    <x-header 
      :left-options = "{preventGoBack: true,backText:'返回'}" 
      @on-click-back = 'clickBack'
      style = "position:fixed; top:0;width:100%; z-index:1"
    >个人信息</x-header>

    <div style = "margin-top:47px;">
      <group>
        <cell title="账号" :value = "user.name" ></cell>
        <cell title="门店" :value = "user.shop" ></cell>
      </group>
      <x-button class="btn" type = 'primary' @click.native = "clickChange">切换账号</x-button>
    </div>
  </div>
</template>

<script>
import {XButton,XHeader,Group,Cell} from "vux";
export default {
  components:{XButton,XHeader,Group,Cell},
  data () {
    return {
      
    }
  },
  computed:{
    user () {
      return this.$store.state.user;
    }
  },
  methods:{
    clickBack () {
      this.$router.replace('/')
    },
    clickChange () {
      localStorage.removeItem('eleToken');
      this.$store.dispatch("setIsAutnenticated", false);
      this.$store.dispatch("setUser", {});
      this.$router.replace('/login');
    }
  }
}
</script>

<style scoped>
  .btn {
    width:95%;
    margin-top:30px;
  }
</style>
