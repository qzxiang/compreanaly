<template>
  <div class="appsearch">
    <PageTitle>
      <i slot="back" class="el-icon-back search-back" @click="back" v-if="show"></i>
    </PageTitle>
    <div :class="{'searchbox': true, 'center': !show }">
      <el-row>
        <el-col :span="18">
          <el-input v-model="search" @keyup.enter.native="tosearch" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="tosearch">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <div class="search-method">
            <el-button type="text" @click="dialogTableVisible = true">查询方法</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" class="search-data">
          <a v-for="item in gridData" @click="toggleInput(item.rule)">{{item.target}}</a>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="target" label="搜索对象" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="搜索语法" width="200" show-overflow-tooltip>
          <template slot-scope="scope">
            <a @click="toggleInput(scope.row.rule)">{{ scope.row.rule }}</a>
          </template>
        </el-table-column>
        <el-table-column label="搜索示例" show-overflow-tooltip>
          <template slot-scope="scope">
            <a @click="toggleInput(scope.row.example)">{{ scope.row.example }}</a>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div class="search-result"
      v-if="show"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading">
      <div class="wrapper">
        <div class="result-count">
          为您找到相关结果约：<span>{{items.length}}</span>个
        </div>
        <ul>
          <li v-for="(item, index) in newitems" class="result-list" v-if="item.fileformat">
            <el-row class="result-item">
              <el-row>
                <el-col :span="2" class="avatar">
                  <img :src="item.logo" :onerror="defaultApk" v-if="item.fileformat.toLowerCase() == 'apk'">
                  <img :src="defaultIpa" v-else-if="item.fileformat.toLowerCase() == 'ipa'">
                </el-col>
                <el-col :span="22" class="list-item">
                  <el-row class="title">{{item.appname}}</el-row>
                  <el-row class="item" >
                    <el-col :span="8">MD5：{{item.md5}}</el-col>
                    <el-col :span="12">文件类型：<b>{{item.fileformat}}</b></el-col>
                    <el-col :span="4" class="detail">
                      <a @click="viewMore(item.fileformat, item.id)" v-if="item.fileformat">样本详情</a>
                    </el-col>
                  </el-row>
                  <el-row class="item" >
                    <el-col :span="8">包名：{{item.packagename}}</el-col>
                    <el-col :span="12">开发者：{{item.issuer}}</el-col>
                    <el-col :span="4">版本号：{{item.version}}</el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="result-highlight" v-if="item.highlight">
                <el-row class="highlight" v-for="(name,index) in highlightData" key="index" v-if="item.highlight[name.rule]">
                  <el-col :span="2" class="title">{{name.target}}:</el-col>
                  <el-col :span="22">
                    <Highlight :highlight="item.highlight[name.rule]"></Highlight>
                  </el-col>
                </el-row>
              </el-row>
            </el-row>
          </li>
        </ul>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="items.length"
        prev-text="上页"
        next-text="下页"
        class="search-pagination"
        v-show="items.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/Layout/PageTitle'
import Highlight from '../components/Search/Highlight'
import {baseUrl} from '@/config/env'
import apk from '../image/apk.jpg'
import ipa from '../image/Ipa.jpg'

