<template>
  <div class="securityflaws-wrapper">
    <p class="title">漏洞统计</p>
    <div class="wrapper" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
      <el-table
        :data="tableData"
        :stripe= "true"
        :header-cell-class-name="setHeader"
        border>
        <el-table-column
          prop="key"
          label="危险名称"
          align="center"
          show-overflow-tooltip
          min-width="40%">
        </el-table-column>
        <el-table-column
          prop="type"
          label="危险类型"
          align="center"
          show-overflow-tooltip
          min-width="20%">
        </el-table-column>
        <el-table-column
          label="危险等级"
          align="center"
          show-overflow-tooltip
          min-width="20%">
          <template slot-scope="scope">
            <span :class="test(scope.row.risklevel)">{{scope.row.risklevel}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="doc_count"
          label="影响应用数量"
          align="center"
          show-overflow-tooltip
          min-width="20%">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getSecurityflaws} from '../../config/statistical'

export default {
  data () {
    return {
      tableData: [],
      loading: true
    }
  },
  props: {

  },
  created(){
    this.init()
  },
  computed: {

  },
  methods: {
    init() {
      this.$get( '/api/statistics/?field=securityflaws.meaning')
      .then((response) => {
        this.loading = false
        this.tableData = getSecurityflaws(response).slice(0, 10)
      }).catch(err => {
        this.loading = false
      })
    },
    test (i) {
      switch (i) {
        case '高危':
          return 'high'
        case '中危':
          return 'medium'
        case '低危':
          return 'low'
      }
    },
    setHeader({row, rowIndex}){
      return "table-head-th"
    }
  }
}
</script>

<style lang="less">
.securityflaws-wrapper{
  margin: 20px 10px;
  border: 1px solid #ebebeb;
  .title{
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 700;
  }
  .wrapper{
    margin: 10px;
    .table-head-th{
      font-size: 14px;
      font-weight: 400;
      padding: 5px 0;
    }
    .el-table--border td:last-child{
      border-right: 0;
    }
    .high{
      color: #dd4b39;
    }
    .medium{
      color: #f39c12;
    }
    .low{
      color: #0073b7;
    }
  }
}
</style>
