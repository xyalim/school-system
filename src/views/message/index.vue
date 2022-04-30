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
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          {{ scope.row.feedback_title }}
        </template>
      </el-table-column>
      <el-table-column label="提交者ID" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="意见内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.feedback_content }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="提交时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { FeedbackList } from '@/api/api'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
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
      const { data } = await FeedbackList()
      console.log(data)
      this.list = data
      this.listLoading = false
    }
  }
}
</script>