export default {
  name: 'AppSearch',
  data () {
    return {
      show: false,
      loading: false,
      currentPage: 1,
      pageSize: 5,
      search: '',
      postSearch: '',
      searchAll: true,
      gridData: [{
        target: '应用名',
        rule: 'appname=',
        example: 'appname=共享单车'
      }, {
        target: '包名',
        rule: 'packagename=',
        example: 'packagename=com.danche.com'
      }, {
        target: 'md5',
        rule: 'md5=',
        example: 'md5=FE91BB19E91E77EA52F9D01F8A563BE5'
      }, {
        target: '开发者',
        rule: 'issuer=',
        example: 'issuer=danche'
      }, {
        target: '支付件',
        rule: 'payware=',
        example: 'payware=PayWare/Android.upay.a[pay,gen]'
      }, {
        target: '广告件',
        rule: 'adware=',
        example: 'adware=AdWare/Android.BaiduAd.b[ads,gen]'
      },{
        target: '权限',
        rule: 'permissions=',
        example: 'permissions=android.permission.CAMERA'
      }, {
        target: '漏洞',
        rule: 'securityflaws=',
        example: 'securityflaws=权限不足'
      }, {
        target: 'URL',
        rule: 'url=',
        example: 'url=http://lbs.amap.com/api/android-location-sdk/guide/utilities/errorcode'
      }, {
        target: 'IP',
        rule: 'ip=',
        example: 'ip=114.125.163.21'
      }, {
        target: 'FTP',
        rule: 'ftp=',
        example: 'ftp=89.186.66.90'
      }, {
        target: '邮箱',
        rule: 'email=',
        example: 'email=test@qq.com'
      }, {
        target: '号码',
        rule: 'phone=',
        example: 'phone=13652632356'
      }],
      highlightData: [{
        target: '应用名',
        rule: 'appname',
      }, {
        target: '包名',
        rule: 'packagename',
      }, {
        target: 'md5',
        rule: 'md5',
      }, {
        target: '开发者',
        rule: 'issuer',
      }, {
        target: '支付件',
        rule: 'payware',
      }, {
        target: '广告件',
        rule: 'adware',
      }, {
        target: '权限',
        rule: 'permissions',
      }, {
        target: '漏洞',
        rule: 'securityflaws.meaning',
      }, {
        target: 'URL',
        rule: 'urlip.url',
      }, {
        target: 'IP',
        rule: 'urlip.ip',
      }, {
        target: 'FTP地址',
        rule: 'ftp.addr',
      }, {
        target: 'FTP用户名',
        rule: 'ftp.user',
      }, {
        target: '邮箱',
        rule: 'emaildata',
      }, {
        target: '号码',
        rule: 'phone',
      }],
      dialogTableVisible: false,
      items: [],
      defaultApk: 'this.src="' + apk + '"',
      defaultIpa: ipa,
    }
  },
  components: {
    PageTitle,
    Highlight
  },
  computed: {
    /*分页方法*/
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    end() {
      return this.currentPage * this.pageSize;
    },
    newitems() {
      return this.items.slice(this.start,this.end);
    }
    /*end*/
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      if(this.$route.query){
        for(var p in this.$route.query){
          let searchname = ""
          if(this.$route.query[p]){
            searchname = p + '=' + this.$route.query[p]
          }else{
            searchname = p
          }
          this.search = searchname
          this.tosearch()
        }
      }
    },
    tosearch() {
      //Added by zk
      //获取详情页面数据
      if(this.search){
        var self = this
        this.show = true
        this.loading = true
        //针对未限制搜索条件的添加全局搜索参数
        this.gridData.every(function(item, index) {
          if(self.search.indexOf(item.rule) == 0){
            self.searchAll = false
            return false
          }
          return true
        })
        if(this.searchAll == true){
          this.postSearch = "all=" +  this.search
        }else{
          this.postSearch = this.search
        }
        this.$router.push({
          path: '/appsearch?' + this.search
        })
        this.$get( baseUrl + '/api/search/?' + this.postSearch + '/')
          .then((response) => {
            let singleObj = {}
            let singleArr = []
            response.message.every(item =>{
              if(Object.keys(singleObj).length == 0){
                singleObj[item.md5] = item
                return true
              }else{
                if( !singleObj[item.md5] || item.id > singleObj[item.md5].id){
                  singleObj[item.md5] = item
                }
                return true
              }
            })
            for (var i in singleObj) {
              singleArr.push(singleObj[i]); //属性
            }
            this.items = singleArr
            //下载Logo图片，以及提取URL
            for (let index = 0; index < this.items.length; index++) {
              //提取URL和域名
              var imageName = ""
              let item = this.items[index]
              imageName = baseUrl + '/download/' + item.md5 + '.' + item.crc32 + '.' + item.taskid + '.' + item.begin_rms_time + '.rms.logo.png'
                this.$set(this.items[index], 'logo', imageName);
            }
            this.loading = false
            this.postSearch = ""
          }).catch((err) => {
            this.loading = false
            this.postSearch = ""
        })
        this.searchAll = true;
      }
    },
    back() {
      this.$router.push({
        path: '/appsearch',
      })
      this.items = []
      this.show = false
      this.search = ""
    },
    /*查看详情方法*/
    viewMore(fileformat, id) {
      if(fileformat.toLowerCase() == "Apk".toLowerCase()){
        this.$router.push({
          path: '/apkdetail',
          query: {
            id: id,
          }
        })
      }else if(fileformat.toLowerCase() == 'ipa'.toLowerCase()){
        this.$router.push({
          path: '/iosdetail',
          query: {
            id: id,
          }
        });
      }
    },
    /*返回页数大小*/
    handleSizeChange(val) {
      this.pageSize = val;
    },
    /*返回当前页数*/
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    /*切换搜索内容*/
    toggleInput(val) {
      this.search = val
      this.dialogTableVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../style/common';

.appsearch{
  word-break: break-all;
  .text-red{
    color: red;
  }
  .search-back{
    margin-left:25px;
    cursor: pointer;
  }
  /* 搜索框居中 */
  .center{
    position: absolute;
    height: 100px;
    width: 800px;
    left: 50%;
    top: 50%;
    padding: 20px;
    font-size: 14px;
    transform: translate(-50%,-50%);
  }
  /* 搜索框 */
  .searchbox{
    /* height: 100px; */
    width: 800px;
    padding: 20px 25px;
    font-size: 14px;
    .el-row{
      margin-bottom: 10px;
    }
    .el-input__inner{
      border-radius: 4px 0 0 4px;
    }
    .el-button{
      border-radius: 0 4px 4px 0;
    }
    .search-method{
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
      span{
        text-decoration: underline;
        color: #108ee9;
        &:hover{
          font-weight: 700;
        }
      }
    }
    .search-data{
      display: flex;
      a{
        display: inline-block;
        /* flex: 1; */
        color: #108ee9;
        text-align: center;
        margin-right: 15px;
        height: 100%;
        line-height: 100%;
        &:hover{
          font-weight: 700;
        }
      }
    }
  }
  /* 搜索结果 */
  .search-result{
    .wrapper{
      margin: 0 auto;
      padding: 0 30px 50px 30px;
      .result-count{
        margin-bottom: 10px;
        padding-left: 5px;
        font-size: 14px;
        color: #666666;
        span{
          color: #cc3300;
          margin-right: 2px;
        }
      }
      .result-list{
        margin-bottom: 15px;
        background: #f2f2f2;
        overflow: hidden;
        .result-item{
          margin-bottom: 0;
          color: #777;
          border: 1px solid #e3e3e3;
          border-radius: 5px;
          .avatar{
            text-align: center;
            padding-top: 30px;
            min-width: 60px;
            img{
              width: 50px;
              height: 50px;
              border-radius: 10px;
            }
          }
          .list-item{
            margin-top: 10px;
            font-size: 14px;
            .title{
              padding: 0 10px;
              font-size: 16px;
              font-weight: 700;
            }
            .item{
              margin: 20px 0;
              .el-col{
                padding: 0 10px;
              }
              .detail{
                color: #108ee9;
                &:hover{
                  font-weight: 700;
                }
              }
            }
          }
        }
        .el-collapse-item__header{
          background-color: #f2f2f2;
          .title{
            text-align: center;
            font-size: 14px;
            color: #a0a0a0;
            font-weight: 700;
          }
        }
        .result-highlight{
          background: #fff;
          margin: 0 20px 10px 20px;
          padding: 5px;
          border: 1px solid #e3e3e3;
          .highlight{
            font-size: 14px;
            color: #333333;
            .title{
              font-weight: 700;
            }
          }
        }
      }
    }
    .search-pagination{
      position: absolute;
      bottom: 0;
      right: 30px;
    }
  }
  /* 查询方法弹出框 */
  .el-dialog{
    width: 70%;
    .el-table{
      thead{
        color: #666666;
        th.is-leaf{
          background: #f3f3f3;
        }
      }
      .el-table__row{
        color: #108ee9;
        td:first-child{
          color: #666666;
        }
      }
    }
  }
}
</style>
