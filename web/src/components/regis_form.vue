<template>
  <el-form size="medium" :model="regisForm" :rules="rules">
    <div class="title">
      注册
    </div>
    <el-form-item prop="username">
      <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="regisForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input placeholder="姓名" prefix-icon="el-icon-user" v-model="regisForm.name"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input show-password placeholder="密码" prefix-icon="el-icon-lock" v-model="regisForm.password"></el-input>
    </el-form-item>
    <el-form-item prop="requirepass">
      <el-input show-password placeholder="再次输入密码" prefix-icon="el-icon-plus" v-model="regisForm.requirepass"></el-input>
    </el-form-item>
    <el-form-item prop="tel">
      <el-input placeholder="电话" prefix-icon="el-icon-phone-outline" v-model.number="regisForm.tel"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regisForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      regisForm: {
        username: "",
        password: "",
        requirepass: "",
        tel: "",
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        requirepass: [{ validator: validatePass, trigger: "blur" }],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 6, max: 14, message: "请核实手机号是否输入正确", trigger: "blur" },
          { type: "number", message: "必须为数字" }
        ]
      }
    };
  },
  methods: {
    regis() {}
  }
};
</script>
<style lang="css" scoped>
.title {
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  line-height: 60px;
}
.el-form {
  position: relative;
  width: 400px;
  height: 500px;
  margin: 0 auto;
  top: 50%;
  margin-top: -250px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px #ccc solid;
  padding-top: 20px;
}
.el-form-item {
  width: 68%;
  margin: 20px auto;
}
.el-button {
  margin-top: 20px;
  width: 100%;
}
span {
  float: right;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
}
</style>