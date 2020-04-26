<template>
  <div class="panel">
    <el-form label-position="left">
      <el-form-item label="流程名称" label-width="100px">
        <el-input type="text" style="width:250px" v-model="flow.name"></el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="选择流程节点">
        <el-select v-model="flow.to_users" multiple placeholder="请选择">
          <el-option v-for="item in users" :key="item._id" :label="item.value" :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流程描述" label-width="100px">
        <el-input type="textarea" style="width:250px" v-model="flow.description"></el-input>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flow: {},
      users: []
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async submit() {
      await this.$axios.post("/admin/flow", this.flow);
      this.$message("添加成功");
    },
    async fetchUser() {
      const res = await this.$axios.get("/admin/user");
      res.data.forEach(item => {
        console.log(item.department.name);
        item.value = `${item.department.name}/${item.identity.name}/${item.name}`;
      });
      this.users = res.data;
    }
  }
};
</script>

<style lang="css" scoped>
.panel {
  width: 99%;
  margin: 0 auto;
  height: 96%;
  background-color: #fff;
  border-radius: 5px;
  text-align: left;
}
.el-form {
  padding: 20px 20px;
}
</style>