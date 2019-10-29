<template>
  <div class="fillcontain">
    <TitlePanel title = "当前位置:  数据查询 / 爆品库存查询"></TitlePanel>
    <!-- 头顶的搜索框 -->
    <SerchPanel
      @clickSerch = 'clickSerch' 
      :serchRule = 'serchRule'></SerchPanel>
    <div class="table_container">
    
    <!-- 中间的内容表格 -->
    <el-table
      :data = "tableData"
      max-height = "600"
      border
      style = "width: 100%"
    >
        <el-table-column type = "index" label = "序号" align = "center" width = "70"></el-table-column>
        <el-table-column prop = "createtime" :formatter = 'formatDate' width = "150" label = "日期" align = "center"></el-table-column>
        <el-table-column prop = "title" label = "标题" align = "center"></el-table-column>
        <el-table-column prop = "creator" label = "提交者" align = "center" width = "120"></el-table-column>
        <el-table-column prop = "shop" label = "门店" align = "center" width = "120"></el-table-column>

        <el-table-column prop = "operation" align = "center" label = "操作" fixed = "right" width = "180">
          <template slot-scope = "scope">
            <el-button
              type="danger"
              icon="edit"
              size="small"
              v-if = "hasOperAccess"
              @click="onDeleteData(scope.row)"
            >删除</el-button>

            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="onShowDeatilDialog(scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table> 

      <!-- 分页 -->
      <PagePanel :paginations = 'paginations' @updateData = 'getData'></PagePanel>
    </div>
    
    <DialogHotStoreDetail
      :dialogConf = 'dialogDetailConf'
    ></DialogHotStoreDetail>
  </div>
</template>

<script>

import SerchPanel from "../components/SerchPanel";
import DialogHotStoreDetail from "../components/DialogHotStoreDetail";
import TitlePanel from "../components/TitlePanel";
import PagePanel from "../components/PagePanel";

export default {
  data() {
    return {
      tableData: [],
      detailDialogVisible:false,
      datagroup:{},
      monthgroup:{},
      dialogDetailConf:{
        visible:false,
        title:"",
        datagroup:[],
        monthgroup:[]
      },
      serchRule: {
        creator:"",
        shop:"",
        shopgroup:[],
        time:[]
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 1页显示多少条
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    hasOperAccess () {
      return this.user.identity == 'admin' || this.user.identity == 'manager'
    }
  },
  components: {
    SerchPanel,
    DialogHotStoreDetail,
    TitlePanel,
    PagePanel
  },
  created() {
    this.getData();
  },
  methods: {
    formatDate (row, column, cellValue, index) {
      var time = new Date(cellValue);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      if (month < 10) month = '0' + month;
      var day = time.getDate();
      if (day < 10) day = '0' + day;
      return year + '/' + month + '/' + day;
    },
    clickSerch () {
      this.paginations.page_index = 1;
      this.getData();
    },
    getDetailData (row) {
      var url = `/api/hotgoodsstore/${row._id}`;
      this.$axios.get(url).then(res => {
        this.dialogDetailConf.datagroup = res.data.datagroup;
        this.dialogDetailConf.visible = true;
        this.dialogDetailConf.title = this.getTitle(row);
      });
    },
    getTitle (item) {
      let {shop,creator,createtime,createindex} = item;
      var time = new Date(createtime);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      if (month < 10) month = '0' + month;
      var day = time.getDate();
      if (day < 10) day = '0' + day;
      return shop + "_" + creator + "_爆品库存统计单_" + year + month + day + "_" + createindex;
    },
    getData() {
      // 获取表格数据
      var page = this.paginations.page_index;
      var pagesize = this.paginations.page_size;

      var url = `/api/hotgoodsstore?page=${page}&pagesize=${pagesize}`;
      // 按创建者删选
      if (this.serchRule.creator) {
        url += `&creator=${this.serchRule.creator}`
      }
      // 按门店删选
      if (this.serchRule.shop) {
        url += `&shop=${this.serchRule.shop}`
      }
      // 按时间删选
      if (this.serchRule.time.length == 2) {
        url += `&time_from=${this.serchRule.time[0]}`

        // 这里显示的是当天0：0：0 的时间，给他加到23：59：59
        var time = this.serchRule.time[1] + 23*59*59*1000;
        url += `&time_to=${time}`
      }
      this.$axios.get(url).then(res => {
        // 初始化商品的数组
        if (this.serchRule.shopgroup.length == 0) {
          var shopgroup = res.data.shopgroup;
          this.serchRule.shopgroup.push({
            label:"全部",
            value:undefined
          })
          // 替换成 {value,lable} 的格式 
          shopgroup.forEach(shop => {
            this.serchRule.shopgroup.push({
              label:shop,
              value:shop
            })
          })
        }
        this.tableData = res.data.group;
        // 添加附属信息
        this.tableData.forEach(element => {
          element.title = this.getTitle(element);
        });
        // 设置分页数据
        this.setPaginations(res.data);
      });
    },
    onDeleteData (row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/api/hotgoodsstore/${row._id}`).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getData();
          });
        }).catch(()=>{})
    },
    onShowDeatilDialog(row) {
      this.getDetailData(row);
    },
    setPaginations(data) {
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