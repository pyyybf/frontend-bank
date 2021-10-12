<template>
  <div>
    <el-card class="login-form-layout">
      <div class="login-logo">
        <i class="el-icon-collection"></i>
      </div>
      <h2 class="login-title">人民银行法规库</h2>
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="login-form">
        <el-form-item prop="username">
          <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" prefix-icon="el-icon-lock" v-model="loginForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 56px">
          <el-button type="primary" :loading="loginLoading" @click="submitLoginForm" class="login-submit-button">登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_bg" class="login-center-layout">
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import login_bg from '@/assets/login_bg.png'

export default {
  name: 'Login',
  data() {
    return {
      login_bg,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {},
      loginLoading: false,
    }
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    submitLoginForm() {
      this.loginLoading = true;
      this.login(this.loginForm).then(res => {
        this.loginLoading = false;
        this.$message.success(res);
      }).catch(err => {
        this.$message.error(err);
        this.loginLoading = false;
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409EFF;
}

.login-center-layout {
  background: #409EFF;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}

.login-logo {
  text-align: center;
  color: #409EFF;
  font-size: 56px;
  padding: 0;
}

.login-title {
  text-align: center;
  color: #409EFF;
  font-family: 幼圆;
  margin-top: 12px;
}

.login-submit-button {
  width: 100%;
}
</style>
<style>
.el-input__icon {
  color: #409EFF;
}
</style>
