<template>
  <div class="dashboard-container">
    <div class="dashboard-text">高校学生日常管理系统</div>
    <div class="dashboard-text">欢迎回来: {{ roleName }} {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'userInfo',
      'group_id',
      'roleName'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
