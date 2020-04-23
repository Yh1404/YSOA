<template>
  <el-form size="medium" :model="loginForm" :rules="rules" ref="loginForm">
    <el-form-item prop="username">
      <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input show-password placeholder="密码" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-radio-group v-model="role">
        <el-radio label="admin">管理员</el-radio>
        <el-radio label="user">用户</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="login()">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      role: "user",
      loginForm: {},
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
  created() {
    var lett = this;
    document.onkeydown = function() {
      //回车键登录
      var key = window.event.keyCode;
      if (key == 13) {
        lett.login();
      }
    };
  },
  beforeDestroy() {
    // let self = this;
    // //建立WebSocket连接
    // self.ws.send(
    //   JSON.stringify({
    //     id: sessionStorage.getItem("id"),
    //     type: "LOGIN"
    //   })
    // );
  },
  methods: {
    async login() {
      this.$refs["loginForm"].validate(async valid => {
        if (valid) {
          try {
            const res = await this.$axios.post("/web/login", this.loginForm);
            if (res.data.user) {
              this.$store.dispatch("SetTokenAsync", res.data.token);
              this.$store.dispatch("SetUserInfoAsync", res.data.user);
              this.$message({
                type: "success",
                message: "登录成功！"
              });
              this.$cookie.set("id", res.data.user._id);
              this.$router.push("/main");
            } else if (res.data.message === "该用户已登录") {
              this.$message.error("该用户已登录");
            } else if (res.data.message === "用户名不存在或密码错误") {
              this.$message.error("用户名不存在或密码错误");
            }
          } catch {
            this.$message.error("请重试！");
          }
        }
      });
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
