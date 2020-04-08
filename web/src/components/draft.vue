<template>
  <div class="flow_Form">
    <el-form label-position="left">
      <el-form-item label="流程模型">
        <el-select v-model="selectFlow" placeholder="选择流程模型">
          <el-option v-for="flow in flows" :key="flow._id" :label="flow.name" :value="flow"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发起人" label-width="70px">
        <el-input disabled :placeholder="user.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectFlow: "", //选中的流程
      flows: [], //所有流程模型
      user: this.userInfo
    };
  },
  props: ["userInfo"],
  created() {
    this.fetchFlow();
  },
  methods: {
    async fetchFlow() {
      const res = await this.$axios.get("/web/flow");
      this.flows = res.data;
    }
  }
};
</script>
<style lang="css" scoped>
.flow_Form {
  width: 99%;
  margin: 0 auto;
  height: 96%;
  background-color: #fff;
  border-radius: 5px;
  text-align: left;
}
.el-form {
  width: 100%;
  height: 100%;
  padding: 20px 20px;
}
.el-form-item {
  width: 100%;
}
.el-input {
  width: 50px;
}
</style>