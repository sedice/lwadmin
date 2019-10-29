<template>
  <div>
    <x-header 
      :right-options = "{showMore: datagroup.length > 0}" 
      :left-options = "{preventGoBack: true,backText:'返回'}" 
      @on-click-more = "showMenuPop =!showMenuPop"
      @on-click-back = 'clickBack'
      style = "position:fixed; top:0;width:100%; z-index:1"
    >新建爆品统计单</x-header>

    <div class = "container" style = 'margin-top:50px; background-color:#eee'>
      <HotGoodsCard 
          class = "GoodsItem"
          v-for = "(goods) in datagroup" 
          :key = 'goods.name'
          :itemdata = 'goods'
          :showButton = "true"
          @clickModifyItem = 'clickModifyItem'
        ></HotGoodsCard>
    </div>

    <!-- 弹出框 -->
    <popup v-model="showMenuPop" >
      <div class = "popupItem">
        <x-button @click.native="clickCommit" type="primary">提交</x-button>
        <x-button @click.native="showMenuPop = false">取消</x-button>
      </div>
    </popup>
    
    <popup v-model="showModifyPop" >
      <div>
        <div style="margin:0px 10px 10px 10px;">
          <cell :title = "modifyItem.name" style="height:25px; color:red"></cell>
          <x-input keyboard="number"
            class="inputItem"
            :is-type ='isNum'
            :show-clear="false"
            placeholder = "0"
            title = "当日销售量"
            text-align = "center"
            v-model = "modifyItem.saleNum"
          ></x-input>
          <x-input keyboard="number"
            class="inputItem"
            :is-type ='isNum'
            :show-clear="false"
            placeholder = "0"
            title = "剩余库存数量"
            text-align = "center"
            v-model = "modifyItem.restNum"
          ></x-input>
          <x-button style = "margin-top:10px;" type="primary" @click.native = 'afterModifyItem'>确定</x-button>
          <x-button @click.native="showModifyPop = false">取消</x-button>
        </div>
      </div>
    </popup> 

  </div>
</template>

<script>
import HotGoodsCard from "../../components/HotGoodsCard";

import {
  XButton,
  XHeader,
  Cell,
  Popup,
  XInput,
  Checklist
} from "vux";

export default {
  components:{
    HotGoodsCard,
    Cell,
    Checklist,
    XButton,
    XHeader,
    XInput,
    Popup
  },
  data () {
    return {
      isNum: function (value) {
        return {
          valid: /^(0|[1-9][0-9]*)$/.test(value),
          msg: '您输入的值必须是零或者不以零开头的整数'
        }
      },
      datagroup:[],
      showMore:false,
      showMenuPop:false,
      showModifyPop:false,
      modifyItem:{
        name:"",
        index:-1,
        saleNum:0,
        restNum:0
      }
    }
  },
  methods :{
    getTargetIndexItem (index) {
      for (var i = 0 ; i < this.datagroup.length; i++) {
        if (index == this.datagroup[i].index) {
          return this.datagroup[i];
        }
      }
      return null;
    },
    clickModifyItem (index) {
      var data = this.getTargetIndexItem(index);
      this.copyItem(data,this.modifyItem);
      this.modifyItem.saleNum = this.modifyItem.saleNum ||"";
      this.modifyItem.restNum = this.modifyItem.restNum ||"";
      this.showModifyPop = true;
    },
    afterModifyItem () {
      if (this.isNum(this.modifyItem.saleNum) && this.isNum(this.modifyItem.restNum)) {
        var data = this.getTargetIndexItem(this.modifyItem.index);
        this.copyItem(this.modifyItem,data);
        data.saleNum = this.modifyItem.saleNum || 0;
        data.restNum = this.modifyItem.restNum || 0;
        this.showModifyPop = false;
      } else {
        this.$vux.toast.show({
          text:"商品数量有误",
          time:1000,
          type:'warn',
        })
      }
    },
    copyItem (from,to) {
      to.name = from.name;
      to.index = from.index;
      to.saleNum = from.saleNum;
      to.restNum = from.restNum;
    },
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
      this.$http.post('/api/hotgoodsstore',{
        datagroup:this.datagroup
      })
      .then((res)=>{
        this.$vux.toast.show({
          text:"提交成功"
        })
        this.$router.replace('/');
      })
    },
    getGoodsFromServer () {
      this.$http.get('/api/hotgoodsstore/template')
        .then(({data})=>{
          this.datagroup = data.datagroup.map((val,index)=>{
            return {
              name:val,
              saleNum:0,
              restNum:0,
              index
            }
          });
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
