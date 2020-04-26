<template>
  <el-container>
    <header>
      公文逐级审批系统
    </header>
    <div class="form_box">
      <login />
    </div>
  </el-container>
</template>
<script>
import LoginForm from "../components/LoginForm";
export default {
  data() {
    return {
      flag: "login"
    };
  },
  components: {
    login: LoginForm
  }
};
</script>
<style lang="css" scoped>
.el-container {
  height: 100%;
  background-color: #fff;
}

.form_box {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
header {
  position: absolute;
  font-size: 50px;
  font-weight: 500;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: 10px;
  line-height: 90px;
  white-space: nowrap;
}
</style>
