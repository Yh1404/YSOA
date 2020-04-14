<template>
  <el-form size="medium" :model="regisForm" :rules="rules" ref="regisForm">
    <el-form-item prop="name">
      <el-col :span="10">
        <el-input placeholder="姓名" prefix-icon="el-icon-user" v-model="regisForm.name"></el-input>
      </el-col>
      <el-col :span="5" :offset="2">
        <el-select v-model="regisForm.gender" placeholder="性别">
          <el-option v-for="item in gender" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item prop="username">
      <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="regisForm.username"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input show-password placeholder="密码" prefix-icon="el-icon-lock" v-model="regisForm.password"></el-input>
    </el-form-item>
    <el-form-item prop="requirepass">
      <el-input show-password placeholder="再次输入密码" prefix-icon="el-icon-plus" v-model="regisForm.requirepass"></el-input>
    </el-form-item>
    <el-form-item prop="identity">
      <el-col :span="12">
        <el-select placeholder="所属部门" v-model="regisForm.department">
          <el-option v-for="item in department" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">----</el-col>
      <el-col :span="10">
        <el-select v-model="regisForm.identity" placeholder="请选择身份">
          <el-option v-for="item in identity" :key="item._id" :label="item.name" :value="item._id"> </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item prop="birth">
      <el-date-picker type="date" value-format="yyyy/M/d" placeholder="选择出生日期" v-model="regisForm.birth" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item prop="telephone">
      <el-input placeholder="电话" prefix-icon="el-icon-phone-outline" v-model.number="regisForm.telephone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="regis()">注册</el-button>
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
      identity: [], //身份选择器取值
      department: [], //部门级联选择器取值
      gender: ["男", "女"],
      regisForm: {},
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
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { type: "number", message: "必须为数字" }
        ],
        birth: [{ required: true, message: "请输入生日", trigger: "blur" }],
        identity: [{ required: true, message: "请输入部门", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }]
      }
    };
  },
  methods: {
    regis() {
      this.$refs["regisForm"].validate(async valid => {
        if (valid) {
          await this.$axios.post("/web/register", this.regisForm);
          this.$message({
            message: "注册成功，请重新登录"
          });
          this.$router.go(0);
        } else {
          this.$message("请正确填写表单");
        }
      });
    },
    async getDepartment() {
      const res = await this.$axios.get("/web/department");
      // this.identity = res.data[0];
      this.department = res.data;
    },
    async getIdentity() {
      const res = await this.$axios.get("/web/identity");
      // this.identity = res.data[0];
      this.identity = res.data;
    }
  },
  created() {
    this.getDepartment();
    this.getIdentity();
  }
};
</script>
<style lang="css" scoped>
.el-form {
  position: relative;
  width: 600px;
  height: 500px;
  margin: 0 auto;
  top: 50%;
  margin-top: -250px;
  background-color: #fff;
  border-radius: 10px;
  /* border: 1px #ccc solid; */
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
