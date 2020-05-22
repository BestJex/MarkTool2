<template>
  <div class="app-container">
    <el-button
      size="mini"
      type="primary"
    >
      审核任务总览
    </el-button>
    <el-table
      :data="list.slice((page-1)*limit,page*limit)"
      style="width: 98%"
    >
      <!-- <el-table-column
        label="截止时间"
        width="120"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.deadline | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="任务ID"
        min-width="65"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务名称"
        min-width="80"
      >
        <template slot-scope="scope">
          <div
            slot="reference"
            class="missionName-wrapper"
          >
            <span>{{ scope.row.missionName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="任务状态"
        min-width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="已审核条数"
        min-width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.review_progress.finish_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="总审核条数"
        min-width="120"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.review_progress.total_num }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="任务进度"
        min-width="150"
        sortable
      >
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.review_progress.finish_num/scope.row.review_progress.total_num*100" :format="format" />
        </template>
      </el-table-column> -->
      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="mark(scope.$index, scope.row)"
          >
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="list.length>0"
      :total="list.length"
      :current-page="page"
      :page-size="limit"
      layout="total, prev, pager, next, jumper"
      :prev-click="prepage"
      :next-click="nextpage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  // components: { Pagination },
  data() {
    return {
      isdetail: false,
      userid: '',
      list: [
      ],
      page: 1,
      limit: 10
    }
  },
  created() {
    this.userid = this.$store.getters.userid
    this.isdetail = false
    this.getList()
  },
  methods: {
    handleCurrentChange(page) {
      this.page = page
    },
    prepage() {
      this.page--
    },
    nextpage() {
      this.page++
    },
    getList() {
      this.$store.dispatch('reviewer/getreepoch', this.userid).then((response) => {
        this.list = response.reverse()
        for (let i = 0; i < this.list.length; i++) {
          // this.total = this.list.length
          this.$store.dispatch('project/getProject', this.list[i].project).then((response1) => {
            this.list[i].template = response1.template
            this.list[i].missionName = response1.name
            this.$store.dispatch('project/getTemplatedet', response1.template).then((response2) => {
              this.list[i].template_type = response2.template_type
              if (i === this.list.length - 1) {
                this.isdetail = true
                console.log('aaddd', this.list)
              }
            })
          })
        }
      })
    },
    mark(index, row) { // need jump to with mission ID
      // console.log(row)
      // console.log(this.$store.getters.userid)
      // var list = this.$store.dispatch('user/getEpoch')
      // console.log(list)
      if (this.isdetail) {
        this.$router.push({
          path: '/review/reviewing',
          query: {
            template: row.template,
            state: row.state,
            epochid: row.id[0],
            template_type: row.template_type,
            projectid: row.project
          }
        })
      } else {
        this.$message({ message: '请等待数据加载完毕' })
      }
    },
    handleCommit(index) {
      this.list.splice(index, 1)
    },
    addPerson() {
      this.addDialog = false
    },
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    }
  }
}
</script>
<style scoped>
</style>
