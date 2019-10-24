<template>
  <div>
    <h2 class = "cTitle">文件导出</h2>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="serchRule.type" placeholder="请选择">
          <el-option
            v-for="item in serchRule.typeGroup"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="serchRule.time"
          type="daterange"
          align="right"
          value-format="timestamp"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="downLoad">下载</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    var typeGroup = [
      {label:"库存统计",value:"store"},
      {label:"缺货统计",value:"lackstore"},
      {label:"爆品统计",value:"baopin"}
    ];
    var time_0 = new Date(new Date(new Date().toLocaleDateString()).getTime()).valueOf();
    return {
      serchRule:{
        typeGroup,
        type:typeGroup[0].value,
        time:[time_0,time_0],
      }
    }
  },
  methods: {
    getFilePreFix (type) {
      var ret = "";
      this.serchRule.typeGroup.forEach(val => {
        if (type == val.value) {
          ret = val.label;
        }
      });
      return ret;
    },
    getTime(timeStamp) {
      var time = new Date(timeStamp);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      if (month < 10) month = '0' + month;
      var day = time.getDate();
      if (day < 10) day = '0' + day;
      return "" + year + month + day;
    },
    downLoad () {
      var type = this.serchRule.type;
      var time_from = this.serchRule.time[0];
      var time_to = this.serchRule.time[1] + 23*59*59*1000;
      var url = `/api/download/${type}?time_from=${time_from}&time_to=${time_to}`

      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url

      var filePreFix = this.getFilePreFix(type);
      time_from = this.getTime(time_from);
      time_to = this.getTime(time_to);
      link.setAttribute('download', `${filePreFix}_${time_from}至${time_to}.xlsx`);
      document.body.appendChild(link)
      link.click()
    },
  }
};
</script>

<style lang="css" scoped>
  .cTitle {
    font-size: 60px;
    height: 100px;
    line-height:100px;
    margin-bottom: 40px;
  }
</style>
