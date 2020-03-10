<template>
  <el-container>
    <el-header>
      登录
    </el-header>
    <el-form size="medium" :model="loginForm">
      <el-form-item>
        <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input show-password placeholder="密码" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button></el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    };
  }
};
</script>
<style lang="css" scoped>
.el-form {
  width: 200px;
  height: 300px;
  margin: 200px auto;
}
</style>