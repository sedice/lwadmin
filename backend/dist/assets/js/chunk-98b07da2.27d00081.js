(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-98b07da2"],{"019f":function(t,e,a){},"35df":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fillcontain"},[a("TitlePanel",{attrs:{title:"当前位置:  添加数据 / 爆品管理"}}),a("el-form",[a("el-form-item",[t.hasOperAccess?a("el-button",{attrs:{type:"primary",size:"small",icon:"view"},on:{click:function(e){return t.onAddData()}}},[t._v("添加")]):t._e()],1)],1),a("DialogHotGoods",{attrs:{dialog:t.dialog,form:t.form},on:{update:t.getData}}),a("div",{staticStyle:{width:"1000px"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"max-height":"600",border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"70"}}),a("el-table-column",{attrs:{prop:"name",label:"商品名称",align:"center"}}),t.hasOperAccess?a("el-table-column",{attrs:{prop:"operation",align:"center",label:"操作",fixed:"right",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"danger",icon:"delete",size:"small"},on:{click:function(a){return t.onDeleteData(e.row,e.$index)}}},[t._v("删除")])]}}],null,!1,103723937)}):t._e()],1),a("PagePanel",{attrs:{paginations:t.paginations},on:{updateData:t.getData}})],1)],1)},i=[],o=(a("a450"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"logFund"},[a("el-dialog",{attrs:{title:t.dialog.title,visible:t.dialog.show,"close-on-click-modal":!1,"close-on-press-escape":!1,"modal-append-to-body":!1},on:{"update:visible":function(e){return t.$set(t.dialog,"show",e)}}},[a("div",{staticClass:"form"},[a("el-form",{ref:"form",staticStyle:{margin:"10px",width:"auto"},attrs:{model:t.form,rules:t.form_rules,"label-width":"120px"}},[a("el-form-item",{attrs:{prop:"name",label:"商品名称:"}},[a("el-select",{staticStyle:{width:"500px"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}},t._l(t.form.shopgroup,(function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})})),1)],1),a("el-form-item",{staticClass:"text_right"},[a("el-button",{on:{click:function(e){t.dialog.show=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form")}}},[t._v("提 交")])],1)],1)],1)])],1)}),s=[],r={name:"logfound",props:{dialog:Object,form:Object},data:function(){return{form_rules:{name:[{required:!0,message:"商品名称不能为空",trigger:"blur"}]}}},methods:{onSubmit:function(t){var e=this;this.$refs[t].validate((function(t){if(t){var a=function(t){e.$message({message:"保存成功！",type:"success"}),e.dialog.show=!1,e.$emit("update")};"add"==e.dialog.option?e.$axios.post("/api/hotgoods",e.form).then(a):"edit"==e.dialog.option?e.$axios.put("/api/hotgoods/".concat(e.form.id),e.form).then(a):e.$message({message:"保存成功！",type:"success"})}}))}}},l=r,c=a("5d22"),u=Object(c["a"])(l,o,s,!1,null,null,null),p=u.exports,d=a("fb16"),g=a("f345"),f={data:function(){return{tableData:[],shopgroup:[],dialog:{show:!1,title:"",option:"edit"},form:{name:"",shopgroup:[]},paginations:{page_index:1,total:0,page_size:10},search_data:{startTime:"",endTime:""}}},computed:{user:function(){return this.$store.getters.user},hasOperAccess:function(){var t=this,e=["admin","manager"];return e.some((function(e){return e==t.user.identity}))}},components:{DialogHotGoods:p,TitlePanel:d["a"],PagePanel:g["a"]},created:function(){this.getData()},methods:{getData:function(){var t=this,e=this.paginations.page_index,a=this.paginations.page_size,n="/api/hotgoods?page=".concat(e,"&pagesize=").concat(a);this.$axios.get(n).then((function(e){0==t.shopgroup.length&&Array.isArray(e.data.shopgroup)&&(t.shopgroup=e.data.shopgroup),t.tableData=e.data.group,t.setPaginations(e.data)}))},onUpdateData:function(t){this.dialog={show:!0,title:"修改商品信息",option:"edit"},this.form={name:t.name,id:t._id,shopgroup:this.shopgroup}},onDeleteData:function(t,e){var a=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.$axios.delete("/api/hotgoods/".concat(t._id)).then((function(t){a.$message({type:"success",message:"删除成功"}),a.getData()}))})).catch((function(){}))},onAddData:function(){this.dialog={show:!0,title:"添加商品信息",option:"add"},this.form={name:"",shopgroup:this.shopgroup}},setPaginations:function(t){this.paginations.total=t.total_num,this.paginations.page_index=t.page,this.paginations.page_size=t.pagesize}}},h=f,m=(a("58bf"),Object(c["a"])(h,n,i,!1,null,"b7efe446",null));e["default"]=m.exports},"41a4":function(t,e,a){},"58bf":function(t,e,a){"use strict";a("019f")},a1d4:function(t,e,a){},a450:function(t,e,a){var n=a("bb8b").f,i=Function.prototype,o=/^\s*function ([^ (]*)/,s="name";s in i||a("26df")&&n(i,s,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},af66:function(t,e,a){"use strict";a("41a4")},d8b2:function(t,e,a){"use strict";a("a1d4")},f345:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"pagination"},[t.paginations.total>0?a("el-pagination",{attrs:{total:t.paginations.total,"page-size":t.paginations.page_size,"current-page":t.paginations.page_index,"page-sizes":t.page_sizes,layout:t.layout},on:{"update:currentPage":function(e){return t.$set(t.paginations,"page_index",e)},"update:current-page":function(e){return t.$set(t.paginations,"page_index",e)},"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}}):t._e()],1)])],1)},i=[],o={props:{paginations:Object},data:function(){return{page_sizes:[10,20,50],layout:"total, sizes, prev, pager, next, jumper"}},methods:{handleCurrentChange:function(t){this.paginations.page_index=t,this.$emit("updateData")},handleSizeChange:function(t){this.paginations.page_index=1,this.paginations.page_size=t,this.$emit("updateData")}}},s=o,r=(a("af66"),a("5d22")),l=Object(r["a"])(s,n,i,!1,null,"29eca91a",null);e["a"]=l.exports},fb16:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"titlePanel"},[a("i",{staticClass:"el-icon-location iconItem"}),a("span",{staticClass:"titleContent"},[t._v(t._s(t.title))])])},i=[],o={props:{title:String},data:function(){return{}},methods:{}},s=o,r=(a("d8b2"),a("5d22")),l=Object(r["a"])(s,n,i,!1,null,"42c28e27",null);e["a"]=l.exports}}]);
//# sourceMappingURL=chunk-98b07da2.27d00081.js.map