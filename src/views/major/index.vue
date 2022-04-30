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
      <el-table-column align="center" label="" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="学院列表">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column type="expand" label="各院专业" width="120">
        <template slot-scope="scope">
          <!-- {{ scope.row.name }} -->
          <el-table
            :data="scope.row.major"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="" width="95">
              <template slot-scope="majorItemScope">
                {{ majorItemScope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="专业id">
              <template slot-scope="majorItemScope">
                {{ majorItemScope.row.major_id }}
              </template>
            </el-table-column>
            <el-table-column label="专业名称">
              <template slot-scope="majorItemScope">
                {{ majorItemScope.row.major_name }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getDepartmentList } from '@/api/api'

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
      const { data } = await getDepartmentList()
      // debugger
      this.list = data
      console.log(this.list)
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      this.listLoading = false
    }
  }
}
</script>
