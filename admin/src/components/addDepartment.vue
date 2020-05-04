<template>
  <div class="panel">
    <el-form label-position="left">
      <el-form-item label="父级部门" label-width="100px">
        <el-select style="width:250px" v-model="department.parent">
          <el-option v-for="item in selectData" :key="item._id" :label="item.name" :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="100px" label="部门名称">
        <el-input type="text" style="width:250px" v-model="department.name"></el-input>
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
      department: {},
      selectData: []
    };
  },
  created() {
    this.fetchDepartment();
  },
  methods: {
    async submit() {
      //执行添加操作
      await this.$axios.post("/admin/department", this.department);
      this.$message("添加成功");
      this.$emit("switchCom", { component: "DepartmentManage" });
    },
    async fetchDepartment() {
      const res = await this.$axios.get("/admin/department");
      this.selectData = res.data;
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