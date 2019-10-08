<template>
    <el-dialog v-if = "dialogConf.datagroup.length > 0" :title="dialogConf.title" :visible.sync="dialogConf.visible" width = "70%">
      <el-table :data = "dialogConf.datagroup" border  lock-scroll = "false">
        <el-table-column type = "index" label="序号" align = 'center' width="70"></el-table-column>
        <el-table-column property = "name" label="商品名称" align = 'center' ></el-table-column>
        <el-table-column 
          v-for = "index in dialogConf.monthgroup.length"
          :key = index
          width = '80px'
          align = 'center'
          :property = "getMonth(index - 1)"
          :label = "getMonth(index - 1)">
        </el-table-column>
      </el-table>
    </el-dialog>
</template>

<script>
export default {
  props: {
    dialogConf: Object,
  },
  data() {
      return {

      }
  },
  methods: {
    getMonth (index) {
      return this.dialogConf.monthgroup[index] + "月"
    },
  }
};
</script>

