<template>
  <el-container>
    <el-container>
      <el-header>
        <div class="user">
          <span class="el-icon-user-solid"></span>
          <b>&nbsp;&nbsp;&nbsp;{{ `${user.name}` }}</b>
          <b>{{ `(${user.department},${user.identity})` }}</b>
        </div>
        <div class="date">
          <h1>北京时间：</h1>
          <h1>{{ date }}</h1>
        </div>
        <span class="el-icon-refresh-right refresh" title="刷新页面" @click="refresh()"></span>
        <span class="el-icon-switch-button switch" title="退出登录" @click="logout()"></span>
      </el-header>
      <el-container>
        <el-col :span="4">
          <el-menu @select="select">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>功能菜单</span>
              </template>
              <el-menu-item-group>
                <el-submenu index="1-1">
                  <template slot="title">
                    <i class="el-icon-folder-opened"></i>
                    <span>我的公文</span>
                  </template>
                  <el-menu-item index="1-1-1">
                    <i class="el-icon-edit"></i>
                    <span>起草公文</span>
                  </el-menu-item>
                  <el-menu-item index="1-1-2">
                    <i class="el-icon-document-copy"></i>
                    <span>公文管理</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="1-2">
                  <i class="el-icon-tickets"></i>
                  <span>我的资讯</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-main>
          <keep-alive>
            <component :is="flag" :userInfo="user"></component>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
import broadcast from "../components/broadcast";
import draft from "../components/draft";
export default {
  data() {
    return {
      flag: "",
      user: {
        name: window.sessionStorage.getItem("name"),
        department: window.sessionStorage.getItem("department"),
        identity: window.sessionStorage.getItem("identity"),
        id: window.sessionStorage.getItem("id")
      },
      date: "" //时间
    };
  },
  created() {
    window.onunload = this.logout;
    setInterval(this.getDate, 1000);
  },
  mounted() {
    let self = this;
    this.ws.onopen = function() {
      //建立WebSocket连接
      self.ws.send(
        JSON.stringify({
          id: sessionStorage.getItem("id"),
          type: "LOGIN"
        })
      );
    };
    // this.ws.onopen();
    this.ws.onmessage = async function(e) {
      const res = await self.$axios.get(`/web/document/${e.data}`);
      self.$alert(`请您尽快完成公文：${res.data.title}的审批`, `催办消息`, {
        confirmButtonText: "确定"
      });
    };
  },
  methods: {
    getDate() {
      this.date = this.moment().format("YYYY-MM-DD h:mm:ss a");
    },
    async logout() {
      await this.$axios.put(`/web/logout/${this.user.id}`);
      await this.$store.dispatch("ClearLoginInfoAllAsync");
      this.$message({
        type: "success",
        message: "退出成功"
      });
      this.$router.push("/login");
    },
    async refresh() {
      this.$router.go(0);
    },
    select(index) {
      if (index == "1-2") {
        this.flag = "broadcast";
      } else if (index == "1-1-1") {
        this.flag = "draft";
      }
    }
  },
  components: {
    broadcast: broadcast,
    draft: draft
  }
};
</script>
>
<style lang="css" scoped>
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #fff;
  line-height: 60px;
}
.user {
  display: inline-block;
  width: 400px;
  height: 100%;
  font-size: 28px;
  color: #0984e3;
  user-select: none;
}
b {
  font-weight: 200;
  color: #000;
}
.switch,
.refresh {
  position: absolute;
  color: #0984e3;
  font-size: 28px;
  cursor: pointer;
  margin-top: 15px;
}
.switch:hover,
.refresh:hover {
  color: #74b9ff;
}
.refresh {
  left: 90%;
}
.switch {
  left: 95%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.date {
  display: flex;
  position: absolute;
  top: 0;
  justify-content: center;
  left: 65%;
}
.el-main {
  position: relative;
  background-color: #e9eef3;
  color: #333;
  overflow-x: hidden;
}
</style>
