<template>
  <div>
    <x-header style="position:fixed; top:0;width:100%; z-index:1">404</x-header>
    <div class = 'container' style="margin-top:50px;">
      <divider >
        您访问了不存在的页面,请点击返回
      </divider>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  Divider
} from "vux";
 
export default {
  components:{
    XHeader,
    Divider
  },
  data () {
    return {
    }
  },
}
</script>
