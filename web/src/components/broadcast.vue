<template>
  <div>
    <el-button id="refresh_btn" type="primary" @click="refresh" :loading="loading">刷新数据</el-button>
    <el-table :data="currentData" max-height="400px">
      <el-table-column label="日期" prop="date"> </el-table-column>
      <el-table-column label="标题" prop="title"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogData.title" :visible="dialogVisible" fullscreen>
      <el-divider></el-divider>
      <span class="date">发表日期：{{ dialogData.date }}</span>
      <el-divider></el-divider>
      <p class="my-body">{{ dialogData.body }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="pagination">
      <el-pagination :total="total" :page-size="5" @current-change="handleCurrentPage"> </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      dialogData: {},
      dialogVisible: false,
      tableData: [],
      currentData: [],
      loading: false
    };
  },
  async created() {
    await this.fetchTableData();
    this.handleCurrentPage(1);
  },
  computed: {
    total: function() {
      return this.tableData.length;
    }
  },
  methods: {
    async refresh() {
      await this.fetchTableData();
      this.handleCurrentPage(1);
    },
    async fetchTableData() {
      this.loading = true;
      const res = await this.$axios.get("/web/broadcast", {
        headers: { accessToken: sessionStorage.getItem("token") }
      });
      this.tableData = res.data;
      this.loading = false;
    },
    handleCurrentPage(index) {
      this.currentData = this.tableData.slice((index - 1) * 5, index * 5);
    },
    handleEdit(index) {
      this.dialogVisible = true;
      this.dialogData = this.currentData[index];
    },
    handleDelete(index, row) {
      let del;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i]._id === row._id) {
          del = i;
          break;
        }
      }
      this.tableData.splice(del, 1);
      this.currentData.splice(index, 1);
      this.$message({ type: "success", message: "删除成功" });
    }
  }
};
</script>
<style lang="css">
.el-divider--horizontal {
  margin: 10px 0;
}
.dialog-footer {
  position: absolute;
  left: 85%;
  top: 85%;
}
.pagination {
  position: absolute;
  left: 45%;
  bottom: 80px;
}
#refresh_btn {
  position: static;
  margin-left: 1000px;
}
</style>
