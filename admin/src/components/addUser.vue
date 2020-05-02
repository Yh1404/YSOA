<template>
  <el-form size="medium" :model="regisForm" :rules="rules" ref="regisForm">
    <el-form-item prop="name" label="姓名">
      <el-col :span="1">
        <el-input placeholder="姓名" prefix-icon="el-icon-user" v-model="regisForm.name" style="width:100px"></el-input>
      </el-col>
      <el-col :span="3" :offset="2">
        <el-select v-model="regisForm.gender" placeholder="性别">
          <el-option v-for="item in gender" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item prop="username" label="用户名">
      <el-input style="width:180px" placeholder="用户名" prefix-icon="el-icon-user" v-model="regisForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input style="width:200px" show-password placeholder="密码" prefix-icon="el-icon-lock" v-model="regisForm.password"></el-input>
    </el-form-item>
    <el-form-item prop="identity" label="部门身份">
      <el-col :span="4">
        <el-select placeholder="所属部门" v-model="regisForm.department">
          <el-option v-for="item in department" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="1">------</el-col>
      <el-col :span="4">
        <el-select v-model="regisForm.identity" placeholder="请选择身份">
          <el-option v-for="item in identity" :key="item._id" :label="item.name" :value="item._id"> </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item prop="birth" label="生日" style="width:300px">
      <el-date-picker type="date" value-format="yyyy/M/d" placeholder="选择出生日期" v-model="regisForm.birth" style="width: 150px;"></el-date-picker>
    </el-form-item>
    <el-form-item prop="telephone" label="电话">
      <el-input style="width:200px" placeholder="电话" prefix-icon="el-icon-phone-outline" v-model.number="regisForm.telephone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="regis()">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
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
    async regis() {
      if (this.id) {
        await this.$axios.put(`/admin/user/${this.id}`, this.regisForm);
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.$emit("switchCom", { component: "UserManage" });
      } else {
        this.$refs["regisForm"].validate(async valid => {
          if (valid) {
            await this.$axios.post("/web/register", this.regisForm);
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message("请正确填写表单");
          }
        });
      }
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
    },
    async fetchUser() {
      const res = await this.$axios.get(`/admin/user/${this.id}`);
      this.regisForm = res.data;
    }
  },
  created() {
    this.getDepartment();
    this.getIdentity();
    this.id && this.fetchUser();
  }
};
</script>
<style lang="css" scoped>
.el-form {
  width: 99%;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 10px;
}
.el-form-item {
  margin: 25px;
}
.el-button {
  margin-top: 20px;
  width: 400px;
}
span {
  float: right;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
}
</style>
