<template>
  <div class="fillcontain">
    
    <TitlePanel title = "当前位置:  添加数据 / 商品管理"></TitlePanel>
    <!-- 添加框 -->
    <el-form>
      <el-form-item >
        <el-button
          type = "primary"
          size = "small"
          icon = "view"
          @click = "onAddData()"
          v-if = "hasOperAccess"
        >添加</el-button>
      </el-form-item>
    </el-form>
    
    <!-- 添加弹出 -->
    <DialogShop :dialog = "dialog" :form = "form" @update = "getData"></DialogShop>
    
    <div style="width:1000px;">
      <el-table
        :data = "tableData"
        max-height = "600"
        border
        style = "width: 100%"
      >
        <el-table-column type = "index" label = "序号" align = "center" width = "70"></el-table-column>
        <el-table-column prop = "name" label = "商品名称" align = "center"></el-table-column>

        <el-table-column v-if = "hasOperAccess" prop = "operation" align = "center" label = "操作" fixed = "right" width = "180">
          <template slot-scope = "scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="onUpdateData(scope.row)"
            >修改</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="onDeleteData(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table> 

      <PagePanel :paginations = 'paginations' @updateData = 'getData'></PagePanel>
    <!-- 弹框页面 -->
    </div>
  </div>
</template>

<script>
import DialogShop from "../components/DialogGoods";
import TitlePanel from "../components/TitlePanel";
import PagePanel from "../components/PagePanel";

export default {
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        name:""
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    hasOperAccess () {
      var group = ['admin','manager'];
      return group.some(val => val == this.user.identity)
    }
  },
  components: {
    DialogShop,
    TitlePanel,
    PagePanel
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 获取表格数据
      var page = this.paginations.page_index;
      var pagesize = this.paginations.page_size;
      var url = `/api/goods?page=${page}&pagesize=${pagesize}`;
      this.$axios.get(url).then(res => {
        this.tableData = res.data.group;
        // 设置分页数据
        this.setPaginations(res.data);
      });
    },
    onUpdateData(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改商品信息",
        option: "edit"
      };
      this.form = {
        name:row.name,
        id:row._id
      };
    },
    onDeleteData(row, index) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/api/goods/${row._id}`).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getData();
          });
        }).catch(()=>{})
    },
    onAddData() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加商品信息",
        option: "add"
      };

      this.form = {
        name:""
      };
    },
    setPaginations(data) {
      // 总页数
      this.paginations.total = data.total_num;
      this.paginations.page_index = data.page;
      this.paginations.page_size = data.pagesize;
    }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>