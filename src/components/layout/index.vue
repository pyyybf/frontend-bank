<template>
  <el-container style="padding-top: 0;margin-top: 0">
    <el-header height="60px">
      <el-row style="height: 60px">
        <el-col :span="8" class="header-title">
          <div class="header-title-logo">
            <img :src="require('../../assets/logo.png')" height="50px" style="margin-top:5px">
          </div>
          <span class="header-title-text">人民银行法规库</span>
        </el-col>
        <el-col :span="6" :offset="10" style="text-align: right">
          <span class="header-text" style="color: white">欢迎，</span>
          <el-dropdown>
            <span class="el-dropdown-link header-text" style="color: white">
              {{ username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-switch-button" @click.native="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="sub-container">
      <el-aside width="16vw">
        <!-- 这里是个菜单厚 -->
        <el-menu
          default-active="/home"
          router
          class="el-menu-vertical-demo"
          style="height: 100%">
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-s-management"></i>
              <span>外规管理</span>
            </template>
            <el-menu-item index="/manage">外规维护</el-menu-item>
            <el-menu-item index="/search">外规查询</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main-body">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Layout",
  data() {
    return {
      username: localStorage.getItem('username'),
    }
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
    handleLogout() {
      this.logout(localStorage.getItem('userId')).then(res => {
        this.$message.success(res);
        this.$router.push({path: '/login'});
      }).catch(err => {
        this.$message.error(err);
      })
    },
  },
}
</script>

<style scoped>
.header-title {
  color: white;
  text-align: left;
  font-size: x-large;
  height: 100%;
}

.header-title-logo {
  height: 100%;
  float: left;
}

.header-title-text {
  color: white;
  font-size: x-large;
  float: left;
  margin-left: 15px;
}

.header-text:hover {
  cursor: default;
}

.sub-container {
  height: calc(100vh - 60px);
}

.main-body {
  overflow-y: scroll;
}
</style>

<style>
.el-header, .el-footer {
  background-color: #012d54;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /*background-color: #D3DCE6;*/
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  /*line-height: 30px;*/
  padding-bottom: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 60px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 60px;
}

.el-tabs__nav {
  line-height: 30px;
}
</style>
