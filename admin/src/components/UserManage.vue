<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户名:">
            <span>{{ props.row.username }}</span>
          </el-form-item>
          <el-form-item label="姓名:">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="用户ID:">
            <span>{{ props.row._id }}</span>
          </el-form-item>
          <el-form-item label="职务岗位:">
            <span>{{ props.row.position  }}</span>
          </el-form-item>
          <el-form-item label="电话:">
            <span>{{ props.row.telephone  }}</span>
          </el-form-item>
          <el-form-item label="生日:">
            <span>{{ props.row.birth  }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="用户名" prop="username">
    </el-table-column>
    <el-table-column label="用户ID" prop="_id">
    </el-table-column>
    <el-table-column label="职务岗位" prop="position">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click.native="change(scope.$index,scope.row)">修改 </el-button>
        <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    async fetchTableData() {
      const res = await this.$axios.get("/admin/user");
      res.data.forEach(item => {
        item.position = `${item.department.name}/${item.identity.name}`;
      });
      this.tableData = res.data;
    },
    change(index, row) {
      console.log("dadad");
      this.$emit("switchCom", { component: "addUser", id: row._id });
    },
    async handleDel(index, row) {
      await this.$axios.delete(`/admin/user/${row._id}`);
      this.$message("删除成功");
      this.fetchTableData();
    }
  }
};
</script>
<style scoped>
.FMpanel {
  width: 99%;
  margin: 0 auto;
  height: 96%;
  background-color: #fff;
  border-radius: 5px;
  text-align: left;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>