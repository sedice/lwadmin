<template>
    <el-row class="menu_page">
         <el-col>
             <el-menu
                mode="vertical"
                background-color="#324057"
                text-color="#fff"
                active-text-color="#409eff" 
                class="el-menu-vertical-demo">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <template  v-for="item in items" >
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" 
                            :to="citem.path" :key="cindex">
                            <el-menu-item 
                                v-if = "checkHasPermission(citem.identity)"
                                :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item> 
                        </router-link>
                    </el-submenu>
                    
                </template>
             </el-menu>
         </el-col>
    </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods :{
    checkHasPermission (identity) {
      var userIdentity = this.user.identity;
      if (userIdentity == 'admin' || !identity) {
        return true;
      }
      if (userIdentity != identity) {
        return false;
      } else {
        return true;
      }
    },
  },
  data() {
    return {
      items: [
        {
          icon: "fa-asterisk",
          name: "数据查询",
          path: "serch",
          children: [
            { path: "store", name: "库存查询" },
            { path: "lackstore", name: "缺货查询" },
            { path: "replenish", name: "补货单查询" },
          ]
        },
        {
          icon: "fa-asterisk",
          name: "添加数据",
          path: "manage",
          children: [
            { path: "shop", name: "门店管理"},
            { path: "goods", name: "商品管理"},
            { path: "frontuser", name: "前台用户管理",identity:"admin"},
            { path: "backuser", name: "后台用户管理",identity:"admin"}
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
