<template>
  <el-table :data="tableData" style="width: 100%;">
    <el-table-column label="Date" prop="date"> </el-table-column>
    <el-table-column label="Name" prop="name"> </el-table-column>
    <el-table-column label="操作">
      <template>
        <el-button size="mini">Edit</el-button>
        <el-button size="mini" type="danger">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          title: "dadadad",
          date: "2020/2/3"
        }
      ]
    };
  }
};
</script>
<style lang="css" scoped></style>
