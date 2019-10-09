<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" >
      <el-form-item label="创建者">
        <el-input v-model="serchRule.creator" placeholder="创建者"></el-input>
      </el-form-item>
      <el-form-item label="门店">
        <el-select v-model="serchRule.shop" placeholder="请选择">
          <el-option
            v-for="item in serchRule.shopgroup"
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
        <el-button type="primary" @click="clear">清除</el-button>
        <el-button type="primary" @click="clickSerch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  props:{
      serchRule:Object
  },
  methods: {
    clickSerch () {
      this.$emit('clickSerch');
    },
    clear () {
        this.serchRule.name = "";
        this.serchRule.shop = "";
        this.serchRule.time = [];
    }
  }
};
</script>
