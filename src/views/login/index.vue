<template>
  <div class="login-container">
    <div class="login">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">智慧商砼</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { querymenu } from '@/api/menu.js'
import { data } from 'autoprefixer'
// import Vuex from 'vuex'
// Vue.use(Vuex)
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      //   callback(new Error('Please enter the correct user name'))
      // } else {
      //   callback()
      // }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('请重新输入密码,密码长度不得少于两位'))
      } else {
        callback()
      }
    }
    return {
      pid:'0',
      router:[],
      route:[],
      data1:[],
      loginForm: {
        username: '杨文淼',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
handleLogin() {  //这个是登录点击事件
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
          this.$router.push({ path: this.redirect || '/' })
          // this.$router.push({name:'Shiyong'})
          this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fcedc0b2;
$light_gray:rgb(255, 187, 0);
$cursor: rgb(255, 196, 0);

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgb(255, 255, 255);
    background: rgb(255, 255, 255);
    border-radius: 5px;
    color: #dba124;
  }
}
</style>

<style lang="scss" scoped>
$bg:#ebb215;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  color: #dba124;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
 .login{
     background-color: #eeb414;
     width: 500px;
     border:3px solid rgb(221, 215, 215);
     height: 500px;
     margin: 0 auto;
     margin-top: 20%;
     margin-left: 66%;
     box-shadow : 2px 2px 10px  #8f7737;
     overflow: hidden;
      .login-form {
        position: relative;
        width: 400px;
        max-width: 100%;
        // padding: 160px 35px 0;
        margin: 0 auto;
        margin-top: 20%;
        overflow: hidden;
      }

 }


  .tips {
    font-size: 14px;
    color: rgb(255, 255, 255);
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: rgb(255, 196, 0);
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

</style>
