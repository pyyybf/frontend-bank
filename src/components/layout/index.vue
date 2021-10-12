<template>
  <el-container>
    <el-header height="60px">
      <el-row>
        <el-col :span="8" style="text-align: left">
          <span class="header-title header-text">人民银行法规库</span>
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
          default-active="home"
          router
          class="el-menu-vertical-demo"
          style="height: 100%">
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu>
            <template slot="title">
              <i class="el-icon-s-management"></i>
              <span>外规管理</span>
            </template>
            <el-menu-item index="/edit">外规维护</el-menu-item>
            <el-menu-item index="/search">外规查询</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main-body">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
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
  computed: {
    ...mapGetters([
      'username',
    ]),
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
    handleLogout() {
      this.logout().then(res => {
        this.$message.success(res);
        this.$router.push({path: '/'});
      })
    },
  },
}
</script>

<style scoped>
.header-title {
  color: white;
  font-family: 幼圆;
  font-size: x-large;
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
  background-color: #409EFF;
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

.el-collapse-item {
  text-align: left;
}

.el-collapse-item__header {
  font-size: 14px;
}

.el-collapse-item__content {
  font-size: 14px;
}
</style>
