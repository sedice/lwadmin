(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14cdb428"],{"0353":function(t,e,n){"use strict";var a=n("6bf8"),i=RegExp.prototype.exec,r=String.prototype.replace,o=i,s="lastIndex",c=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t[s]||0!==e[s]}(),l=void 0!==/()??/.exec("")[1],u=c||l;u&&(o=function(t){var e,n,o,u,p=this;return l&&(n=new RegExp("^"+p.source+"$(?!\\s)",a.call(p))),c&&(e=p[s]),o=i.call(p,t),c&&o&&(p[s]=p.global?o.index+o[0].length:e),l&&o&&o.length>1&&r.call(o[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0)})),o}),t.exports=o},1663:function(t,e,n){var a=n("212e"),i=n("3ab0");t.exports=function(t){return function(e,n){var r,o,s=String(i(e)),c=a(n),l=s.length;return c<0||c>=l?t?"":void 0:(r=s.charCodeAt(c),r<55296||r>56319||c+1===l||(o=s.charCodeAt(c+1))<56320||o>57343?t?s.charAt(c):r:t?s.slice(c,c+2):o-56320+(r-55296<<10)+65536)}}},"41a4":function(t,e,n){},"43ec":function(t,e,n){"use strict";var a=n("1663")(!0);t.exports=function(t,e,n){return e+(n?a(t,e).length:1)}},"4a8a":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fillcontain"},[n("TitlePanel",{attrs:{title:"当前位置:  添加数据 / 后台用户管理"}}),n("el-form",[n("el-form-item",[t.hasOperAccess?n("el-button",{attrs:{type:"primary",size:"small",icon:"view"},on:{click:function(e){return t.onAddData()}}},[t._v("添加")]):t._e()],1)],1),n("DialogBackUser",{attrs:{dialog:t.dialog,form:t.form},on:{update:t.getData}}),n("div",{staticClass:"table_container",staticStyle:{width:"1200px"}},[n("el-table",{attrs:{data:t.tableData,"max-height":"600",border:""}},[n("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"70"}}),n("el-table-column",{attrs:{prop:"name",label:"账号",align:"center"}}),n("el-table-column",{attrs:{prop:"password",label:"密码",align:"center"}}),n("el-table-column",{attrs:{prop:"identity",formatter:t.identityFormatter,label:"权限",align:"center"}}),t.hasOperAccess?n("el-table-column",{attrs:{prop:"operation",align:"center",label:"操作",fixed:"right",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"warning",icon:"edit",size:"small"},on:{click:function(n){return t.onUpdateData(e.row)}}},[t._v("修改")]),n("el-button",{attrs:{type:"danger",icon:"delete",size:"small"},on:{click:function(n){return t.onDeleteData(e.row,e.$index)}}},[t._v("删除")])]}}],null,!1,1735663465)}):t._e()],1),n("PagePanel",{attrs:{paginations:t.paginations},on:{updateData:t.getData}})],1)],1)},i=[],r=(n("a450"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"logFund"},[n("el-dialog",{attrs:{title:t.dialog.title,visible:t.dialog.show,"close-on-click-modal":!1,"close-on-press-escape":!1,"modal-append-to-body":!1},on:{"update:visible":function(e){return t.$set(t.dialog,"show",e)}}},[n("div",{staticClass:"form"},[n("el-form",{ref:"form",staticStyle:{margin:"10px",width:"auto"},attrs:{model:t.form,rules:t.form_rules,"label-width":"120px"}},[n("el-form-item",{attrs:{prop:"name",label:"账号:"}},[n("el-input",{attrs:{type:"name"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),n("el-form-item",{attrs:{prop:"password",label:"密码:"}},[n("el-input",{attrs:{type:"name"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t.canUpdateIdentity?n("el-form-item",{attrs:{prop:"identity",label:"权限:"}},[n("el-select",{model:{value:t.form.identity,callback:function(e){t.$set(t.form,"identity",e)},expression:"form.identity"}},t._l(t.identityGroup,(function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1):t._e(),n("el-form-item",{staticClass:"text_right"},[n("el-button",{on:{click:function(e){t.dialog.show=!1}}},[t._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form")}}},[t._v("提 交")])],1)],1)],1)])],1)}),o=[],s=(n("d0f2"),{name:"logfound",props:{dialog:Object,form:Object},computed:{user:function(){return this.$store.state.user},canUpdateIdentity:function(){return"admin"==this.user.identity}},data:function(){var t=function(t,e,n){e.match(/[0-9a-zA-Z]{8,16}/)?n():n(new Error("密码应该是8到16位的数字字母组合"))};return{form_rules:{name:[{required:!0,message:"该选项不能为空",trigger:"blur"}],password:[{validator:t,trigger:"blur"}]},identityGroup:[{label:"普通",value:"normal"},{label:"管理员",value:"manager"}]}},methods:{onSubmit:function(t){var e=this;this.$refs[t].validate((function(t){if(t){var n=function(t){e.$message({message:"保存成功！",type:"success"}),e.dialog.show=!1,e.$emit("update")};"add"==e.dialog.option?e.$axios.post("/api/backuser",e.form).then(n):"edit"==e.dialog.option?e.$axios.put("/api/backuser/".concat(e.form.id),e.form).then(n):e.$message({message:"保存成功！",type:"success"})}}))}}}),c=s,l=n("5d22"),u=Object(l["a"])(c,r,o,!1,null,null,null),p=u.exports,d=n("fb16"),f=n("f345"),g={data:function(){return{tableData:[],shopGroup:[],dialog:{show:!1,title:"",option:"edit"},form:{name:"",password:"",identity:"normal"},paginations:{page_index:1,total:0,page_size:10}}},computed:{user:function(){return this.$store.getters.user},hasOperAccess:function(){var t=this,e=["admin","manager"];return e.some((function(e){return e==t.user.identity}))}},components:{DialogBackUser:p,TitlePanel:d["a"],PagePanel:f["a"]},created:function(){this.getData()},methods:{getData:function(){var t=this,e=this.paginations.page_index,n=this.paginations.page_size,a="/api/backuser?page=".concat(e,"&pagesize=").concat(n);this.$axios.get(a).then((function(e){t.tableData=e.data.group,t.setPaginations(e.data)}))},onUpdateData:function(t){this.checkHasDelAndUpAccess(t)&&(this.dialog={show:!0,title:"修改用户信息",option:"edit"},this.form={name:t.name,id:t._id,password:t.password,identity:t.identity})},checkHasDelAndUpAccess:function(t){var e=this.user.identity;return"admin"!=e&&"manager"!=e?(this.$message({type:"success",message:"你没有此权限"}),!1):"manager"!=e||"manager"!=t.identity||this.user.name==t.name||(this.$message({type:"error",message:"您没有操作该管理员的权限"}),!1)},onDeleteData:function(t,e){var n=this;if(this.checkHasDelAndUpAccess(t)){var a=this.user.identity;"manager"!=a||"manager"!=t.identity||this.user.name!=t.name?this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){n.$axios.delete("/api/backuser/".concat(t._id)).then((function(t){n.$message({type:"success",message:"删除成功"}),n.getData()}))})).catch((function(){})):this.$message({type:"error",message:"不能删除自己"})}},onAddData:function(){this.dialog={show:!0,title:"添加用户信息",option:"add"},this.form={name:"",password:"",identity:"normal"}},setPaginations:function(t){this.paginations.total=t.total_num,this.paginations.page_index=t.page,this.paginations.page_size=t.pagesize},identityFormatter:function(t,e,n,a){return"normal"==n?"普通":"manager"==n?"管理员":"admin"==n?"admin":"未知"}}},m=g,h=(n("e363"),Object(l["a"])(m,a,i,!1,null,"2cd999f4",null));e["default"]=h.exports},"6bf8":function(t,e,n){"use strict";var a=n("a86f");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},a1d4:function(t,e,n){},a450:function(t,e,n){var a=n("bb8b").f,i=Function.prototype,r=/^\s*function ([^ (]*)/,o="name";o in i||n("26df")&&a(i,o,{configurable:!0,get:function(){try{return(""+this).match(r)[1]}catch(t){return""}}})},af66:function(t,e,n){"use strict";n("41a4")},bf73:function(t,e,n){"use strict";var a=n("0353");n("e99b")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},c46f:function(t,e,n){"use strict";n("bf73");var a=n("84e8"),i=n("065d"),r=n("0926"),o=n("3ab0"),s=n("839a"),c=n("0353"),l=s("species"),u=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),p=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var d=s(t),f=!r((function(){var e={};return e[d]=function(){return 7},7!=""[t](e)})),g=f?!r((function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[l]=function(){return n}),n[d](""),!e})):void 0;if(!f||!g||"replace"===t&&!u||"split"===t&&!p){var m=/./[d],h=n(o,d,""[t],(function(t,e,n,a,i){return e.exec===c?f&&!i?{done:!0,value:m.call(e,n,a)}:{done:!0,value:t.call(n,e,a)}:{done:!1}})),v=h[0],b=h[1];a(String.prototype,t,v),i(RegExp.prototype,d,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},d0f2:function(t,e,n){"use strict";var a=n("a86f"),i=n("201c"),r=n("43ec"),o=n("f417");n("c46f")("match",1,(function(t,e,n,s){return[function(n){var a=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a):new RegExp(n)[e](String(a))},function(t){var e=s(n,t,this);if(e.done)return e.value;var c=a(t),l=String(this);if(!c.global)return o(c,l);var u=c.unicode;c.lastIndex=0;var p,d=[],f=0;while(null!==(p=o(c,l))){var g=String(p[0]);d[f]=g,""===g&&(c.lastIndex=r(l,i(c.lastIndex),u)),f++}return 0===f?null:d}]}))},d868:function(t,e,n){},d8b2:function(t,e,n){"use strict";n("a1d4")},e363:function(t,e,n){"use strict";n("d868")},f345:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",[n("el-col",{attrs:{span:24}},[n("div",{staticClass:"pagination"},[t.paginations.total>0?n("el-pagination",{attrs:{total:t.paginations.total,"page-size":t.paginations.page_size,"current-page":t.paginations.page_index,"page-sizes":t.page_sizes,layout:t.layout},on:{"update:currentPage":function(e){return t.$set(t.paginations,"page_index",e)},"update:current-page":function(e){return t.$set(t.paginations,"page_index",e)},"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}}):t._e()],1)])],1)},i=[],r={props:{paginations:Object},data:function(){return{page_sizes:[10,20,50],layout:"total, sizes, prev, pager, next, jumper"}},methods:{handleCurrentChange:function(t){this.paginations.page_index=t,this.$emit("updateData")},handleSizeChange:function(t){this.paginations.page_index=1,this.paginations.page_size=t,this.$emit("updateData")}}},o=r,s=(n("af66"),n("5d22")),c=Object(s["a"])(o,a,i,!1,null,"29eca91a",null);e["a"]=c.exports},f417:function(t,e,n){"use strict";var a=n("d445"),i=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var r=n.call(t,e);if("object"!==typeof r)throw new TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==a(t))throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},fb16:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"titlePanel"},[n("i",{staticClass:"el-icon-location iconItem"}),n("span",{staticClass:"titleContent"},[t._v(t._s(t.title))])])},i=[],r={props:{title:String},data:function(){return{}},methods:{}},o=r,s=(n("d8b2"),n("5d22")),c=Object(s["a"])(o,a,i,!1,null,"42c28e27",null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-14cdb428.a608f6bc.js.map