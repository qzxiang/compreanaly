<template>
  <div class="ios-detail">
    <Steps class="steps" :steps="steps" @floor="jump"></Steps>
    <div class="title">
      <span>应用检测报告</span>
      <!-- <img src="../image/out.jpg" style="cursor:pointer;" height="31" width="31"> -->
    </div>
    <div class="title-detail">
      <el-row class="list-item">
        <el-col :span="2" class="logo-wrapper">
          <img :src="defaultImg" class="avatar" >
        </el-col>
        <el-col :span="22">
          <el-row class="appname">
            <span>文件名称：{{detail.filename}}</span>
            <span class="blue"></span>
          </el-row>
          <el-row class="item">
            <el-col :span="8">应用名：{{detail.appname}}</el-col>
            <el-col :span="8">MD5：{{detail.md5}}</el-col>
          </el-row>
          <el-row class="item">
            <el-col :span="8">平台类型：{{detail.platform}}</el-col>
            <el-col :span="8">文件格式：Ipa</el-col>
          </el-row>
          <el-row class="item">
            <el-col :span="8">开始分析时间：{{detail.begin_time}}</el-col>
            <el-col :span="8">完成分析时间：{{detail.end_time}}</el-col>
            <el-col :span="4" v-if="detail.consume_time_minute || detail.consume_time_second">时长： {{detail.consume_time_minute}}分{{detail.consume_time_second}}秒</el-col>
            <el-col :span="4" v-else>时长：1秒</el-col>
            <el-col :span="4">分析人员：{{detail.username}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <Detail-Box :box-title="'文件信息'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state_engine || detail.state_engine == 0 || detail.state_engine == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state_engine == 2">
            <el-row class="detail-desc">
              <el-col :span="4">文件格式</el-col>
              <el-col :span="20">Ipa</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">平台类型</el-col>
              <el-col :span="20" v-if="detail.platform">{{detail.platform}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">MD5</el-col>
              <el-col :span="20" v-if="detail.md5">{{detail.md5}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">SHA1</el-col>
              <el-col :span="20" v-if="detail.sha1">{{detail.sha1}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">CRC32</el-col>
              <el-col :span="20" v-if="detail.crc32">{{detail.crc32}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">文件大小</el-col>
              <el-col :span="20" v-if="detail.filesize">{{size}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">创建日期</el-col>
              <el-col :span="20" v-if="detail.begin_time">{{detail.begin_time}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            </el-row>
          </div>
          <div v-else class="error">
          {{state_engine_text}}
          </div>
        </div>
      </Detail-Box>
      <Detail-Box :box-title="'应用信息'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state_engine || detail.state_engine == 0 || detail.state_engine == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state_engine == 2">
            <el-row class="detail-desc">
              <el-col :span="4">应用名称</el-col>
              <el-col :span="20" v-if="detail.appname">{{detail.appname}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">应用标识</el-col>
              <el-col :span="20" v-if="detail.appidentifier">{{detail.appidentifier}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">版本号</el-col>
              <el-col :span="20" v-if="detail.version">{{detail.version}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">开发者团队标识</el-col>
              <el-col :span="20" v-if="detail.teamidentify">{{detail.teamidentify}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">发布者信息</el-col>
              <el-col :span="20" v-if="detail.authority">{{detail.authority}}</el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
          </div>
          <div v-else class="error">
          {{state_engine_text}}
          </div>
        </div>
      </Detail-Box>
      <Detail-Box :box-title="'敏感信息'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state_engine || detail.state_engine == 0 || detail.state_engine == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state_engine == 2">
            <el-row class="detail-desc">
              <el-col :span="4">行为</el-col>
              <el-col :span="20" v-if="detail.behaviors && detail.behaviors.length > 0">
                <el-row v-for="item in detail.behaviors" key="item">{{item}}</el-row>
              </el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">网址</el-col>
              <el-col :span="20" v-if="detail.urls && detail.urls.length > 0">
                <el-row v-for="item in detail.urls" key="item">{{item}}</el-row>
              </el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">电话</el-col>
              <el-col :span="20" v-if="detail.phones && detail.phones.length > 0">
                <el-row v-for="item in detail.phones" key="item">{{item}}</el-row>
              </el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">邮箱</el-col>
              <el-col :span="20" v-if="detail.emails && detail.emails.length > 0">
                <el-row v-for="item in detail.emails" key="item">{{item}}</el-row>
              </el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">文件路径</el-col>
              <el-col :span="20" v-if="detail.filepaths && detail.filepaths.length > 0">
                <el-row v-for="item in detail.filepaths" key="item">{{item}}</el-row>
              </el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">shell命令</el-col>
              <el-col :span="20" v-if="detail.shellcommands && detail.shellcommands.length > 0">
                <el-row v-for="item in detail.shellcommands" key="item">{{item}}</el-row>
              </el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
          </div>
          <div v-else class="error">
          {{state_engine_text}}
          </div>
        </div>
      </Detail-Box>
      <Detail-Box :box-title="'可执行文件'" class="floor">
        <el-button slot="more" v-if="detail.state_engine == 2 && detail.entrypoints && detail.entrypoints.length > 5" @click="moreEntrypoints" size="mini" type="primary">
          <span v-if="!more_entrypoints">展示全部</span>
          <span v-else>收起</span>
        </el-button>
        <div slot="file">
          <div class="loading" v-if="!detail.state_engine || detail.state_engine == 0 || detail.state_engine == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state_engine == 2">
            <div v-if="detail.entrypoints && detail.entrypoints.length > 0">
              <el-row class="detail-desc" v-for="item in entrypoints" key="item">
                {{item}}
              </el-row>
            </div>
            <el-row v-else class="detail-desc">
              暂无数据
            </el-row>
          </div>
          <div v-else class="error">
          {{state_engine_text}}
          </div>
        </div>
      </Detail-Box>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/Layout/PageTitle'
import DetailBox from '../components/Layout/DetailBox'
import Loading from '../components/Utils/Loading'
import Steps from '../components/Detail/Steps'
import {formatDate} from '../config/utils'
import {bytesToSize} from '../config/utils'
import {state_engine} from '../config/translate'
import router from '../router'
import ipa from '../image/Ipa.jpg'

export default {
  data () {
    return {
      detail: {},
      steps: {
        active: 0,
        step: [
        "文件信息",
        "应用信息",
        "敏感信息",
        "可执行文件",
        ]
      },
      state_engine_text: '',
      wait_text: "等待结果中",
      more_entrypoints: false,
      entrypoints: [],
      defaultImg: ipa,
    }
  },
  components: {
    PageTitle,
    DetailBox,
    Loading,
    Steps
  },
  created() {
    this.init()
  },
  mounted: function () {
    this.$nextTick(() => {
      document.getElementById('page').addEventListener('scroll', this.handleScroll)
    });
  },
  computed: {
    size() {
      if(this.detail.filesize){
        return bytesToSize(this.detail.filesize);
      }else{
        return ""
      }
    }
  },
  methods: {
    init() {
      this.fetchData()
    },
    //获取详情页面数据
    fetchData() {
      let timeout = 60000
      this.state_engine_arr = state_engine()
      this.$get( '/api/analysisreport/'+ this.$route.query.id + '/',"",timeout)
      .then((response) => {
        this.detail = response
        if(this.detail.entrypoints){
          this.entrypoints = this.detail.entrypoints.slice(0, 5)
        }
        this.state_engine_text = "静态分析错误：" + this.state_engine_arr[this.detail.state_engine]
        this.detail.consume_time_minute = parseInt((this.detail.end_time - this.detail.begin_time) / 60)
        this.detail.consume_time_second = (this.detail.end_time - this.detail.begin_time) % 60
        this.detail.begin_time = formatDate(this.detail.begin_time)
        this.detail.end_time = formatDate(this.detail.end_time)
      }).catch((err) => {
        console.log(err)
      })
    },
    /*点击步骤条动态锚点*/
    jump (index) {
      this.steps.active = index
      let jump = document.querySelectorAll('.floor')
      // 获取需要滚动的距离
      let total = jump[index].offsetTop + 40
      // 获取滚动条拖动的距离
      let distance = document.getElementById('page').scrollTop
      let step = total / 50
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total
          step = newTotal / 50
          smoothUp()
        }
        function smoothDown () {
          if (distance < total) {
            distance += step
            document.getElementById('page').scrollTop = distance
            setTimeout(smoothDown, 5)
          } else {
            document.getElementById('page').scrollTop = total
          }
        }
        function smoothUp () {
          if (distance > total) {
            distance -= step
            document.getElementById('page').scrollTop = distance
            setTimeout(smoothUp, 5)
          } else {
            document.getElementById('page').scrollTop = total
          }
       }
    },
    //滚动激活步骤条
    handleScroll () {
      let scrolled = document.getElementById('page').scrollTop
      let jump = document.querySelectorAll('.floor')
      let arr = []
      for (var i = 0; i < jump.length; i++) {
        arr[i] = jump[i].offsetTop + 40
      };
      // 手动获取到各个锚点的距离
      if (scrolled >= arr[3]) {
        this.steps.active = 3
      } else if (scrolled < arr[3] && scrolled >= arr[2]) {
        this.steps.active = 2
      } else if (scrolled < arr[2] && scrolled >= arr[1]) {
        this.steps.active = 1
      } else {
        this.steps.active = 0
      }
    },
    moreEntrypoints() {
      this.more_entrypoints = !this.more_entrypoints
      if(this.more_entrypoints == true){
        this.entrypoints = this.detail.entrypoints
      }else{
        this.entrypoints = this.detail.entrypoints.slice(0, 5)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../style/mixin';
@import '../style/common';

.ios-detail{
  word-break: break-all;
  @media screen{
    @media(min-width:768px){
      padding-right: 200px;
    }
    @media(max-width:767px){
      padding-right: 50px;
    }
  }
  .title{
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 25px;
    font-size: 22px;
    font-weight: 700;
    color: #666666;
    img{
      margin-left: 10px;
    }
    .to-search{
      margin-left:25px;
      cursor: pointer;
    }
  }
  .title-detail{
    margin: 0 10px;
    .list-item{
      margin: 20px 0;
      .logo-wrapper{
        min-width: 60px;
      }
      .avatar{
        width: 80%;
        border-radius: 20%;
        border: 1px solid #ccc;
      }
      .appname{
        margin-bottom: 10px;
        font-size: 18px;
      }
      .item{
        margin-bottom: 15px;
        font-size: 14px;
      }
    }
  }
  .list{
    margin: 0 10px;
    overflow: auto;
    .loading{
      padding: 10px 0;
    }
    .error{
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: red;
    }
  }
  .steps{
    @media screen{
      position: fixed;
      top: 50%;
      transform: translate(0,-50%);
      right: 50px;
      @media(max-height:300px){
        display: none;
      }
    }
  }
  /* .steps{
    @media screen{
      position: fixed;
      bottom: 40%;
      right: 3%;
      height: 20%;
      width: 8%;
      .el-step{
        cursor: pointer;
        .el-step__title{
          font-size: 14px;
        }
      }
      @media(min-width:1367px) and (max-width:1601px){
        bottom: 35%;
        right: 4%;
        height: 25%;
        width: 8%;
        .el-step{
          .el-step__title{
            font-size: 12px;
          }
        }
      }
      @media(min-width:1100px) and (max-width:1366px){
        bottom: 30%;
        right: 5%;
        height: 30%;
        width: 8%;
        .el-step{
          .el-step__title{
            font-size: 12px;
          }
        }
      }
      @media(max-width:1099px){
        bottom: 25%;
        right: 5%;
        height: 35%;
        width: 8%;
        .el-step{
          .el-step__title{
            display: none;
          }
        }
      }
    }
  } */
}
</style>
