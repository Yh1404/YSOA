<template>
  <div class="panel">
    <el-form label-position="left">
      <el-form-item label="流程名称" label-width="100px">
        <el-input type="text" style="width:250px" v-model="flow.name"></el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="选择流程节点">
        <el-select v-model="flow.to_users" multiple placeholder="请选择">
          <el-option v-for="item in users" :key="item._id" :label="item.value" :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流程描述" label-width="100px">
        <el-input type="textarea" style="width:250px" v-model="flow.description"></el-input>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="submit">{{fatherID?"修改":"添加"}}</el-button>
        <el-button @click="cancel" v-if="fatherID">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flow: {},
      users: [],
      fatherID: this.id
    };
  },
  props: {
    id: {}
  },
  created() {
    this.fetchUser();
    this.fatherID && this.fetch();
  },
  methods: {
    cancel() {
      this.fatherID = undefined;
      this.flow = {};
    },
    async submit() {
      if (this.fatherID) {
        //存在流程id时，执行流程修改操作
        await this.$axios.put(`/admin/flow/${this.id}`, this.flow);
        this.$message("修改成功");
        this.$emit("switchCom", { component: "FlowManage" });
      } else {
        //否则执行流程添加操作
        await this.$axios.post("/admin/flow", this.flow);
        this.$message("添加成功");
        this.$emit("switchCom", { component: "FlowManage" });
      }
    },
    async fetch() {
      //通过流程id获取流程对象
      const res = await this.$axios.get(`/admin/flow/${this.id}`);
      let temp = [];
      res.data.to_users.forEach(item => {
        temp.push(item._id);
      }); //封装流程对象
      res.data.to_users = temp;
      this.flow = res.data;
    },
    async fetchUser() {
      //获取所有用户信息并封装
      const res = await this.$axios.get("/admin/user");
      res.data.forEach(item => {
        item.value = `${item.department.name}/${item.identity.name}/${item.name}`;
      });
      this.users = res.data;
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