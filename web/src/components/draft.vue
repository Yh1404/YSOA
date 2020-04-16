<template>
  <div class="flow_Form">
    <el-form label-position="left">
      <el-form-item label="流程模型">
        <el-select v-model="document.flow" placeholder="选择流程模型">
          <el-option v-for="flow in flows" :key="flow._id" :label="flow.name" :value="flow"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主题" label-width="70px">
        <el-input type="text" style="width:250px" v-model="document.title"></el-input>
      </el-form-item>
      <el-form-item label="发起人" label-width="70px">
        <el-input disabled :placeholder="user.name" style="width:90px;"></el-input>
      </el-form-item>
      <el-form-item label="内容" label-width="70px">
        <el-input type="textarea" v-model="document.body" :autosize="{ minRows: 2, maxRows: 8 }" style=" width:500px;"></el-input>
      </el-form-item>
      <el-form-item label="抄送" label-width="70px">
        <el-cascader v-model="cc" :props="{ multiple: true }" :options="option"> </el-cascader>
      </el-form-item>
      <el-form-item label-width="70px">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <component :is="docInfo"></component>
  </div>
</template>
<script>
import docInfo from "../components/DocumentInfo";
function clone(dep) {
  let option = [];
  for (let i = 0; i < dep.length; i++) {
    let item = {};
    item.label = dep[i].name;
    item.children = [];
    for (let j = 0; j < dep[i].users.length; j++) {
      let item2 = {};
      item2.label = dep[i].users[j].name;
      item2.value = dep[i].users[j]._id;
      item.children.push(item2);
    }
    option.push(item);
  }
  return option;
}
export default {
  data() {
    return {
      docInfo: "", //子组件绑定值
      cc: [], //抄送人
      document: {
        originator: this.userInfo.id
      }, //公文对象
      flows: [], //所有流程模型
      user: this.userInfo,
      option: [] //级联选择器数据
    };
  },
  props: ["userInfo"],
  created() {
    this.fetchFlow();
    this.fetchDepartment();
  },
  methods: {
    async fetchFlow() {
      const res = await this.$axios.get("/web/flow");
      this.flows = res.data;
    },
    async submit() {
      let ccitem = [];
      this.cc.forEach(item => {
        ccitem.push(item[1]);
      });
      let doc = {
        title: this.document.title,
        body: this.document.body,
        date: this.moment().format("YYYY/MM/DD"),
        flow: this.document.flow._id,
        currentNodeID: this.document.flow.to_users[0],
        originator: this.user.id,
        cc: ccitem,
        status: "PENDING"
      };
      await this.$axios.post("/web/document", doc);
      this.$message({
        type: "success",
        message: "提交成功"
      });
      this.docInfo = "docInfo";
    },
    async fetchDepartment() {
      const dep = await this.$axios.get("/web/department");
      this.option = clone(dep.data);
    }
  },
  components: {
    docInfo
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
</style>
