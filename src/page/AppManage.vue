<template>
  <div>
    <div class="appmanage">
      <PageTitle></PageTitle>
      <div class="search">
        <el-form :inline="true" :model="form" class="demo-form-inline" @keyup.enter.native="search">
          <el-col :span="22">
            <el-form-item>
              <el-date-picker
                v-model="form.searchdate"
                type="datetimerange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"
                size="mini">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="文件类型：">
              <el-select v-model="form.fileformat" placeholder="全部" size="mini">
                <el-option label="全部" value=""></el-option>
                <el-option label="apk" value="apk"></el-option>
                <el-option label="ipa" value="ipa"></el-option>
                <el-option label="deb" value="deb"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="form.state" placeholder="全部" size="mini">
                <el-option label="全部" value=""></el-option>
                <el-option label="未开始" value="未开始"></el-option>
                <el-option label="进行中" value="进行中"></el-option>
                <el-option label="已完成" value="已完成"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文件名：">
              <el-input v-model.trim="form.filename" placeholder="请输入" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="投放用户：">
              <el-input v-model.trim="form.username" placeholder="请输入" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="search" size="mini">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="search-result">
        <el-table
          :data="newData"
          v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          @sort-change="sortChange"
          style="width: 100%">
          <el-table-column
            type="index"
            :index= "indexMethod"
            label="ID"
            width="50">
          </el-table-column>
          <el-table-column
            prop="throwtime"
            label="投放时间"
            show-overflow-tooltip
            sortable="custom"
            >
          </el-table-column>
          <el-table-column
            label="文件名"
            show-overflow-tooltip
            >
            <template slot-scope="scope">
              <span v-if="scope.row.stateAll !== '未开始'">{{scope.row.filename}}</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column
            label="文件类型"
            show-overflow-tooltip
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.stateAll !== '未开始'">{{scope.row.fileformat}}</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="md5"
            show-overflow-tooltip
            label="MD5"
            >
          </el-table-column>
          <el-table-column
            label="应用名"
            show-overflow-tooltip
            >
            <template slot-scope="scope">
              <span v-if="scope.row.stateAll !== '未开始'">{{scope.row.appname}}</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="begintime"
            label="开始时间"
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
            prop="endtime"
            label="结束时间"
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
            prop="username"
            label="投放用户"
            show-overflow-tooltip
            sortable="custom"
            >
          </el-table-column>
          <el-table-column
            prop="stateAll"
            label="任务状态"
            show-overflow-tooltip
            >
          </el-table-column>
          <el-table-column
            label="查看详情"
            show-overflow-tooltip
            >
            <template slot-scope="scope">
              <i class="el-icon-document" style="float:left;" @click="viewMore(scope.$index, scope.row)"
              v-if="scope.row.stateAll && scope.row.stateAll != '未开始' && scope.row.fileformat"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="Pagination" v-show="count > 0">
      <div class="pagination-result" v-if="this.start + 1 !== endItem">显示第{{this.start + 1}}至{{endItem}}项结果，共{{count}}项</div>
      <div class="pagination-result" v-else>显示第{{this.start + 1}}项结果，共{{count}}项</div>
      <div class="pagination-button">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10]"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          layout="sizes, prev, pager, next"
          :total="count"
          prev-text="上页"
          next-text="下页">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate,timeChangetype} from '../config/utils'
import PageTitle from '../components/Layout/PageTitle'
import {sortTimeUp, sortTimeDown, sortUserUp, sortUserDown} from '../config/appmanage'
import {state, state_engine, state_ratcher} from '../config/translate'

