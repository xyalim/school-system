<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.studentname }}
        </template>
      </el-table-column>
      <el-table-column label="所属班级" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.class_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假课程" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.course_name }}
        </template>
      </el-table-column>
      <el-table-column label="备课老师" align="center" width="110">
        <template slot-scope="scope">
          {{ scope.row.teachername }}
        </template>
      </el-table-column>
      <el-table-column label="请假原因" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.reason }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="申请进度" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusTextFilter }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="请假申请时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.apply_time }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="roleName !== '学生'" label="申请处理" align="center" prop="created_at">
        <template slot-scope="scope">
          <el-button @click="onClickEditApply(scope.row.vacate_id)">编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { vacateList, vacateInfo } from '@/api/api'
import { mapGetters } from 'vuex'
export default {
  filters: {

    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
        0: 'gray',
        1: 'success',
        2: 'danger',
        3: 'danger',
        4: 'gray',
        5: 'success',
        6: 'danger',
        7: 'danger'
      }
      return statusMap[status]
    },

    statusTextFilter(status) {
      const statusMap = {
        0: '申请中',
        1: '申请成功',
        2: '申请失败-老师拒绝',
        3: '申请失败-教学管理者拒绝',
        4: '二次申请中',
        5: '二次申请成功',
        6: '二次申请失败-老师拒绝',
        7: '二次申请失败-教学管理者拒绝'
      }
      return statusMap[status]
    }
  },
  computed: {
    ...mapGetters([
      'roleName',
      'name'
    ])
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { data, return_msg } = await vacateList()
        .catch(() => {
          this.listLoading = false
        })
      if (return_msg === 'OK') {
        this.list = data
        this.listLoading = false
      }
      this.listLoading = false
    },

    /**
   * @description 编辑请假申请
   */
    async onClickEditApply(vacate_id) {
      const { data, return_msg } = await vacateInfo({ vacate_id })
      console.log(data, return_msg)
    }

  }
}
</script>
