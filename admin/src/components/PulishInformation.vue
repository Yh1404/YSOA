<template>
  <div class="panel">
    <el-form label-position="left">
      <el-form-item label="公告标题" label-width="100px">
        <el-input type="text" style="width:250px" v-model="news.title"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" label-width="100px">
        <el-input type="textarea" style="width:250px" v-model="news.body"></el-input>
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
      news: {
        date: new Date().toLocaleDateString()
      }
    };
  },
  methods: {
    async submit() {
      //否则执行流程添加操作
      await this.$axios.post("/admin/broadcast", this.news);
      this.$message({
        type: "success",
        message: "添加成功"
      });
      this.$emit("switchCom", { component: "InformationList" });
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