export default {
  data () {
    return {
      form: {
        username: '',
        fileformat: '',
        state: '',
        filename: '',
        searchdate: '',
      },
      count: 0,
      pagination: false,
      currentPage: 1,
      pageSize: 5,
      show_currentPage: 0,
      show_pageSize: 0,
      tableData: [],
      table: [],
      arr: [0 , 1, 2],
      state_arr: [],
      state_engine_arr: [],
      state_ratcher_arr: [],
      file_arr: [],
      loading: false,
    }
  },
  components: {
    PageTitle
  },
  created() {
    this.init();
  },
  computed: {
    /*分页方法*/
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    end() {
      return this.currentPage * this.pageSize;
    },
    endItem(){
      if(this.end > this.count){
        return this.count
      }else{
        return this.end
      }
    },
    newData(){
      if(this.pagination){
        return this.table.slice(this.start, this.end)
      }else{
        return this.table
      }
    }
  },
  methods: {
    /*初始化函数*/
    init() {
      this.state_arr = state()
      this.state_engine_arr = state_engine()
      this.state_ratcher_arr = state_ratcher()
      if(this.$route.query){
        for(var p in this.$route.query){
          if(p == "search"){
            this.pagination = this.$route.query[p] === "false"? false:true
          }else if(p == "page"){
            this.show_currentPage = parseInt(this.$route.query[p])
            this.currentPage = this.show_currentPage
          }else if(p == "size"){
            this.show_pageSize = parseInt(this.$route.query[p])
          }
        }
      }
      if(this.pagination){
        let get_search = JSON.parse(localStorage.getItem('search'))
        this.form.searchdate = get_search.searchdate;
        this.form.fileformat = get_search.fileformat;
        this.form.state = get_search.state;
        this.form.filename = get_search.filename;
        this.form.username = get_search.username;
        this.search()
      }else{
        this.fetchData();
      }
    },
    /*获取应用列表数据*/
    fetchData() {
      localStorage.removeItem('search')
      this.loading = true
      this.pagination = false
      if(this.show_currentPage > 0 && this.show_pageSize > 0){
        this.currentPage = this.show_currentPage
        this.pageSize = this.show_pageSize
        this.show_currentPage = 0
        this.show_pageSize = 0
      }
      this.$router.push({
        path: '/appmanage',
        query: {
          search: this.pagination,
          page: this.currentPage,
          size: this.pageSize
        }
      })
      this.$get( '/api/task/?ordering=-throw_time&limit='+ this.pageSize + '&offset=' + this.start )
      .then((response) => {
        this.count = response.count
        this.table = response.results
        if(this.table){
          for(let i=0;i<this.table.length;i++){
            //获取当前任务文件名、文件类型等信息
            this.$get( '/api/file/' + this.table[i].fid + '/').then((response) => {
              this.$set(this.table[i], 'filename', response.filename);
              this.$set(this.table[i], 'fileformat', response.fileformat);
              this.$set(this.table[i], 'appname', response.appname)
            }).catch(err => {
              console.log(err);
            })
            if (this.arr.indexOf(this.table[i].state) > -1 && this.arr.indexOf(this.table[i].state_engine) > -1 && this.arr.indexOf(this.table[i].state_ratcher) > -1){
              if(this.table[i].state == 0  && this.table[i].state_engine == 0 && this.table[i].state_ratcher == 0){
              this.$set(this.table[i], 'stateAll', "未开始");
              }else if(this.table[i].state == 2 && this.table[i].state_engine == 2 && this.table[i].state_ratcher == 2){
                this.$set(this.table[i], 'stateAll', "已完成");
              }else{
                this.$set(this.table[i], 'stateAll', "进行中");
              }
            }else if(this.arr.indexOf(this.table[i].state_engine) == -1){
              this.$set(this.table[i], 'stateAll', this.state_engine_arr[this.table[i].state_engine]);
            }else if(this.arr.indexOf(this.table[i].state) == -1){
              this.$set(this.table[i], 'stateAll', this.state_arr[this.table[i].state]);
            }else if(this.arr.indexOf(this.table[i].state_ratcher) == -1){
              this.$set(this.table[i], 'stateAll', this.state_ratcher_arr[this.table[i].state_ratcher]);
            }
            this.table[i].throwtime = formatDate(this.table[i].throw_time);
            this.table[i].begintime = formatDate(this.table[i].begin_time);
            this.table[i].endtime = formatDate(this.table[i].end_time);
          }
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    /*返回页数大小*/
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.$router.push({
        path: '/appmanage',
        query: {
          search: this.pagination,
          page: this.currentPage,
          size: this.pageSize
        }
      })
      if(!this.pagination){
        this.fetchData()
      }
    },
    /*返回当前页数*/
    handleCurrentChange(val) {
      this.currentPage = val
      this.$router.push({
        path: '/appmanage',
        query: {
          search: this.pagination,
          page: this.currentPage,
          size: this.pageSize
        }
      })
      if(!this.pagination){
        this.fetchData()
      }
    },
    /*计算当前列ID*/
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    /*查询方法*/
    search() {
      if(this.show_currentPage > 0 && this.show_pageSize > 0){
        this.currentPage = this.show_currentPage
        this.pageSize = this.show_pageSize
        this.show_currentPage = 0
        this.show_pageSize = 0
      }else{
        this.currentPage = 1
        this.pageSize = 5
      }
      let searchdate = this.form.searchdate;
      let fileformat = this.form.fileformat;
      let state = this.form.state;
      let filename = this.form.filename;
      let username = this.form.username;
      if(filename || username || searchdate || fileformat || state){
        this.loading = true
        this.pagination = true
        let search_item = {"filename": filename,"username":username,"searchdate":searchdate,
        "fileformat":fileformat,"state":state}
        this.$router.push({
          path: '/appmanage',
          query: {
            search: this.pagination,
            page: this.currentPage,
            size: this.pageSize
          }
        })
        localStorage.setItem('search', JSON.stringify(search_item))
        this.$get( '/api/task/?ordering=-throw_time&search=' + username)
        .then((response) => {
          this.table = response.results;
          if(this.table){
            //获取当前任务文件名、文件类型等信息
            this.$get( '/api/file/?search=' + filename).then((response) => {
              this.file_arr = response.results
              let tmap = {}
              this.file_arr.forEach(e=>tmap[e.md5]= e)
              this.table = this.table.filter(ele => {
              if(tmap[ele.md5]){
                if(tmap[ele.md5].filename){
                  this.$set(ele, 'filename', tmap[ele.md5].filename)
                }
                if(tmap[ele.md5].fileformat){
                  this.$set(ele, 'fileformat', tmap[ele.md5].fileformat)
                }
                if(tmap[ele.md5].appname){
                  this.$set(ele, 'appname', tmap[ele.md5].appname)
                }
                ele.throwtime = formatDate(ele.throw_time);
                ele.begintime = formatDate(ele.begin_time);
                ele.endtime = formatDate(ele.end_time);

                if (this.arr.indexOf(ele.state) > -1 && this.arr.indexOf(ele.state_engine) > -1 && this.arr.indexOf(ele.state_ratcher) > -1){
                  if(ele.state == 0  && ele.state_engine == 0 && ele.state_ratcher == 0){
                  this.$set(ele, 'stateAll', "未开始");
                  }else if(ele.state == 2 && ele.state_engine == 2 && ele.state_ratcher == 2){
                    this.$set(ele, 'stateAll', "已完成");
                  }else{
                    this.$set(ele, 'stateAll', "进行中");
                  }
                }else if(this.arr.indexOf(ele.state_engine) == -1){
                  this.$set(ele, 'stateAll', this.state_engine_arr[ele.state_engine]);
                }else if(this.arr.indexOf(ele.state) == -1){
                  this.$set(ele, 'stateAll', this.state_arr[ele.state]);
                }else if(this.arr.indexOf(ele.state_ratcher) == -1){
                  this.$set(ele, 'stateAll', this.state_ratcher_arr[ele.state_ratcher]);
                }
                return true
              }
            })
            let searchNum = 0
            this.table = this.table.filter((item) =>{
              if(this.form.searchdate && !( item.throw_time && item.throw_time >= timeChangetype(this.form.searchdate[0]) && item.throw_time <= timeChangetype(this.form.searchdate[1]))){
                return false;
              }else if(this.form.fileformat && item.fileformat.toLowerCase() !== this.form.fileformat.toLowerCase()){
                return false;
              }else if(this.form.state && item.stateAll !== this.form.state){
                return false;
              }else{
                searchNum++
                return true
              }
            })
            this.count = searchNum
            this.loading = false
            }).catch(err => {
              this.loading = false
            })
          }else{
            this.loading = false
          }
        }).catch(err => {
          this.loading = false
        })
      }else{
        this.pageSize = 5
        this.currentPage = 1
        this.$router.push({
          path: '/appmanage',
          query: {
            search: this.pagination,
            page: this.currentPage,
            size: this.pageSize
          }
        })
        this.fetchData()
      }
    },
    sortChange(data) {
      if(data.order == "descending" && data.prop == "throwtime"){
        this.table = sortTimeDown(this.table)
      }
      if(data.order == "ascending" && data.prop == "throwtime"){
        this.table = sortTimeUp(this.table)
      }
      if(data.order == "descending" && data.prop == "username"){
        this.table = sortUserDown(this.table)
      }
      if(data.order == "ascending" && data.prop == "username"){
        this.table = sortUserUp(this.table)
      }
    },
    /*查看详情方法*/
    viewMore(index, row) {
      const self = this;
      if(row.fileformat.toLowerCase() == 'apk'){
        self.$router.push({
          path: '/apkdetail',
          query: {
            id: row.id
          }
        });
      }else if(row.fileformat.toLowerCase() == 'ipa'){
        self.$router.push({
          path: '/iosdetail',
          query: {
            id: row.id
          }
        });
      }else if(row.fileformat.toLowerCase() == 'deb'){
        self.$router.push({
          path: '/iosdetail',
          query: {
            id: row.id
          }
        });
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../style/common';
.appmanage{
  padding-bottom: 50px;
  /* 搜索框 */
  .search{
    padding: 25px 50px;
    overflow: hidden;
    .el-select{
      width: 120px!important;
    }
  }
  /* 搜索结果表格 */
  .search-result{
    padding: 0 30px;
    .el-table{
      th.is-leaf:last-child{
        text-align: center;
        }
      td:last-child{
        text-align: center;
      }
      .el-icon-document{
        cursor: pointer;
      }
    }
  }
}
/* 分页 */
.Pagination{
  position: absolute;
  bottom: 0;
  right: 30px;
  left: 30px;
  overflow: hidden;
  .pagination-result{
    display:inline-block;
    float: left;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    color: #5a5e66;
  }
  .pagination-button{
    display:inline-block;
    float: right;
    height: 30px;
  }
}
</style>
