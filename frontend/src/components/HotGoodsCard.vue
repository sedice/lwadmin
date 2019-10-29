<template>
    <card>
      <div slot = "header">
        <!-- 第一行 序号 按钮-->
        <div style="height:35px; line-height:35px; ">
          <span style="margin:0px 15px;">序号:</span><span >{{itemdata.index + 1}}</span>
          <x-button v-if = "showButton" type="warn" style=" float:right; margin:5px 5px; width:65px; font-size:12px;"
          @click.native="clickModify(itemdata.index)" >修改</x-button>
        </div>
        <!-- 第一行 名称-->
        <div style="height:35px; line-height:35px; ">
          <span style="margin:0px 15px 0 15px;">名称:</span><span >{{itemdata.name}}</span>
        </div>
      </div>
      <div slot="content" >
        <XTable>
        <thead>
          <tr>
            <th>今日销售量</th>
            <th>剩余库存</th>
          </tr>
        </thead>
        <tbody>
          <th>{{itemdata.saleNum}}</th>
          <th>{{itemdata.restNum}}</th>
        </tbody>
        </XTable>
      </div>
    </card>
</template>

<script>
import {Card,XTable,XButton} from "vux";

export default {
  components :{Card,XTable,XButton},
  props:['itemdata','showButton'],
  data () {
    return {
     
    }
  },
  methods:{
    clickModify (index) {
      this.$emit('clickModifyItem',index);
    }
  }
}
</script>

