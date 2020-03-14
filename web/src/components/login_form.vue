<template>
  <el-form size="medium" :model="loginForm" :rules="rules">
    <el-form-item prop="username">
      <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input show-password placeholder="密码" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-radio-group v-model="identity">
        <el-radio label="admin">管理员</el-radio>
        <el-radio label="user">用户</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login()">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      identity: "user",
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
  methods: {
    async login() {
      if (this.loginForm.username && this.loginForm.password) {
        let res = await this.$axios.post("/login", this.loginForm);
        if (res.data.status == 200) {
          this.$router.push("/main");
        }
      }
    }
  }
};
</script>
<style lang="css" scoped>
.el-form {
  position: relative;
  width: 370px;
  height: 400px;
  margin: 0 auto;
  top: 50%;
  margin-top: -200px;
  background-color: #fff;
  border-radius: 10px;
  /* border: 1px #ccc solid; */
  padding-top: 20px;
}
.el-form-item {
  width: 68%;

  margin: 40px auto;
}
.el-radio-group {
  margin-left: 45px;
}
.el-button {
  width: 100%;
}
</style>
