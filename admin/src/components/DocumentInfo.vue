<template>
  <div class="docInfo">
    <el-header>
      <span>公文详情|{{ document.title }}</span>
    </el-header>
    <el-steps :active="step" align-center>
      <el-step :description="document.status === 'REJECT' ? '公文已驳回' : (document.status === 'CANCEL'? '公文已取消' : (index == step ? '审批中' : (index > step ? '待审批': '已完成')) ) " v-for="(item, index) in stepUsers" :key="item._id" :title="item.name + '(' + item.department.name + ',' + item.identity.name + ')'">
      </el-step>
    </el-steps>
    <el-form>
      <el-form-item label="标题" label-width="70px" style="margin:40px 0 0 60px">
        <el-input type="text" v-model="document.title" style="width:20%;" disabled></el-input>
      </el-form-item>
      <el-form-item label="内容" label-width="70px" style="margin:20px 0 0 60px">
        <el-input type="textarea" v-model="document.body" style="width:40%;" disabled :autosize="{ minRows: 2, maxRows: 8 }"></el-input>
      </el-form-item>
      <el-form-item label="发起人" label-width="70px" style="margin:20px 0 0 60px">
        <el-input type="text" v-if="document.originator" v-model="document.originator.name" style="width:90px;" disabled></el-input>
      </el-form-item>
    </el-form>
    <div class="seal" v-if="step > stepUsers.length -1"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      document: {},
      stepUsers: []
    };
  },
  props: ["id"],
  async created() {
    await this.fetchNewDoc();
    this.fetchFlowUser();
  },
  computed: {
    step() {
      //获取当前进度
      if (!this.document || this.document.status === "CANCEL" || this.document.status === "REJECT") {
        return -1;
      } else if (this.document.status === "PASS") {
        //步骤条显示完成
        return 10;
      } else {
        let index = 0;
        for (let i = 0; i < this.stepUsers.length; i++) {
          if (this.stepUsers[i]._id === this.document.currentNodeID._id) {
            index = i;
          }
        }
        return index;
      }
    }
  },
  methods: {
    async fetchNewDoc() {
      const doc = await this.$axios.get(`/admin/document/${this.id}`);
      this.document = doc.data;
    },
    async fetchFlowUser() {
      //依次获取流程中所有用户信息
      let flowUsers = [];
      flowUsers = this.document.flow.to_users.concat(); //数组浅拷贝，不改变document属性
      flowUsers.unshift(this.document.originator._id);
      for (let i = 0; i < flowUsers.length; i++) {
        let user = await this.$axios.get(`/admin/user/${flowUsers[i]}`);
        this.stepUsers.push(user.data);
      }
    }
  }
};
</script>
<style lang="css" scoped>
.docInfo {
  position: absolute;
  width: 95%;
  height: 95%;
  background-color: #fff;
  top: 19px;
  margin: 0 auto;
  overflow: auto;
}
.el-header {
  margin: 20px 0;
  font-size: 20px;
}
.button_box {
  position: absolute;
  display: flex;
  width: 200px;
  justify-content: center;
  left: 70%;
  bottom: 20px;
}
.seal {
  width: 300px;
  height: 300px;
  position: absolute;
  background: url("../assets/pass.png") no-repeat center center;
  background-size: 300px 200px;
  left: 60%;
  top: 35%;
  transform: rotate(-20deg);
}
</style>
