<template>
  <div class="login-container">
    <el-form ref="messageForm" :model="messageForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">发送信息</h3>
      </div>

      <el-form-item prop="title">
        <el-input
          ref="username"
          v-model="messageForm.title"
          placeholder="请输入消息标题"
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
          ref="content"
          v-model="messageForm.content"
          placeholder="请输入消息内容"
          name="user_number"
          type="textarea"
          :rows="6"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="type">
        <div style="display:flex; aligin-items:center; justify-content:center;">
          <span style="flex:1;" class="svg-container">
            <!-- <svg-icon icon-class="user" /> -->
            发送目标
          </span>
          <el-select
            ref="user_number"
            v-model="messageForm.type"
            style="width:auto;flex:1"
            placeholder="请选择发送目标"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

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
import { sendMessage } from '@/api/api'
export default {
  name: 'PostFeedBack',
  data() {
    const messageForm = {
      title: '',
      content: '',
      // 1所有学生 2所有教师和学生 3单个班级的所有学生 暂未实现
      type: 1
    }
    return {
      messageForm,
      loginRules: {
        title: [{ required: true, trigger: 'blur', message: '请输入建议标题' }],
        content: [{ required: true, trigger: 'none', message: '请输入建议内容' }],
        type: [{ required: true, trigger: 'none', message: '请选择发送目标' }]
      },

      options: [{
        value: 1,
        label: '所有学生'
      }, {
        value: 2,
        label: '所有教师和学生'
      }],
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
      this.$refs.messageForm.validate(async(valid) => {
        if (valid) {
          this.loading = true
          const { return_msg } = await sendMessage({
            message_title: this.messageForm.title,
            message_content: this.messageForm.content,
            type: this.messageForm.type
          }).catch(() => {
            this.loading = false
          })

          if (return_msg === 'OK') {
            this.$message.success('提交成功')
          }
          this.loading = false
        } else {
          this.loading = false
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
  ::v-deep .el-input {
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

  ::v-deep .el-textarea{
    display: inline-block;
    min-height: 150px;
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
    padding: 30px 35px 0;
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
