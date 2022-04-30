<template>
  <div class="login-container">
    <el-form ref="vacateApplyForm" :model="vacateApplyForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">请假申请</h3>
      </div>

      <el-form-item prop="schedule_id">
        <!-- <el-select
          v-model="vacateApplyForm.schedule_id"
          style="width:100%"
          placeholder="请选择请假课程"
          no-data-text="暂无数据"
        >
          <el-option
            v-for="item in scheduleStudentList"
            :key="item.class_id"
            :label="item.course_name"
            :value="item.class_id"
            style="width:100%"
          />
        </el-select> -->
        <el-cascader
          v-model="vacateApplyForm.schedule_id"
          :options="scheduleStudentList"
          :props="scheduleProps"
          placeholder="请选择需要请假的课程"
          style="width:100%;"
          :multiple="false"
          @change="onChangeSchedule"
        />

      </el-form-item>

      <el-form-item prop="content">
        <el-input
          ref="content"
          v-model="vacateApplyForm.content"
          placeholder="请输入请假原因"
          name="user_number"
          type="textarea"
          :rows="6"
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
import { apply, scheduleStudentList } from '@/api/api'
export default {
  name: 'PostFeedBack',
  data() {
    const vacateApplyForm = {
      // 课程id
      schedule_id: '',
      reason: ''
    }
    return {
      vacateApplyForm,
      loginRules: {
        title: [{ required: true, trigger: 'blur', message: '请输入建议标题' }],
        content: [{ required: true, trigger: 'none', message: '请输入建议内容' }],
        type: [{ required: true, trigger: 'none', message: '请选择发送目标' }]
      },

      // 学生课程表
      scheduleStudentList: [],
      loading: false,
      redirect: undefined,
      scheduleProps: {
        label: 'label',
        children: 'children',
        value: 'schedule_id'
      }
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
    this.getScheduleStudentList()
  },
  methods: {
    /**
     * @description 提交监听
     */
    onSubmit() {
      this.$refs.vacateApplyForm.validate(async(valid) => {
        if (valid) {
          this.loading = true
          const { return_msg } = await apply({
            schedule_id: this.vacateApplyForm.schedule_id[1],
            reason: this.vacateApplyForm.content
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
    },
    /**
     * @description 获取课程列表
     */
    async getScheduleStudentList() {
      const { data, return_msg } = await scheduleStudentList()

      if (return_msg === 'OK') {
        const selectList = []

        // 过滤相同的年月日
        data.forEach(scheduleItem => {
          const [dateYMD, dateHMS] = scheduleItem.start_time.split(' ')
          scheduleItem.dateYMD = dateYMD
          scheduleItem.dateHMS = dateHMS

          const findItemIndex = selectList.findIndex(selectItem => {
            const [selDateYMD, selDateHMS] = selectItem.start_time.split(' ')
            selectItem.dateYMD = selDateYMD
            selectItem.dateHMS = selDateHMS

            if (selDateYMD === dateYMD) {
              return true
            } else {
              return false
            }
          })

          const childLabel = `${scheduleItem.dateHMS}-${scheduleItem.end_time.split(' ')[1]} ${scheduleItem.course_name}`
          // 孩子节点
          if (findItemIndex !== -1) {
            scheduleItem.label = childLabel
            selectList[findItemIndex].children.push({ ...scheduleItem })
          } else {
            // 顶层节点
            scheduleItem.label = scheduleItem.dateYMD
            if (!scheduleItem.children) {
              scheduleItem.children = []
              scheduleItem.children[0] = { ...scheduleItem, label: childLabel, children: undefined }
            }
            selectList.push({ ...scheduleItem })
          }
        })
        this.scheduleStudentList = selectList
      }
    },

    onChangeSchedule() {

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
  overflow-y: scroll;

  .login-form {
    position: relative;
    width: 80%;
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
