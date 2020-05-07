<template>
  <div class="panel">
    <el-header>
      <span>修改资料|{{ this.$store.getters.name }}</span>
    </el-header>
    <el-form size="medium" :model="user" ref="user">
      <el-form-item prop="name">
        <el-col :span="10">
          <el-input prefix-icon="el-icon-user" v-model="user.name"></el-input>
        </el-col>
        <el-col :span="5" :offset="2">
          <el-select v-model="user.gender" placeholder="性别">
            <el-option v-for="item in gender" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user" v-model="user.username"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input show-password prefix-icon="el-icon-lock" v-model="user.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-col :span="12">
          <el-select v-model="user.department">
            <el-option v-for="item in department" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">----</el-col>
        <el-col :span="10">
          <el-select v-model="user.identity">
            <el-option v-for="item in identity" :key="item._id" :label="item.name" :value="item._id"> </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item prop="birth">
        <el-date-picker type="date" value-format="yyyy/M/d" v-model="user.birth" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item prop="telephone">
        <el-input prefix-icon="el-icon-phone-outline" v-model.number="user.telephone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="UpdateUser">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      department: [],
      identity: [],
      gender: ["男", "女"]
    };
  },
  created() {
    this.fetchUser();
    this.getDepartment();
    this.getIdentity();
  },
  methods: {
    async fetchUser() {
      const res = await this.$axios.get(`/web/user/ ?userID=${this.$store.getters.id}`, {
        headers: { accessToken: sessionStorage.getItem("token") }
      });
      this.user = res.data;
    },
    async getDepartment() {
      const res = await this.$axios.get("/web/department", {
        headers: { accessToken: sessionStorage.getItem("token") }
      });
      this.department = res.data;
    },
    async getIdentity() {
      const res = await this.$axios.get("/web/identity", {
        headers: { accessToken: sessionStorage.getItem("token") }
      });
      this.identity = res.data;
    },
    async UpdateUser() {
      await this.$axios.put(`/web/user/${this.$store.getters.id}`, this.user);
      this.$message({
        type: "success",
        message: "更新成功"
      });
    }
  }
};
</script>

<style scoped>
.panel {
  width: 95%;
  margin: 0 auto;
  height: 90%;
  background-color: #fff;
  border-radius: 5px;
  text-align: left;
  padding: 20px 20px;
}
</style>