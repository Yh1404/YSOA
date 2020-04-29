<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="流程名称:">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="经办人:">
            <span>{{ props.row.AttentioLine }}</span>
          </el-form-item>
          <el-form-item label="流程ID:">
            <span>{{ props.row._id }}</span>
          </el-form-item>
          <el-form-item label="流程描述:">
            <span>{{ props.row.description  }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="流程名称" prop="name">
    </el-table-column>
    <el-table-column label="流程ID" prop="_id">
    </el-table-column>
    <el-table-column label="流程描述" prop="description">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="change(scope.$index,scope.row)">修改 </el-button>
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
    async handleEdit(index, row) {
      console.log(index, row);
    },
    async fetchTableData() {
      const res = await this.$axios.get("/admin/flow");
      res.data.forEach(item1 => {
        //构建经办人数据结构
        let AttentioLine = [];
        item1.to_users.forEach(item2 => {
          AttentioLine.push(item2.name);
        });
        item1.AttentioLine = AttentioLine.join("->");
      });
      this.tableData = res.data;
    },
    change(index, row) {
      this.$emit("switchCom", { component: "addFlow", id: row._id });
    },
    async handleDel(index, row) {
      await this.$axios.delete(`/admin/flow/${row._id}`);
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