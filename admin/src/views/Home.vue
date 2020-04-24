<template>
  <el-container>
    <el-container>
      <el-header>
        <div class="user">
          <span class="el-icon-user-solid"></span>
          <b>&nbsp;&nbsp;&nbsp;</b>
          <b>{{ `dadad` }}</b>
        </div>
        <div class="date">
          <h1>北京时间：</h1>
          <p>{{ `fsfsfsfs` }}</p>
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
                <el-menu-item index="1-3">
                  <i class="el-icon-chat-dot-square"></i>
                  <span>我的消息</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-main>
        </el-main>
      </el-container>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    select() {}
  }
};
</script>
<style lang="css" scoped>
.el-container {
  height: 100%;
  overflow: hidden;
}
.el-header,
.el-footer {
  background-color: #fff;
  line-height: 60px;
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
  user-select: none;
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
