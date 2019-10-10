<template>
  <el-row>
    <el-col :span="24">
      <div class="pagination">
        <el-pagination
          v-if = "paginations.total > 0"
          :total = "paginations.total"
          :page-size = "paginations.page_size"
          :current-page.sync = "paginations.page_index"
          :page-sizes = "page_sizes"
          :layout = "layout"
          @current-change = "handleCurrentChange"
          @size-change = "handleSizeChange"
        ></el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props:{
    paginations:Object
  },
  data () {
    return {
      page_sizes: [10, 20, 50], //每页显示多少条
      layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.paginations.page_index = page;
      this.$emit('updateData');
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.$emit('updateData');
    },
  }
};
</script>

<style scoped>
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
</style>
