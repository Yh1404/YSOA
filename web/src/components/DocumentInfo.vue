<template>
  <div class="docInfo">
    <el-header>
      <span>公文详情|{{ document.title }}</span>
    </el-header>
    <el-steps :active="step" align-center>
      <el-step :description ="document.status === 'REJECT' ? '公文已驳回' : (document.status === 'CANCEL'? '公文已取消' : (index == step ? '审批中' : (index > step ? '待审批': '已完成')) ) " v-for="(item, index) in stepUsers" :key="item._id" :title="item.name + '(' + item.department.name + ',' + item.identity.name + ')'">
      </el-step>
    </el-steps>
    <div class="button_box">
      <el-button type="success" v-if="isCurrentUser" :disabled="disabled" @click.native="agree">同意</el-button>
      <el-button type="danger" v-if="isCurrentUser" :disabled="disabled" @click.native="reject">驳回</el-button>
      <el-button type="primary" v-if="isOriginator" :disabled="disabled" @click.native="hurry">催办</el-button>
      <el-button type="info" v-if="isOriginator" :disabled="disabled" @click.native="cancel">撤销申请</el-button>
    </div>
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
  async created() {
    await this.fetchNewDoc();
    this.fetchFlowUser();
  },
  computed: {
    step() {
      //获取当前进度
      if (!this.document || this.document.status === "CANCEL") {
        return -1;
      } else {
        let index = 0;
        for (let i = 0; i < this.stepUsers.length; i++) {
          if (this.stepUsers[i]._id === this.document.currentNodeID) {
            index = i;
          }
        }
        return index;
      }
    },
    isCurrentUser() {
      if (this.document.currentNodeID === sessionStorage.getItem("id")) {
        return true;
      } else return false;
    },
    isOriginator() {
      //是否为公文发起人
      if (this.document.originator === sessionStorage.getItem("id")) {
        //若用户为公文发起人则激活撤销按钮
        return true;
      } else return false;
    },
    disabled() {
      if (this.document.status === "CANCEL" || this.document.status === "REJECT") return true;
      else return false;
    }
  },
  methods: {
    async fetchNewDoc() {
      //获取该文档
      const res = await this.$axios.get("/web/document", { headers: { accessToken: sessionStorage.getItem("token") } });
      this.document = res.data;
    },
    async fetchFlowUser() {
      //依次获取流程中所有用户信息
      let flowUsers = this.document.flow.to_users;
      flowUsers.unshift(sessionStorage.getItem("id"));
      for (let i = 0; i < flowUsers.length; i++) {
        let user = await this.$axios.get(`/web/user/ ?userID=${flowUsers[i]}`, {
          headers: { accessToken: sessionStorage.getItem("token") }
        });
        this.stepUsers.push(user.data);
      }
    },
    async cancel() {
      //撤销公文
      await this.$axios.put(`/web/cancel_document/${this.document._id}`, {
        headers: { accessToken: sessionStorage.getItem("token") }
      });
      this.$message({
        type: "success",
        message: "撤销成功"
      });
      this.fetchNewDoc();
    },
    async hurry() {
      //催办公文
      await this.$axios.get(`/web/hurry/ ?docID=${this.document._id}`, {
        headers: { accessToken: sessionStorage.getItem("token") }
      });
      this.ws.send(
        //发送催办消息
        JSON.stringify({
          to: this.document.currentNodeID,
          type: "HURRY",
          doc: this.document._id
        })
      );
      this.$message({
        type: "success",
        message: "催办成功"
      });
    },
    async reject() {
      await this.$axios.put(`/web/reject_document/${this.document._id}`, {
        headers: { accessToken: sessionStorage.getItem("token") }
      });
      this.$message({
        type: "success",
        message: "申请已驳回"
      });
      this.fetchNewDoc();
    }
  }
};
</script>
<style lang="css" scoped>
.docInfo {
  position: absolute;
  width: 95%;
  height: 90%;
  background-color: #fff;
  top: 19px;
  margin: 0 auto;
}
.el-header {
  margin: 20px 0;
  font-size: 20px;
}
.button_box {
  position: relative;
  display: flex;
  justify-content: center;
  left: -25%;
  top: 50%;
}
</style>
