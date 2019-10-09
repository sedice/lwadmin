<template>
  <div class="fillcontain">
    
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
    <DialogBackUser :dialog = "dialog" :form = "form" @update = "getData"></DialogBackUser>
    
    <div class="table_container">
      <el-table
        :data = "tableData"
        max-height = "600"
        border
        style = "width: 1200px;"
      >
        <el-table-column type = "index" label = "序号" align = "center" width = "70"></el-table-column>
        <el-table-column prop = "name" label = "账号" align = "center" ></el-table-column>
        <el-table-column prop = "password" label = "密码" align = "center" ></el-table-column>
        <el-table-column prop = "identity" :formatter = 'identityFormatter' label = "权限" align = "center" ></el-table-column>
        <el-table-column v-if = 'hasOperAccess' prop = "operation" align = "center" label = "操作" fixed = "right" width = "180">
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

      <!-- 分页 -->
      <el-row style="width:1200px;">
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    <!-- 弹框页面 -->
    </div>
  </div>
</template>

<script>
import DialogBackUser from "../components/DialogBackUser";

export default {
  data() {
    return {
      tableData: [],
      shopGroup:[],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        name:"",
        password:"",
        identity:"normal"
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
        page_sizes: [10, 20, 50], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
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
    DialogBackUser
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 获取表格数据
      var page = this.paginations.page_index;
      var pagesize = this.paginations.page_size;

      var url = `/api/backuser?page=${page}&pagesize=${pagesize}`;
      this.$axios.get(url).then(res => {
        this.tableData = res.data.group;
        // 设置分页数据
        this.setPaginations(res.data);
      });
    },
    onUpdateData(row) {
      if (!this.checkHasDelAndUpAccess(row)) return;

      // 编辑
      this.dialog = {
        show: true,
        title: "修改用户信息",
        option: "edit"
      };
      this.form = {
        name:row.name,
        id:row._id,
        password:row.password,
        identity:row.identity
      };
    },
    checkHasDelAndUpAccess(row) {
      var userIdentity = this.user.identity;
      if (userIdentity != 'admin' && userIdentity != 'manager') {
        this.$message({
          type: 'success',
          message: '你没有此权限'
        });
        return false;
      }

      if (userIdentity == 'manager' && row.identity == 'manager' && this.user.name != row.name) {
        this.$message({
          type: 'success',
          message: '您没有操作该管理员的权限'
        });
        return false;
      }
      return true;
    },
    onDeleteData(row, index) {
      if (!this.checkHasDelAndUpAccess(row)) return;
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/api/backuser/${row._id}`).then(res => {
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
        title: "添加用户信息",
        option: "add"
      };

      this.form = {
        name:"",
        password:"",
        identity:"normal"
      };
    },
    handleCurrentChange(page) {
      this.paginations.page_index = page;
      this.getData();
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.getData();
    },
    setPaginations(data) {
      // 总页数
      this.paginations.total = data.total_num;
      this.paginations.page_index = data.page;
      this.paginations.page_size = data.pagesize;
    },
    identityFormatter(row, column, cellValue, index) {
      if (cellValue == 'normal') return "普通";
      else if (cellValue == 'manager') return "管理员";
      else if (cellValue == 'admin') return "admin";
      else return "未知"
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