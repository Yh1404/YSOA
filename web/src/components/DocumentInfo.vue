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
        <el-input type="text" v-model="document.originator.name" style="width:90px;" disabled></el-input>
      </el-form-item>
    </el-form>
    <div class="seal" v-if="step > stepUsers.length -1"></div>
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
  props: ["Doc"],
  async created() {
    this.document = this.Doc;
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
    },
    isCurrentUser() {
      if (this.document.currentNodeID._id === sessionStorage.getItem("id")) {
        return true;
      } else return false;
    },
    isOriginator() {
      //是否为公文发起人
      if (this.document.originator._id === sessionStorage.getItem("id")) {
        //若用户为公文发起人则激活撤销按钮
        return true;
      } else return false;
    },
    disabled() {
      if (this.document.status === "CANCEL" || this.document.status === "REJECT" || this.document.status === "PASS")
        return true;
      else return false;
    }
  },
  methods: {
    async fetchNewDoc() {
      const doc = await this.$axios.get(`/web/document/${this.document._id}`);
      this.document = doc.data;
    },
    async fetchFlowUser() {
      //依次获取流程中所有用户信息
      let flowUsers = [];
      flowUsers = this.document.flow.to_users.concat(); //数组浅拷贝，不改变document属性
      flowUsers.unshift(this.document.originator._id);
      for (let i = 0; i < flowUsers.length; i++) {
        let user = await this.$axios.get(`/web/user/ ?userID=${flowUsers[i]}`, {
          headers: { accessToken: sessionStorage.getItem("token") }
        });
        this.stepUsers.push(user.data);
      }
    },
    async cancel() {
      //撤销公文
      // await this.$axios.put(`/web/cancel_document/${this.document._id}`, {
      //   headers: { accessToken: sessionStorage.getItem("token") }
      // });
      await this.$axios.put(`/web/document/${this.document._id}`, {
        headers: { accessToken: sessionStorage.getItem("token") },
        change: {
          status: "REJECT"
        }
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
          to: this.document.currentNodeID._id,
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
      // await this.$axios.put(`/web/reject_document/${this.document._id}`, {
      //   headers: { accessToken: sessionStorage.getItem("token") }
      // });
      await this.$axios.put(`/web/document/${this.document._id}`, {
        headers: { accessToken: sessionStorage.getItem("token") },
        change: {
          status: "REJECT"
        }
      });
      this.ws.send(JSON.stringify({ type: "REJECT", to: this.document.originator._id, doc: this.document._id }));
      this.$message({
        type: "success",
        message: "申请已驳回"
      });
      this.fetchNewDoc();
    },
    async agree() {
      //同意公文
      let flow = this.document.flow.to_users.concat();
      if (this.$store.getters.id != flow.pop()) {
        await this.$axios.put(`/web/document/${this.document._id}`, {
          headers: { accessToken: sessionStorage.getItem("token") },
          change: {
            currentNodeID: this.document.flow.to_users[this.document.flow.to_users.indexOf(this.$store.getters.id) + 1]
          }
        });
      } else {
        await this.$axios.put(`/web/document/${this.document._id}`, {
          headers: { accessToken: sessionStorage.getItem("token") },
          change: { status: "PASS" }
        });
      }
      this.fetchNewDoc();
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
