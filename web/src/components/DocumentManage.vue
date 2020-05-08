<template>
  <div>
    <el-button id="refresh_btn" type="primary" @click="refresh" :loading="loading">刷新数据</el-button>
    <el-table :data="currentData" max-height="400px" highlight-current-row>
      <el-table-column label="日期" prop="date"> </el-table-column>
      <el-table-column label="标题" prop="title" show-overflow-tooltip> </el-table-column>
      <el-table-column label="发起人" prop="originator.name"> </el-table-column>
      <el-table-column label="当前节点" prop="currentNodeID.name"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
      currentData: [],
      loading: false
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
    async refresh() {
      this.loading = true;
      await this.fetchNews();
      this.handleCurrentPage(1);
      this.loading = false;
    },
    async fetchNews() {
      const res = await this.$axios.get(`/web/document/${sessionStorage.getItem(`id`)}`, {
        headers: { accessToken: sessionStorage.getItem("token") }
      });
      this.tableData = res.data;
    },
    handleEdit(index) {
      let payload = {
        component: "DocumentInfo",
        param: this.currentData[index]
      };
      this.$emit("changeComponet", payload);
    },
    handleCurrentPage(index) {
      this.currentData = this.tableData.slice((index - 1) * 5, index * 5);
    }
  }
};
</script>
<style lang="css" scoped>
#refresh_btn {
  position: static;
  margin-left: 1100px;
  margin-bottom: 20px;
}
</style>