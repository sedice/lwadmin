<template>
  <div>
    <x-header 
      :right-options = "{showMore: datagroup.length > 0}" 
      :left-options = "{preventGoBack: true,backText:'返回'}" 
      @on-click-more = "showMenuPop =!showMenuPop"
      @on-click-back = 'clickBack'
      style = "position:fixed; top:0;width:100%; z-index:1"
    >新建库存统计单</x-header>

    <div style = "margin-top:50px;">
      <!-- 获取成功 -->
      <div v-if = "datagroup.length > 0" class = "content" style="background-color:#eee">
        <GoodsCard 
          class = "GoodsItem"
          v-for = "(goods) in datagroup" 
          :key = 'goods.name'
          :itemdata = 'goods'
          :monthgroup = "monthgroup"
          :showButton = "true"
          @clickModifyItem = 'clickModifyItem'
        ></GoodsCard>
      </div>
    </div>

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
            placeholder = "请输入商品数量"
            v-for = "(month,index) in monthgroup"
            :key = month
            :title = getMonthTitle(month)
            text-align = "center"
            v-model = "modifyItem.numgroup[index]"
          ></x-input>
          <x-button style = "margin-top:10px;" type="primary" @click.native = 'afterModifyItem'>确定</x-button>
          <x-button @click.native="showModifyPop = false">取消</x-button>
        </div>
      </div>
    </popup> 

  </div>
</template>

<script>

import { XTable, XButton,XHeader,LoadMore,Popup,XInput,Group,Cell,Confirm,Toast} from "vux";
import GoodsCard from "../../components/GoodsCard";

export default {
  components:{XTable,XButton,XHeader,GoodsCard,LoadMore,Popup,XInput,Group,Cell,Confirm,Toast},
  data () {
    return {
      isNum: function (value) {
        return {
          valid: /^(0|[1-9][0-9]*)$/.test(value),
          msg: '您输入的值必须是零或者不以零开头的整数'
        }
      },
      monthgroup:[],
      datagroup:[],
      showModifyPop:false,
      showMenuPop:false,
      modifyItem:{
        name:"",
        index:-1,
        numgroup:[1,1,1,1,1,1]
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
      this.showModifyPop = true;
    },
    getMonthTitle:function(month) {
      return '' + month + '月';
    },
    afterModifyItem () {
      if (this.modifyItem.numgroup.every((val)=>this.isValidNum(val))) {
        var data = this.getTargetIndexItem(this.modifyItem.index);
        this.copyItem(this.modifyItem,data);
        this.showModifyPop = false;
      } else {
        this.$vux.toast.show({
          text:"商品数量有误",
          time:1000,
          type:'warn',
        })
      }
    },
    isValidNum (val) {
      return /^(0|[1-9][0-9]*)$/.test(val)
    },
    copyItem (from,to) {
      to.name = from.name;
      to.numgroup = [];
      to.index = from.index;
      to.numgroup.push(...from.numgroup);
      to.numgroup.forEach((vlue,index)=> {
        to.numgroup[index] = parseInt(vlue);
      });
    },
    getDataFromServer:function () {
      this.$http.get('/api/store/template')
        .then(({data})=>{
          this.monthgroup = data.monthgroup;
          this.datagroup = data.datagroup;
        })
    },
    clickCommit () {
      this.$http.post('/api/store',{
        datagroup:this.datagroup,
        monthgroup:this.monthgroup
      })
      .then((res)=>{
        this.$vux.toast.show({
          text:"提交成功"
        })
        this.$router.replace('/');
      })
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
    }
  },
  created () {
    this.getDataFromServer();
  }
}
</script>

<style scoped>
  .GoodsItem {
    margin-bottom: 10px;
  }

  .GoodsItem:first-child{
    margin-top: 48px;
  }

  .prompt {
    margin-top:100px;
    font-size: 30px;
    background-color: #fff;
    text-align: center;
  }

  .popupItem {
    margin:20px 15px;
    background-color:#eee;
  }

  .inputItem {
    height: 15px;
  }
</style>
