<template>
  <el-container>
    <el-container>
      <el-header>
        <div class="user">
          <span class="el-icon-user-solid"></span>
          <b>&nbsp;&nbsp;&nbsp;{{ `${user.username}` }}</b>
          <b>{{ `(${user.department},${user.identity})` }}</b>
        </div>
        <span class="el-icon-refresh-right refresh" title="刷新"></span>
        <span class="el-icon-switch-button switch" title="退出登录" @click="logout()"></span>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: window.sessionStorage.getItem("name"),
        department: window.sessionStorage.getItem("department"),
        identity: window.sessionStorage.getItem("identity"),
        id: window.sessionStorage.getItem("id")
      }
    };
  },
  methods: {
    async logout() {
      console.log(this.id);
      await this.$axios.put(`/web/logout/${this.user.id}`);
      await this.$store.dispatch("ClearLoginInfoAllAsync");

      this.$message({
        type: "success",
        message: "退出成功"
      });
      this.$router.push("/login");
    }
  }
};
</script>
>
<style lang="css" scoped>
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #fff;
  line-height: 60px;
}
.user {
  display: inline-block;
  width: 300px;
  height: 100%;
  font-size: 28px;
  color: #0984e3;
}
b {
  font-weight: 200;
  color: #000;
}
.switch,
.refresh {
  position: absolute;
  color: #0984e3;
  font-size: 28px;
  cursor: pointer;
  margin-top: 15px;
}
.switch:hover,
.refresh:hover {
  color: #74b9ff;
}
.refresh {
  left: 90%;
}
.switch {
  left: 95%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
