<template>
  <div class="sensitives-wrapper">
    <p class="title">敏感信息统计</p>
    <div class="wrapper" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
      <el-table
        :data="tableData"
        :stripe= "true"
        :header-cell-class-name="setHeader"
        border>
        <el-table-column
          prop="key"
          label="敏感信息详情"
          align="center"
          min-width="60%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          min-width="20%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="doc_count"
          label="影响应用数量"
          align="center"
          min-width="20%"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {keyClassify, sort} from '../../config/statistical'
export default {
  data () {
    return {
      tableData: [],
      url: [],
      ip: [],
      ftp: [],
      email: [],
      phone: [],
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
      let self = this
      // 使用 Promise.all 以在数据接口均异步成功后，执行回调逻辑
      this.$axios.all([this.getURl(), this.getIp(), this.getFtp(), this.getEmail(), this.getPhone()])
      .then(this.$axios.spread(function (res1, res2, res3, res4, res5) {
        // 所有请求现在都执行完成
        self.loading = false
        self.url = res1
        self.ip = res2
        self.ftp = res3
        self.email = res4
        self.phone = res5
        keyClassify(self.url, "url")
        keyClassify(self.ip, "ip")
        keyClassify(self.ftp, "ftp")
        keyClassify(self.email, "email")
        keyClassify(self.phone, "phone")
        let urlArr = sort(self.url.concat(self.ip))
        let otherArr = sort(self.ftp.concat(self.email).concat(self.phone))
        let allArr = []
        if(otherArr.length < 5){
          urlArr = urlArr.slice(0, 10 - otherArr.length)
        }else{
          urlArr = urlArr.slice(0, 5)
          otherArr =otherArr.slice(0, 5)
        }
        allArr = sort(urlArr.concat(otherArr))
        self.tableData = allArr
      })).catch(err => {
        self.loading = false
      })
    },
    getURl() {
       return this.$get( '/api/statistics/?field=urlip.url' )
    },
    getIp() {
      return this.$get( '/api/statistics/?field=urlip.ip' )
    },
    getFtp() {
      return this.$get( '/api/statistics/?field=ftp.addr' )
    },
    getEmail() {
      return this.$get( '/api/statistics/?field=email.user' )
    },
    getPhone() {
      return this.$get( '/api/statistics/?field=phone' )
    },
    setHeader({row, rowIndex}){
       return "table-head-th"
    }
  }
}
</script>

<style lang="less">
.sensitives-wrapper{
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
  }
}
</style>
