<template>
  <div>
    <x-header 
      :right-options = "{showMore: goods_group.length > 0}" 
      :left-options = "{preventGoBack: true,backText:'返回'}" 
      @on-click-more = "showMenuPop =!showMenuPop"
      @on-click-back = 'clickBack'
      style = "position:fixed; top:0;width:100%; z-index:1"
    >新建缺货统计单</x-header>

    <div class = "container" style = 'margin-top:50px;'>
      <p class = "promptTitle">请勾选出缺货商品</p>
      <checklist  
        label-position = "left" 
        required 
        :options = "goods_group" 
        v-model = "lack_goods_group" 
      ></checklist>
    </div>

    <!-- 弹出框 -->
    <popup v-model="showMenuPop" >
      <div class = "popupItem">
        <x-button @click.native="clickCommit" type="primary">提交</x-button>
        <x-button @click.native="showMenuPop = false">取消</x-button>
      </div>
    </popup>

  </div>
</template>

<script>

import {
  XButton,
  XHeader,
  Popup,
  XInput,
  Checklist
} from "vux";

export default {
  components:{
    Checklist,
    XButton,
    XHeader,
    XInput,
    Popup
  },
  data () {
    return {
      goods_group:[],
      lack_goods_group:[],
      showMore:false,
      showMenuPop:false,
    }
  },
  methods :{
    clickBack () {
      this.$vux.confirm.show({
        title:"提示",
        content:"确定要返回吗?",
        onCancel : () => {
          this.$vux.confirm.hide();
        },
        onConfirm : () => {
          this.$vux.confirm.hide();
          this.$router.replace('/')
        }
      })
    },
    clickCommit () {
      if (this.lack_goods_group.length == 0) {
        return this.$vux.toast.show({
          text:"不能提交空记录",
          time:1000,
          type:'warn',
        })
      } 
      this.$http.post('/api/lackstore',{
        datagroup:this.lack_goods_group
      })
      .then((res)=>{
        this.$vux.toast.show({
          text:"提交成功"
        })
        this.$router.replace('/');
      })
    },
    getGoodsFromServer () {
      this.$http.get('/api/lackstore/template')
        .then(({data})=>{
          this.goods_group = data.datagroup;
        })
    },
  },
  created () {
    this.getGoodsFromServer();
  }
}
</script>

<style scoped>
  .buttonItem {
    width:40%;

    margin: 0px;
    border:1px solid red;
  }

  .popupItem {
    margin:20px 15px;
    background-color:#eee;
  }

  .promptTitle {
    font-size: 20px;
    color: red;
    text-align: center;
    width:100%;
  }
</style>
