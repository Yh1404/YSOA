<template>
  <el-container>
    <header>
      公文逐级审批系统
    </header>
    <el-switch
      v-model="flag"
      active-text="登录"
      inactive-text="注册"
      active-value="login"
      inactive-value="regis"
      active-color="#00a8ff"
      inactive-color="#00a8ff"
    >
    </el-switch>
    <div class="form_box">
      <transition name="el-zoom-in-center" mode="out-in">
        <keep-alive>
          <component :is="flag"></component>
        </keep-alive>
      </transition>
    </div>
  </el-container>
</template>
<script>
import LoginForm from "../components/login_form";
import RegisForm from "../components/regis_form";
export default {
  data() {
    return {
      flag: "login"
    };
  },
  components: {
    login: LoginForm,
    regis: RegisForm
  }
};
</script>
<style lang="css" scoped>
.el-container {
  height: 100%;
  background-color: #fff;
}
.el-switch {
  position: absolute;
  margin: 20px 0 0 10px;
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
