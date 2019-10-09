<template>
    <div class = "container">
        <h1 class = 'title'>登录系统</h1>
        <group class="formItem">
          <x-input title="账号" :is-type = 'validName' v-model="form.name"></x-input>
          <x-input title="密码" type = 'password' :is-type = 'validPass' v-model="form.password"></x-input>
        </group>
        <x-button type="primary" :disabled = !isAllValid style="width:95%;"
          @click.native="login">登录</x-button>
    </div>
</template>

<script>
import { XButton,XInput,Group} from "vux";
import jwt_decode from "jwt-decode";

export default {
  components:{XButton,XInput,Group},
  data () {
    return {
      form:{
        name:"",
        password:""
      }
    }
  },
  methods:{
    validName (val) {
      if (val) {
        val = val.trim()
      }
      return {
        valid:val?true:false,
        msg:'账号不能为空'
      }
    },
    validPass (val) {
      const reg = /^[A-Za-z0-9]{8,12}$/;
      return {
        valid:reg.test(val)?true:false,
        msg:'密码为8到12位字母和数字的组合'
      }
    },
    login () {
      this.form.name = this.form.name.trim()
      this.$http.post('/api/frontuser/login',this.form)
        .then((res)=>{
          const token = res.data;
          localStorage.setItem("eleToken", token);
          // 解析token
          const decode = jwt_decode(token);
          // 存储数据
          this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
          this.$store.dispatch("setUser", decode);
          // 页面跳转
          this.$router.push("/index");
        })
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  computed:{
    isAllValid () {
      return this.validName(this.form.name).valid && this.validPass(this.form.password).valid ? true:false;
    }
  }
}
</script>

<style lang="css" scoped>

  .title {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .submitBtn {
    margin-top: 50px;
  }

  .formItem {
    margin-bottom:50px;
  }
</style>
  
