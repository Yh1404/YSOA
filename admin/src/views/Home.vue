<template>
  <el-container>
    <el-container>
      <el-header>
        <div class="user">
          <span class="el-icon-user-solid"></span>
          <b>&nbsp;&nbsp;&nbsp;</b>
          <b>管理员({{user.name}})</b>
        </div>
        <div class="date">
          <p>北京时间：</p>
          <p>{{ date }}</p>
        </div>
        <span class="el-icon-refresh-right refresh" title="刷新页面" @click="refresh()"></span>
        <span class="el-icon-switch-button switch" title="退出登录" @click="logout()"></span>
      </el-header>
      <el-container>
        <el-col :span="4" style="overflow:auto;">
          <el-menu @select="select" unique-opened>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>功能菜单</span>
              </template>
              <el-menu-item-group>
                <el-submenu index="1-1">
                  <template slot="title">
                    <i class="el-icon-set-up"></i>
                    <span>流程管理</span>
                  </template>
                  <el-menu-item index="1-1-1">
                    <i class="el-icon-edit"></i>
                    <span>添加/修改流程</span>
                  </el-menu-item>
                  <el-menu-item index="1-1-2">
                    <i class="el-icon-document-copy"></i>
                    <span>流程管理</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-2">
                  <template slot="title">
                    <i class="el-icon-folder-opened"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item index="1-2-1">
                    <i class="el-icon-edit"></i>
                    <span>添加用户</span>
                  </el-menu-item>
                  <el-menu-item index="1-2-2">
                    <i class="el-icon-document-copy"></i>
                    <span>用户管理</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-3">
                  <template slot="title">
                    <i class="el-icon-folder-opened"></i>
                    <span>资讯管理</span>
                  </template>
                  <el-menu-item index="1-3-1">
                    <i class="el-icon-edit"></i>
                    <span>发布资讯</span>
                  </el-menu-item>
                  <el-menu-item index="1-3-2">
                    <i class="el-icon-document-copy"></i>
                    <span>资讯管理</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="1-4">
                  <template slot="title">
                    <i class="el-icon-folder-opened"></i>
                    <span>组织机构管理</span>
                  </template>
                  <el-menu-item index="1-4-1">
                    <i class="el-icon-edit"></i>
                    <span>添加部门</span>
                  </el-menu-item>
                  <el-menu-item index="1-4-2">
                    <i class="el-icon-document-copy"></i>
                    <span>部门管理</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="1-5">
                  <i class="el-icon-folder-opened"></i>
                  <span>公文管理</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-main>
          <keep-alive :exclude="/./">
            <component :is="flag" @switchCom="switchComponent" :id="param" />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
// @ is an alias to /src
import addFlow from "@/components/addFlow";
import FlowManage from "@/components/FlowManage";
import addUser from "@/components/addUser";
import UserManage from "@/components/UserManage";
import PulishInformation from "@/components/PulishInformation";
import InformationList from "@/components/InformationList";
import DepartmentManage from "@/components/DepartmentManage";
import addDepartment from "@/components/addDepartment";
import DocumentManage from "@/components/DocumentManage";
import DocumentInfo from "../components/DocumentInfo";
export default {
  name: "Home",
  data() {
    return {
      param: "",
      date: "",
      flag: "",
      user: {
        name: sessionStorage.getItem("name")
      }
    };
  },
  mounted() {
    setInterval(this.getDate, 1000);
  },
  methods: {
    select(index) {
      switch (index) {
        case "1-1-1":
          this.flag = "addFlow";
          break;
        case "1-1-2":
          this.flag = "FlowManage";
          break;
        case "1-2-1":
          this.flag = "addUser";
          break;
        case "1-2-2":
          this.flag = "UserManage";
          break;
        case "1-3-1":
          this.flag = "PulishInformation";
          break;
        case "1-3-2":
          this.flag = "InformationList";
          break;
        case "1-4-1":
          this.flag = "addDepartment";
          break;
        case "1-4-2":
          this.flag = "DepartmentManage";
          break;
        case "1-5":
          this.flag = "DocumentManage";
          break;
        default:
          break;
      }
    },
    getDate() {
      this.date = new Date().toLocaleString();
    },
    async logout() {
      await this.$axios.put(`/admin/logout/${this.$store.getters.id}`);
      await this.$store.dispatch("ClearLoginInfoAllAsync");
      this.$message({
        type: "success",
        message: "退出成功"
      });
      this.$cookie.delete("id");
      this.$router.push("/login");
    },
    refresh() {
      this.$router.go(0);
    },
    switchComponent(component) {
      this.flag = component.component;
      this.param = component.id;
    }
  },
  components: {
    addFlow,
    FlowManage,
    addUser,
    UserManage,
    PulishInformation,
    InformationList,
    DepartmentManage,
    addDepartment,
    DocumentManage,
    DocumentInfo
  }
};
</script>
<style lang="css" scoped>
.el-container {
  height: 100%;
  overflow: hidden;
}
.el-header {
  background-color: #fff;
  line-height: 60px;
}
.el-footer {
  background-color: #3498db;
}
.switch,
.refresh {
  position: absolute;
  color: #0984e3;
  font-size: 28px;
  cursor: pointer;
  margin-top: 15px;
}
.user {
  display: inline-block;
  width: 400px;
  height: 100%;
  font-size: 28px;
  color: #0984e3;
}
b {
  font-weight: 200;
  color: #000;
}
.refresh {
  left: 90%;
}
.switch {
  left: 95%;
}
.el-container .el-aside {
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
}
</style>
