<template>
  <el-table :data="tableData" row-key="_id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column prop="_id" label="ID" width="500px">
    </el-table-column>
    <el-table-column prop="name" label="部门名称" width="500px">
    </el-table-column>
    <el-table-column label="操作" width="200px">
      <template slot-scope="scope">
        <el-button size="mini" @click.native="change(scope.$index,scope.row)">添加子部门 </el-button>
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
    change() {},
    async handleDel(index, row) {
      await this.$axios.delete(`/admin/department/${row._id}`);
      this.$message({
        type: "success",
        message: "删除成功"
      });
      this.fetchTableData();
    },
    async fetchTableData() {
      this.tableData = [];
      const res = await this.$axios.get("/admin/department");
      let dep = res.data;
      let length = dep.length;
      for (let i = 0; i < length; i++) {
        //封装部门数据为树形结构
        for (let j = 0; j < length; j++) {
          if (Object.prototype.hasOwnProperty.call(dep[i], "parent") && dep[i].parent == dep[j]._id) {
            dep[j].children ? dep[j].children.push(dep[i]) : (dep[j].children = [dep[i]]);
          }
        }
      }
      this.tableData.push(dep[0]);
    }
  }
};
</script>

<style scoped>
</style>