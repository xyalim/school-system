<template>
  <div class="login-container">
    <el-form ref="feedbackForm" :model="feedbackForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">提交建议</h3>
      </div>

      <el-form-item prop="username">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input
          ref="username"
          v-model="feedbackForm.title"
          placeholder="请输入建议标题"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="user_number">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input
          ref="user_number"
          v-model="feedbackForm.content"
          placeholder="请输入您对学校以及本网站系统的建议吧 ^_^"
          name="user_number"
          type="textarea"
          :rows="12"
          auto-complete="on"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="onSubmit">提交</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
import { addFeedback } from '@/api/api'
export default {
  name: 'PostFeedBack',
  data() {
    const feedbackForm = {
      title: '',
      content: ''
    }
    return {
      feedbackForm,
      loginRules: {
        title: [{ trigger: 'none', message: '请输入建议标题' }],
        content: [{ required: true, trigger: 'none', message: '请输入建议内容' }]

      },
      loading: false,
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
    /**
     * @description 提交监听
     */
    onSubmit() {
      this.$refs.feedbackForm.validate(async(valid) => {
        if (valid) {
          this.loading = true
          const { return_msg } = await addFeedback({
            title: this.feedbackForm.title,
            content: this.feedbackForm.content
          }).catch(() => {
            this.loading = false
          })

          if (return_msg === 'OK') {
            this.$message.success('提交成功')
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

$bg:#fff;
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
    width: 98%;

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

  .el-textarea{
    display: inline-block;
    min-height: 280px;
    width: 100%;

    textarea {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      // height: 47px;
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
  height: calc(100vh - 50px);
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 60px 35px 0;
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
