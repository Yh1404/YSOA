<template>
  <div>
    <el-table :data="currentData" max-height="400px" highlight-current-row>
      <el-table-column label="日期" prop="date"> </el-table-column>
      <el-table-column label="标题" prop="title" show-overflow-tooltip> </el-table-column>
      <el-table-column label="发起人" prop="originator.name"> </el-table-column>
      <el-table-column label="当前节点" prop="currentNodeID.name"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination :total="total" :page-size="5" @current-change="handleCurrentPage"> </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      currentData: []
    };
  },
  computed: {
    total() {
      return this.tableData.length;
    }
  },
  async created() {
    await this.fetchNews();
    this.handleCurrentPage(1);
  },
  methods: {
    async fetchNews() {
      const res = await this.$axios.get(`/admin/document`);
      this.tableData = res.data;
    },
    handleEdit(index, row) {
      let payload = {
        component: "DocumentInfo",
        id: row._id
      };
      this.$emit("switchCom", payload);
    },
    async handleDel(index, row) {
      await this.$axios.delete(`/admin/document/${row._id}`);
      this.$message({
        type: "success",
        message: "删除成功"
      });
    },
    handleCurrentPage(index) {
      this.currentData = this.tableData.slice((index - 1) * 5, index * 5);
    }
  }
};
</script>