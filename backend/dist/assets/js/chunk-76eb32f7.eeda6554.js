(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76eb32f7"],{2699:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fillcontain"},[a("TitlePanel",{attrs:{title:t.topTitle}}),a("SerchPanel",{attrs:{serchRule:t.serchRule},on:{clickSerch:t.clickSerch}}),a("div",{staticClass:"table_container"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"max-height":"600",border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"70"}}),a("el-table-column",{attrs:{prop:"createtime",formatter:t.formatDate,width:"150",label:"日期",align:"center"}}),a("el-table-column",{attrs:{prop:"title",label:"标题",align:"center"}}),a("el-table-column",{attrs:{prop:"creator",label:"提交者",align:"center",width:"120"}}),a("el-table-column",{attrs:{prop:"shop",label:"门店",align:"center",width:"120"}}),a("el-table-column",{attrs:{prop:"operation",align:"center",label:"操作",fixed:"right",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.hasOperAccess?a("el-button",{attrs:{type:"danger",icon:"edit",size:"small"},on:{click:function(a){return t.onDeleteData(e.row)}}},[t._v("删除")]):t._e(),a("el-button",{attrs:{type:"warning",icon:"edit",size:"small"},on:{click:function(a){return t.onShowDeatilDialog(e.row)}}},[t._v("查看")])]}}])})],1),a("PagePanel",{attrs:{paginations:t.paginations},on:{updateData:t.getData}})],1),t.dialogDetailConf.visible?a("DialogPatchDetail",{attrs:{dialogConf:t.dialogDetailConf}}):t._e()],1)},i=[],l=(a("1bc7"),a("6899")),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.dialogConf.datagroup.length>0?a("el-dialog",{attrs:{title:t.dialogConf.title,visible:t.dialogConf.visible,width:"90%"},on:{"update:visible":function(e){return t.$set(t.dialogConf,"visible",e)}}},[a("el-table",{attrs:{data:t.dialogConf.datagroup,border:"","lock-scroll":"false"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"70"}}),a("el-table-column",{attrs:{property:"name",label:"商品名称",width:"200px",align:"center"}}),t._l(10,(function(e){return a("el-table-column",{key:e,attrs:{align:"center",property:t.getTitle(e),label:t.getTitle(e)}})}))],2)],1):t._e()},r=[],s={props:{dialogConf:Object},data:function(){return{}},methods:{getTitle:function(t){return"批次".concat(t)}}},c=s,u=a("5d22"),p=Object(u["a"])(c,o,r,!1,null,null,null),h=p.exports,g=a("fb16"),d=a("f345"),f={data:function(){return{tableData:[],detailDialogVisible:!1,datagroup:{},monthgroup:{},dialogDetailConf:{visible:!1,title:"",data:{}},serchRule:{creator:"",shop:"",shopgroup:[],time:[]},paginations:{page_index:1,total:0,page_size:10}}},computed:{isOut:function(){return"out"===this.$route.query.type},typeStr:function(){return this.isOut?"out":"in"},user:function(){return this.$store.getters.user},hasOperAccess:function(){return"admin"==this.user.identity||"manager"==this.user.identity},topTitle:function(){return this.isOut?"当前位置:  数据查询 / 出库批次查询":"当前位置:  数据查询 / 入库批次查询"}},components:{SerchPanel:l["a"],DialogPatchDetail:h,TitlePanel:g["a"],PagePanel:d["a"]},created:function(){this.getData()},watch:{$route:function(){this.getData()}},methods:{formatDate:function(t,e,a){var n=new Date(a),i=n.getFullYear(),l=n.getMonth()+1;l<10&&(l="0"+l);var o=n.getDate();return o<10&&(o="0"+o),i+"/"+l+"/"+o},clickSerch:function(){this.paginations.page_index=1,this.getData()},getDetailData:function(t){var e=this,a="/api/batch_record/".concat(t._id,"?type=").concat(this.typeStr);this.$axios.get(a).then((function(a){e.dialogDetailConf.datagroup=a.data.datagroup,e.dialogDetailConf.datagroup.forEach((function(t){t.nums.forEach((function(e,a){t["批次"+(a+1)]=e}))})),e.dialogDetailConf.visible=!0,e.dialogDetailConf.title=e.getTitle(t)}))},getTitle:function(t){var e=t.shop,a=t.creator,n=t.createtime,i=t.createindex,l=new Date(n),o=l.getFullYear(),r=l.getMonth()+1;r<10&&(r="0"+r);var s=l.getDate();return s<10&&(s="0"+s),e+"_"+a+"_"+(this.isOut?"出库":"入库")+"批次统计单_"+o+r+s+"_"+i},getData:function(){var t=this,e=this.paginations.page_index,a=this.paginations.page_size,n="/api/batch_record?page=".concat(e,"&pagesize=").concat(a,"&type=").concat(this.typeStr);if(this.serchRule.creator&&(n+="&creator=".concat(this.serchRule.creator)),this.serchRule.shop&&(n+="&shop=".concat(this.serchRule.shop)),2==this.serchRule.time.length){n+="&time_from=".concat(this.serchRule.time[0]);var i=this.serchRule.time[1]+80063e3;n+="&time_to=".concat(i)}this.$axios.get(n).then((function(e){if(0==t.serchRule.shopgroup.length){var a=e.data.shopgroup;t.serchRule.shopgroup.push({label:"全部",value:void 0}),a.forEach((function(e){t.serchRule.shopgroup.push({label:e,value:e})}))}t.tableData=e.data.group,t.tableData.forEach((function(e){e.title=t.getTitle(e)})),t.setPaginations(e.data)}))},onDeleteData:function(t){var e=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$axios.delete("/api/batch_record/".concat(t._id,"?type=").concat(e.typeStr)).then((function(){e.$message({type:"success",message:"删除成功"}),e.getData()}))})).catch((function(){}))},onShowDeatilDialog:function(t){this.getDetailData(t)},setPaginations:function(t){this.paginations.total=t.total_num,this.paginations.page_index=t.page,this.paginations.page_size=t.pagesize}}},m=f,b=(a("6032"),Object(u["a"])(m,n,i,!1,null,"5383c62b",null));e["default"]=b.exports},"41a4":function(t,e,a){},"5c2f":function(t,e,a){},6032:function(t,e,a){"use strict";a("5c2f")},6899:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"创建者"}},[a("el-input",{attrs:{placeholder:"创建者"},model:{value:t.serchRule.creator,callback:function(e){t.$set(t.serchRule,"creator",e)},expression:"serchRule.creator"}})],1),a("el-form-item",{attrs:{label:"门店"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.serchRule.shop,callback:function(e){t.$set(t.serchRule,"shop",e)},expression:"serchRule.shop"}},t._l(t.serchRule.shopgroup,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("el-form-item",[a("el-date-picker",{attrs:{type:"daterange",align:"right","value-format":"timestamp","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.serchRule.time,callback:function(e){t.$set(t.serchRule,"time",e)},expression:"serchRule.time"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.clear}},[t._v("清除")]),a("el-button",{attrs:{type:"primary"},on:{click:t.clickSerch}},[t._v("查询")])],1)],1)],1)},i=[],l={props:{serchRule:Object},methods:{clickSerch:function(){this.$emit("clickSerch")},clear:function(){this.serchRule.name="",this.serchRule.shop="",this.serchRule.time=[]}}},o=l,r=a("5d22"),s=Object(r["a"])(o,n,i,!1,null,null,null);e["a"]=s.exports},a1d4:function(t,e,a){},af66:function(t,e,a){"use strict";a("41a4")},d8b2:function(t,e,a){"use strict";a("a1d4")},f345:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"pagination"},[t.paginations.total>0?a("el-pagination",{attrs:{total:t.paginations.total,"page-size":t.paginations.page_size,"current-page":t.paginations.page_index,"page-sizes":t.page_sizes,layout:t.layout},on:{"update:currentPage":function(e){return t.$set(t.paginations,"page_index",e)},"update:current-page":function(e){return t.$set(t.paginations,"page_index",e)},"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}}):t._e()],1)])],1)},i=[],l={props:{paginations:Object},data:function(){return{page_sizes:[10,20,50],layout:"total, sizes, prev, pager, next, jumper"}},methods:{handleCurrentChange:function(t){this.paginations.page_index=t,this.$emit("updateData")},handleSizeChange:function(t){this.paginations.page_index=1,this.paginations.page_size=t,this.$emit("updateData")}}},o=l,r=(a("af66"),a("5d22")),s=Object(r["a"])(o,n,i,!1,null,"29eca91a",null);e["a"]=s.exports},fb16:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"titlePanel"},[a("i",{staticClass:"el-icon-location iconItem"}),a("span",{staticClass:"titleContent"},[t._v(t._s(t.title))])])},i=[],l={props:{title:String},data:function(){return{}},methods:{}},o=l,r=(a("d8b2"),a("5d22")),s=Object(r["a"])(o,n,i,!1,null,"42c28e27",null);e["a"]=s.exports}}]);
//# sourceMappingURL=chunk-76eb32f7.eeda6554.js.map