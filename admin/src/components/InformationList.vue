<template>
  <el-table :data="tableData" style="width: 100%" :show-overflow-tooltip="true">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="标题:">
            <span>{{ props.row.title }}</span>
          </el-form-item>
          <el-form-item label="公告ID:">
            <span>{{ props.row._id }}</span>
          </el-form-item>
          <el-form-item label="公告内容:">
            <span>{{ props.row.body }}</span>
          </el-form-item>
          <el-form-item label="发布日期:">
            <span>{{ props.row.date }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="日期" prop="date">
    </el-table-column>
    <el-table-column label="标题" prop="title">
    </el-table-column>
    <el-table-column label="摘要" prop="body">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
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
      const res = await this.$axios.get("/web/broadcast");

      this.tableData = res.data;
    },
    async handleDel(index, row) {
      await this.$axios.delete(`/admin/broadcast/${row._id}`);
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