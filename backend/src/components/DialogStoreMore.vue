<template>
  <div class="logFund">
    <el-dialog
      :title = "dialog.title"
      :visible.sync = "dialog.show"
      :close-on-click-modal = "false"
      :close-on-press-escape = "false"
      :modal-append-to-body = "false"
    >
      <el-table
        :data = "tableData"
        max-height = "600"
        border
        style = "width: 100%"
      >
        <el-table-column type = "index" label = "序号" align = "center" width = "70"></el-table-column>
        <el-table-column prop = "name" label = "商品名称" align = "center" width = "200"></el-table-column>
        <el-table-column prop = "m1" label = "账号" align = "center" width = "200"></el-table-column>
        <el-table-column prop = "m2" label = "账号" align = "center" width = "200"></el-table-column>
        <el-table-column prop = "m3" label = "账号" align = "center" width = "200"></el-table-column>
        <el-table-column prop = "m4" label = "账号" align = "center" width = "200"></el-table-column>
        <el-table-column prop = "m5" label = "账号" align = "center" width = "200"></el-table-column>
        <el-table-column prop = "m6" label = "账号" align = "center" width = "200"></el-table-column>
      </el-table> 

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object
  },
  data () {
      return {
        tableData:{},
      }
  }
};
</script>

