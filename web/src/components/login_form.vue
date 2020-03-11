<template>
  <el-form size="medium" :model="loginForm" :rules="rules">
    <div class="title">
      登录
    </div>
    <el-form-item prop="username">
      <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input show-password placeholder="密码" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {}
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
  height: 400px;
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
  margin: 40px auto;
}
.el-button {
  width: 100%;
}
span {
  float: right;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
}
</style>