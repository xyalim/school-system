<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">账号注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="user_number">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="user_number"
          v-model="loginForm.user_number"
          placeholder="请输入学号/工号"
          name="user_number"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="phone">
        <span class="svg-container">
          <i class="iconfont el-icon-mobile-phone" />
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="请输入手机号"
          name="phone"
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
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="onRegister"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="confirm_password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordTypeConfirm"
          ref="confirm_password"
          v-model="loginForm.confirm_password"
          :type="passwordTypeConfirm"
          placeholder="请输入确认密码"
          name="confirm_password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="onRegister"
        />
        <span class="show-pwd" @click="showPwdConfirm">
          <svg-icon :icon-class="passwordTypeConfirm === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="major_id">
        <el-cascader
          ref="cascaderRef"
          style="width:100%"
          :options="departmentList"
          :props="cascaderConfig"
          :show-all-levels="false"
          placeholder="所属院系专业"
          @change="onChangeGetMajor"
        />
      </el-form-item>

      <el-form-item prop="class_id">
        <el-select
          v-model="loginForm.class_id"
          style="width:100%"
          placeholder="所属班级"
          no-data-text="该专业暂无班级"
        >
          <el-option
            v-for="item in classList"
            :key="item.class_id"
            :label="item.class_name"
            :value="item.class_id"
            style="width:100%"
          />
        </el-select>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="onRegister">注册</el-button>
      <div class="form-group">
        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="$router.push('/login')">返回首页</el-button>
      </div>
      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { register, getDepartmentList, getClassList } from '@/api/api'
export default {
  name: 'Register',
  data() {
    const loginForm = {
      username: '',
      // 学号/工号
      user_number: '',
      password: '',
      confirm_password: '',
      department_id: '',
      major_id: '',
      class_id: ''
    }
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('密码不能为空！'))
      } else {
        callback()
      }
    }

    const validatePasswordConfirm = (rule, value, callback) => {
      if (loginForm.password !== loginForm.confirm_password) {
        callback(new Error('密码确认不相同'))
      }
      if (value.length === 0) {
        callback(new Error('密码不能为空！'))
      } else {
        callback()
      }
    }
    return {
      loginForm,
      loginRules: {
        username: [{ required: true, trigger: 'none', message: '请输入用户名' }],
        user_number: [{ required: true, trigger: 'none', message: '请输入用户学号/工号' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirm_password: [{ required: true, trigger: 'blur', validator: validatePasswordConfirm }],
        major_id: [{ required: true, trigger: 'blur', message: '请选择专业' }],
        class_id: [{ required: true, trigger: 'blur', message: '请选择班级' }]
      },
      loading: false,
      passwordType: 'password',
      passwordTypeConfirm: 'password',
      redirect: undefined,
      cascaderConfig: {
        label: 'name',
        children: 'major',
        multiple: false,
        value: 'id'
      },
      departmentList: [],
      classList: []
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
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      const { data } = await getDepartmentList()
      data.forEach(ele => {
        ele.major.forEach(majorEle => {
          majorEle.name = majorEle.major_name
        })
      })
      this.departmentList = data
    },

    async getClassList({ major_id }) {
      const { data } = await getClassList({ major_id })
      this.classList = data
    },

    onChangeGetMajor(value) {
      console.log(value)
      const selectedNode = this.$refs.cascaderRef.getCheckedNodes()
      const { major_id, department_id } = selectedNode[0].data
      this.loginForm.major_id = major_id
      this.loginForm.department_id = department_id
      this.getClassList({
        major_id
      })
    },

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
    showPwdConfirm() {
      if (this.passwordTypeConfirm === 'password') {
        this.passwordTypeConfirm = ''
      } else {
        this.passwordTypeConfirm = 'password'
      }
      this.$nextTick(() => {
        this.$refs.confirm_password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          this.loading = true
          await register({

          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @description 登录监听
     */
    onRegister() {
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          this.loading = true
          // const res = await login({
          //   user_number: this.loginForm.username,
          //   password: this.loginForm.password
          // })
          // const res = await this.$store.dispatch('user/login', this.loginForm).then((res) => {
          //   console.log('login info', res)
          //   this.$router.push({ path: this.redirect || '/' })
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })
          // const
          const { return_msg } = await register({
            username: this.loginForm.username,
            user_number: this.loginForm.user_number,
            password: this.loginForm.password,
            confirm_password: this.loginForm.confirm_password,
            department_id: this.loginForm.department_id,
            major_id: this.loginForm.major_id,
            class_id: this.loginForm.class_id
          }).catch(() => {
            this.loading = false
          })

          if (return_msg === 'OK') {
            this.$message.success('注册成功')
          }

          this.loading = false
        } else {
          console.log('error submit!!')
          this.loading = false
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

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
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
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
