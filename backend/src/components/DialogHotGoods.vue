<template>
  <div class="logFund">
    <el-dialog
      :title = "dialog.title"
      :visible.sync = "dialog.show"
      :close-on-click-modal = "false"
      :close-on-press-escape = "false"
      :modal-append-to-body = "false"
    >
      <div class="form">
        <el-form
            ref="form"
            :model = "form"
            :rules = "form_rules"
            label-width = "120px"
            style = "margin:10px;width:auto;"
            >

            <el-form-item prop = "name" label = "商品名称:">
                <el-select v-model = "form.name" style="width:500px;">
                  <el-option
                    v-for = "item in form.shopgroup"
                    :key = "item"
                    :label = "item"
                    :value = "item">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class = "text_right">
                <el-button @click = "dialog.show = false">取 消</el-button>
                <el-button type = "primary" @click="onSubmit('form')">提 交</el-button>
            </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "logfound",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      form_rules: {
        name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) { 
          var cb = (res) =>{
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.dialog.show = false;
            this.$emit("update");
          }
          if (this.dialog.option == "add") {
            this.$axios.post(`/api/hotgoods`, this.form).then(cb)
          } else if (this.dialog.option == "edit") {
            this.$axios.put(`/api/hotgoods/${this.form.id}`, this.form).then(cb)
          } else {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
          }
        };
      });
    }
  }
};
</script>

