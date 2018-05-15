<template>
  <div class="apk-detail">
    <!-- 步骤条 -->
    <Steps class="steps" :steps="steps" @floor="jump"></Steps>
    <!-- 标题 -->
    <div class="title">
      <span>应用检测报告</span>
      <!-- <img src="../image/out.jpg" style="cursor:pointer;" height="31" width="31"> -->
    </div>
    <!-- 标题详细信息 -->
    <div class="title-detail">
      <el-row class="list-item">
        <el-col :span="2" class="logo-wrapper">
          <img :src="detail.logo" :onerror="defaultImg" class="avatar" >
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
            <el-col :span="8">平台类型：android</el-col>
            <el-col :span="8">文件格式：{{detail.fileformat}}</el-col>
            <el-col :span="8" v-if="detail.state_ratcher == 2">
              <span>漏洞：</span>
              <span class="red">高危漏洞:{{risksCount.high}}个</span>
              <span>|</span>
              <span class="yellow">中危漏洞:{{risksCount.medium}}个</span>
              <span>|</span>
              <span class="green">低危漏洞:{{risksCount.low}}个</span>
            </el-col>
            <el-col :span="8" class="red" v-else-if="!detail.state_ratcher || detail.state_ratcher == 0 || detail.state_ratcher == 1">等待结果中</el-col>
            <el-col :span="8" class="red" v-else>漏洞模块执行失败</el-col>
          </el-row>
          <el-row class="item">
            <el-col :span="8">开始分析时间：{{detail.begin_time}}</el-col>
            <el-col :span="8">完成分析时间：{{detail.end_time}}</el-col>
            <el-col :span="4" v-if="detail.consume_time_minute || detail.consume_time_second">时长： {{detail.consume_time_minute}}分{{detail.consume_time_second}}秒</el-col>
            <el-col :span="4" v-else>时长：1秒</el-col>
            <el-col :span="4">分析人员：{{detail.username}}</el-col>
          </el-row>
          <el-row class="item download">
              <a :href="'' + detail.avml" v-if="avml_state">下载任务AVML包</a>
              <a :href="'' + detail.static_avml" v-if="static_avml_state">下载静态AVML包</a>
              <a :href="'' + detail.log" v-if="log_state">下载任务LOG包</a>
              <a :href="'' + detail.pcap" v-if="pcap_state">下载任务PCAP包</a>
              <a :href="'' + detail.screen" v-if="screen_state">下载任务截屏包</a>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 文件详细信息 -->
    <div class="list">
      <!-- 文件信息 -->
      <Detail-Box :box-title="'文件信息'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state_engine || detail.state_engine == 0 || detail.state_engine == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state_engine == 2">
            <el-row class="detail-desc">
              <el-col :span="4">文件格式</el-col>
              <el-col :span="20">{{detail.fileformat}}</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">平台类型</el-col>
              <el-col :span="20">android</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">MD5</el-col>
              <el-col :span="20">{{detail.md5}}</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">SHA1</el-col>
              <el-col :span="20">{{detail.sha1}}</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">文件大小</el-col>
              <el-col :span="20">{{size}}</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">创建日期</el-col>
              <el-col :span="20">{{detail.begin_time}}</el-col>
            </el-row>
          </div>
          <div v-else class="error">
          {{state_engine_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- 应用信息 -->
      <Detail-Box :box-title="'应用信息'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state_engine || detail.state_engine == 0 || detail.state_engine == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state_engine == 2">
            <el-row class="detail-desc">
              <el-col :span="4">应用名称</el-col>
              <el-col :span="20">{{detail.appname}}</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">应用包名</el-col>
              <el-col :span="20">{{detail.packagename}}</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">版本号</el-col>
              <el-col :span="20">{{detail.version}}</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">开发者</el-col>
              <el-col :span="20">{{detail.issuer}}</el-col>
            </el-row>
          </div>
          <div v-else class="error">
          {{state_engine_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- 应用插件 -->
      <Detail-Box :box-title="'应用插件'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state_engine || detail.state_engine == 0 || detail.state_engine == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state_engine == 2">
            <el-row class="detail-desc">
              <el-col :span="4">广告件信息</el-col>
              <el-col :span="20" v-if="detail.adware">
                <el-row v-for="(item, index) in detail.adware" :key="index">{{item}}</el-row>
              </el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
            <el-row class="detail-desc">
              <el-col :span="4">支付件信息</el-col>
              <el-col :span="20" v-if="detail.payware">
                <el-row v-for="(item, index) in detail.payware" :key="index">{{item}}</el-row>
              </el-col>
              <el-col :span="20" v-else>暂无数据</el-col>
            </el-row>
          </div>
          <div v-else class="error">
          {{state_engine_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- 应用权限 -->
      <Detail-Box :box-title="'应用权限'" class="floor">
        <el-button slot="more" v-if="detail.state_engine == 2 && detail.permissions && detail.permissions.length > 5" @click="morePermission" size="mini" type="primary">
          <span v-if="!more_permission">展示全部</span>
          <span v-else>收起</span>
        </el-button>
        <div slot="file">
          <div class="loading" v-if="!detail.state_engine || detail.state_engine == 0 || detail.state_engine == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state_engine == 2">
            <el-row class="detail-desc">
              <el-col :span="6"><b>权限名称</b></el-col>
              <el-col :span="18"><b>权限描述</b></el-col>
            </el-row>
            <el-row class="detail-desc" style="margin-bottom:0;">
              <el-col :span="6">
                <el-row v-if="detail.permissions && detail.permissions.length > 0" v-for="(item,index) in permissions" :key="index" style="word-break: break-all;">{{item}}</el-row>
                <el-row v-else>暂无数据</el-row>
              </el-col>
              <el-col :span="18">
                <el-row v-if="detail.tranpermissions && detail.tranpermissions.length > 0" v-for="(item,index) in tranpermissions" :key="index" style="word-break: break-all;">{{item}}</el-row>
                <el-row v-else>暂无数据</el-row>
              </el-col>
            </el-row>
          </div>
          <div v-else class="error">
          {{state_engine_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- 代码片段分析 -->
      <Detail-Box :box-title="'代码片段分析'" class="floor">
        <el-button slot="more" v-if="detail.state_engine == 2 && detail.sensitives && detail.sensitives.length > 5" @click="moreSensitives" size="mini" type="primary">
          <span v-if="!more_sensitives">展示全部</span>
          <span v-else>收起</span>
        </el-button>
        <div slot="file">
          <div class="loading" v-if="!detail.state_engine || detail.state_engine == 0 || detail.state_engine == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state_engine == 2">
            <div v-if="detail.sensitives && detail.sensitives.length > 0">
              <el-row class="detail-desc" >
                <el-col :span="6"><b>敏感字符串</b></el-col>
              </el-row>
              <el-row class="detail-desc"
                v-for="(item, index) in sensitives" :key="index">{{item}}></el-row>
            </div>
            <el-row v-else class="detail-desc">暂无数据</el-row>
          </div>
          <div v-else class="error">
          {{state_engine_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- 病毒分析 -->
      <Detail-Box :box-title="'病毒分析'" class="floor">
        <el-button slot="more" v-if="detail.state == 2 && detail.virusname && detail.virusname.length > 5" @click="moreVirusname" size="mini" type="primary">
          <span v-if="!more_virusname">展示全部</span>
          <span v-else>收起</span>
        </el-button>
        <div slot="file">
          <div class="loading" v-if="!detail.state || detail.state == 0 || detail.state == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state == 2">
            <div v-if="detail.virusname && detail.virusname.length > 0">
              <el-row class="detail-desc">
                <el-col :span="6"><b>病毒名称</b></el-col>
              </el-row>
              <el-row class="detail-desc"
                v-for="(item, index) in virusname" :key="index">{{item}}
              </el-row>
            </div>
            <el-row v-else class="detail-desc" style="color:#399c08">该样本未被感染</el-row>
          </div>
          <div v-else class="error">
          {{state_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- 动态运行附件 -->
      <Detail-Box :box-title="'动态运行附件'" class="floor">
        <el-button slot="more" v-if="detail.state == 2 && detail.attachment && detail.attachment.length > 5" @click="moreAttachment" size="mini" type="primary">
          <span v-if="!more_attachment">展示全部</span>
          <span v-else>收起</span>
        </el-button>
        <div slot="file">
          <div class="loading" v-if="!detail.state || detail.state == 0 || detail.state == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state == 2">
            <Dyn-Annex :attachment="attachment"></Dyn-Annex>
          </div>
          <div v-else class="error">
          {{state_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- 动态关键数据 -->
      <Detail-Box :box-title="'动态关键数据'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state || detail.state == 0 || detail.state == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <div v-else-if="detail.state == 2">
            <Dyn-Key :detail="detail"></Dyn-Key>
          </div>
          <div v-else class="error">
          {{state_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- 动态行为数据 -->
      <Detail-Box :box-title="'动态行为数据'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state || detail.state == 0 || detail.state == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <el-tabs v-else-if="detail.state == 2" type="border-card">
            <el-tab-pane :label="item.text + '(' + item.length + ')'" v-for="(item, index) in dynbehaviors" :key="item.text">
              <Danger @dyRiskHide="getDyRisk" :select-type="index" :type="'dyn'" v-if="item.text != '场景化行为'"></Danger>
              <el-collapse @change="handleChange">
                <DynData :arr="item.arr" :text="item.text"></DynData>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
          <div v-else class="error">
          {{state_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- 动态运行截图 -->
      <Detail-Box :box-title="'动态运行截图'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state || detail.state == 0 || detail.state == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <Images v-else :images="images" :text="photo_text"></Images>
        </div>
        <!-- <span slot="img" class="right more" @click="imgVisible = true" v-show="images.length">更多>></span> -->
      </Detail-Box>
      <!-- 弹出运行截图 -->
      <!-- <el-dialog
        title="选择要在分析报告中展示的截图"
        :visible.sync="imgVisible"
        width="500px">
        <ul class="inside-image">
          <li v-for="img in images" class="inside-image-item">
            <img :src="img.src">
            <el-checkbox v-model="img.checked" style="display:block;"></el-checkbox>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="imgVisible = false">确 定</el-button>
          <el-button @click="imgVisible = false">取 消</el-button>
        </span>
      </el-dialog> -->
      <!-- 安全漏洞检测 -->
      <Detail-Box :box-title="'安全漏洞检测'" class="floor">
        <div slot="file">
          <div class="loading" v-if="!detail.state_ratcher || detail.state_ratcher == 0 || detail.state_ratcher == 1">
            <Loading  :text="wait_text" class="loading"></Loading>
          </div>
          <el-tabs v-else-if="detail.state_ratcher == 2" type="border-card">
            <el-tab-pane :label="item.text + '(' + item.length + ')'" v-for="(item, index) in securityflaws" :key="item.text">
              <Danger @riskHide="getRisk" :select-type="index" :type="'security'"></Danger>
              <el-collapse @change="handleChange">
                <SecurityData :arr="item.arr"></SecurityData>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
          <div v-else class="error">
          {{state_ratcher_text}}
          </div>
        </div>
      </Detail-Box>
      <!-- end -->
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/Layout/PageTitle'
import DetailBox from '../components/Layout/DetailBox'
import Danger from '../components/Detail/Danger'
import SecurityData from '../components/Detail/SecurityData'
import DynAnnex from '../components/Detail/DynAnnex'
import DynData from '../components/Detail/DynData'
import DynKey from '../components/Detail/DynKey'
import Loading from '../components/Utils/Loading'
import Images from '../components/Detail/Images'
import Steps from '../components/Detail/Steps'
import {baseUrl} from '@/config/env'
import {typeClassify, nameClassify, riskClassify, riskCount, dyClassify, scenShow, netShow, formCallstack, clusterDomain, dangerClassify, sortAttachment} from '../config/taskdetail'
import {bytesToSize} from '../config/utils'
import {formatDate, getPermission, tranPermission} from '../config/utils'
import {state, state_engine, state_ratcher} from '../config/translate'
import router from '../router'
import apk from '../image/apk.jpg'

export default {
  data () {
    return {
      //漏洞数据
      securityflaws: [{
        text: "应用数据安全",
        length: 0,
        arr: []
      },{
        text: "组件安全",
        length: 0,
        arr: []
      },{
        text: "权限安全",
        length: 0,
        arr: []
      },{
        text: "加密算法安全",
        length: 0,
        arr: []
      },{
        text: "本地接口安全",
        length: 0,
        arr: []
      }],
      dangers:[{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      }],
      //漏洞危险等级
      risks:[{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      },{
        risk: [true,true,true],
      }],
      //漏洞个数
      risksCount: {
        high: 0,
        medium: 0,
        low: 0
      },
      //动态数据
      dynbehaviors: [{
        text: "场景化行为",
        length: 0,
        arr: []
      },{
        text: "危险行为",
        length: 0,
        arr: []
      },{
        text: "短信行为",
        length: 0,
        arr: []
      },{
        text: "网络行为",
        length: 0,
        arr: []
      },{
        text: "文档操作行为",
        length: 0,
        arr: []
      },{
        text: "CALL/媒体联系人行为",
        length: 0,
        arr: []
      },{
        text: "其他行为",
        length: 0,
        arr: []
      },{
        text: "全部行为",
        length: 0,
        arr: []
      }],
      //截图更多弹窗是否显示
      imgVisible: false,
      //获得接口数据
      detail: {},
      //步骤条
      steps: {
        active: 0,
        step: [
        "文件信息",
        "应用信息",
        "应用插件",
        "应用权限",
        "代码片段分析",
        "病毒分析",
        "动态运行附件",
        "动态关键数据",
        "动态行为数据",
        "动态运行截图",
        "安全漏洞检测"
        ]
      },
      imgName: [],
      images: [],
      defaultImg: 'this.src="' + apk + '"',
      state_text: '',
      state_engine_text: '',
      state_ratcher_text: '',
      photo_text: '',
      state_arr: [],
      state_eng_arr: [],
      state_ratcher_arr: [],
      wait_text: "等待结果中",
      picAcitve: false,
      more_permission: false,
      more_attachment: false,
      more_sensitives: false,
      more_virusname: false,
      attachment: [],
      sensitives: [],
      permissions: [],
      virusname: [],
      tranpermissions: [],
      avml_state: false,
      static_avml_state: false,
      log_state: false,
      pcap_state: false,
      screen_state: false,
      fetch_url: '',
      screen_url: '',
      img_url: '',
    }
  },
  components: {
    PageTitle,
    DetailBox,
    Danger,
    SecurityData,
    DynAnnex,
    DynKey,
    DynData,
    Loading,
    Images,
    Steps
  },
  created() {
    this.init()
  },
  mounted: function () {
    this.$nextTick(() => {
      //绑定滚动事件
      document.getElementById('page').addEventListener('scroll', this.handleScroll)
    });
  },
  computed: {
    size() {
      if(this.detail.filesize){
        return bytesToSize(this.detail.filesize)
      }else{
        return ""
      }
    }
  },
  watch: {
    /*监听id的变化，执行reload函数*/
    "$route.query.id": "reload",
    "$route.query.md5": "reload",
    /*监听risks变化，改变securityflaws，需要使用set更新DOM*/
    risks: {
      handler(newValue, oldValue) {
        if(this.detail.securityflaws){
          for(let i=0;i<this.risks.length;i++){
            //根据type对数组分类
            let newarr = typeClassify(this.detail.securityflaws,this.securityflaws[i].text);
            //根据risklevel对数组分类
            newarr = riskClassify(newarr, this.risks[i].risk)
            //根据name对数组分类
            this.$set(this.securityflaws[i], 'arr', nameClassify(newarr));
          }
        }
      },
      deep: true
    },
    dangers: {
      handler(newValue, oldValue) {
        if(this.dynbehaviors){
          for(let i=1;i<this.dangers.length;i++){
            let typetext = this.dynbehaviors[i].text
            let newarr = dyClassify(this.detail.dynbehaviors, this.dynbehaviors[i].text);
            this.$set(this.dynbehaviors[i], 'arr', dangerClassify(newarr, this.dangers[i].risk));
            if(this.dynbehaviors[i].text == "网络行为"){
              this.$set(this.dynbehaviors[i], 'arr', clusterDomain(this.dynbehaviors[i].arr));
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    init() {
      if(this.$route.query){
        for(var p in this.$route.query){
          if(p === "id"){
            this.fetch_url = '/api/analysisreport/'+ this.$route.query.id + '/'
            this.screen_url = '/api/screen/?id='+ this.$route.query.id
            this.img_url = baseUrl + '/api/screen/'+ this.$route.query.id + '/?imagename='
          }else if(p === "md5"){
            this.fetch_url = '/api/classicalapp/'+ this.$route.query.md5 + '/'
            this.screen_url = '/api/screen/?md5='+ this.$route.query.md5
            this.img_url = baseUrl + '/api/screen/'+ this.$route.query.md5 + '/?imagename='
          }
        }
      }
      this.fetchData()
      this.getImg()
    },
    reload() {
      router.go(0)
    },
    /*获取详情页面数据*/
    fetchData() {
      this.state_arr = state()
      this.state_engine_arr = state_engine()
      this.state_ratcher_arr =state_ratcher()
      let timeout = 60000
      this.$get(this.fetch_url,"",timeout)
      .then((response) => {
        this.detail = response
        if(this.detail.attachment){
          this.detail.attachment = sortAttachment(this.detail.attachment)
          this.attachment = this.detail.attachment.slice(0, 5)
        }
        if(this.detail.sensitives){
          this.sensitives = this.detail.sensitives.slice(0, 5)
        }
        if(this.detail.virusname){
          this.virusname = this.detail.virusname.slice(0, 5)
        }
        this.state_text = "动态分析错误：" + this.state_arr[this.detail.state]
        this.state_engine_text = "静态分析错误：" + this.state_engine_arr[this.detail.state_engine]
        this.state_ratcher_text = "漏洞分析错误：" + this.state_ratcher_arr[this.detail.state_ratcher]
        this.detail.logo = baseUrl + '/download/' + response.md5 + '.' + response.crc32 + '.' + response.taskid + '.' + response.begin_rms_time + '.rms.logo.png'
        if(response.md5 && response.crc32 && response.taskid && response.begin_rms_time){
          this.detail.avml = baseUrl + '/download/' + response.md5 + '.' + response.crc32 + '.' + response.taskid + '.' + response.begin_rms_time + '.rms.avml'
          this.detail.log = baseUrl + '/download/' + response.md5 + '.' + response.crc32 + '.' + response.taskid + '.' + response.begin_rms_time + '.rms.log'
          this.detail.pcap = baseUrl + '/download/' + response.md5 + '.' + response.crc32 + '.' + response.taskid + '.' + response.begin_rms_time + '.rms.pcap'
          this.detail.screen = baseUrl + '/download/' + response.md5 + '.' + response.crc32 + '.' + response.taskid + '.' + response.begin_rms_time + '.rms.screen.cap.zip'
          this.getDownload()
        }
        if(response.md5 && response.crc32 && response.id){
          this.detail.static_avml = baseUrl + '/download/' + response.md5 + '.' + response.crc32 + '.' + response.id + '.avml'
          this.getAVML()
        }
        if(this.detail.begin_time && this.detail.end_time){
          this.detail.consume_time_minute = parseInt((this.detail.end_time - this.detail.begin_time) / 60)
          this.detail.consume_time_second = (this.detail.end_time - this.detail.begin_time) % 60
        }
        if(this.detail.begin_time){
          this.detail.begin_time = formatDate(this.detail.begin_time)
        }
        if(this.detail.end_time){
          this.detail.end_time = formatDate(this.detail.end_time)
        }
        if(this.detail.permissions){
          this.detail.permissions = getPermission(this.detail.permissions)
          this.detail.tranpermissions = tranPermission(this.detail.permissions)
          this.permissions = this.detail.permissions.slice(0, 5)
          this.tranpermissions = this.detail.tranpermissions.slice(0, 5)
        }
        if(this.detail.dynbehaviors){
          this.detail.dynbehaviors.push.apply(this.detail.dynbehaviors, this.detail.netbehaviors);
          this.detail.dynbehaviors = formCallstack(this.detail.dynbehaviors)
        }
        this.classify();
      }).catch(err => {
        console.log(err);
      })
    },
    //判断下载按钮状态
    getDownload() {
      this.$axios.get(this.detail.avml)
      .then((response) => {
        this.avml_state = true
      }).catch(err => {

      })
      this.$axios.get(this.detail.log)
      .then((response) => {
        this.log_state = true
      }).catch(err => {

      })
      this.$axios.get(this.detail.pcap)
      .then((response) => {
        this.pcap_state = true
      }).catch(err => {

      })
      this.$axios.get(this.detail.screen)
      .then((response) => {
        this.screen_state = true
      }).catch(err => {

      })
    },
    getAVML(){
      this.$axios.get(this.detail.static_avml)
      .then((response) => {
        this.static_avml_state = true
      }).catch(err => {

      })
    },
    getImg() {
      //获取截图
      this.$get(this.screen_url)
      .then((response) => {
        this.imgName = response.filenames
        if(this.imgName){
          this.imgName.forEach((e)=>{
            let imageName = this.img_url + e
            this.images.push({src: imageName, checked: true})
          })
        }
      }).catch(err => {
        this.photo_text = "暂无截图"
      })
    },
    /*数据分类*/
    classify() {
      if(this.detail.securityflaws){
        this.risksCount = riskCount(this.detail.securityflaws);
        for(let i=0;i<this.securityflaws.length;i++){
          //根据type对漏洞数据分类
          let newarr = typeClassify(this.detail.securityflaws,this.securityflaws[i].text);
          //根据name对漏洞数据分类
          this.securityflaws[i].arr = nameClassify(newarr);
          //更新漏洞中每个类别个数
          this.securityflaws[i].length = Object.keys(nameClassify(newarr)).length;
        }
      }

      if (this.detail.dynbehaviors) {
        for (let i = 0; i < this.dynbehaviors.length; i++) {
          //场景化和网络行为单独处理；
          let typetext = this.dynbehaviors[i].text
          if (typetext === '场景化行为') {
            this.dynbehaviors[i].length = this.detail.scenbehaviors.length
            this.dynbehaviors[i].arr = this.detail.scenbehaviors
            scenShow(this.detail.scenbehaviors)
            continue
          }
          //对动态数据进行处理
          let newarr = dyClassify(this.detail.dynbehaviors, this.dynbehaviors[i].text);
          this.dynbehaviors[i].arr = newarr;
          this.dynbehaviors[i].length = this.dynbehaviors[i].arr.length;
          if(this.dynbehaviors[i].text == "网络行为"){
            this.dynbehaviors[i].arr = clusterDomain(this.dynbehaviors[i].arr)
          }
        }
      }
    },
    /*监听折叠面板高度*/
    handleChange() {
      this.handleScroll();
    },
    /*滚动激活步骤条*/
    handleScroll() {
      let scrolled = document.getElementById('page').scrollTop
      let jump = document.querySelectorAll('.floor')
      let arr = []
      for (var i = 0; i < jump.length; i++) {
        arr[i] = jump[i].offsetTop + 40
      };
      // 手动获取到各个锚点的距离
      if (scrolled >= arr[10]) {
        this.steps.active = 10
      } else if (scrolled < arr[10] && scrolled >= arr[9]) {
        this.steps.active = 9
      } else if (scrolled < arr[9] && scrolled >= arr[8]) {
        this.steps.active = 8
      } else if (scrolled < arr[8] && scrolled >= arr[7]) {
        this.steps.active = 7
      } else if (scrolled < arr[7] && scrolled >= arr[6]) {
        this.steps.active = 6
      } else if (scrolled < arr[6] && scrolled >= arr[5]) {
        this.steps.active = 5
      } else if (scrolled < arr[5] && scrolled >= arr[4]) {
        this.steps.active = 4
      } else if (scrolled < arr[4] && scrolled >= arr[3]) {
        this.steps.active = 3
      } else if (scrolled < arr[3] && scrolled >= arr[2]) {
        this.steps.active = 2
      } else if (scrolled < arr[2] && scrolled >= arr[1]) {
        this.steps.active = 1
      } else {
        this.steps.active = 0
      }
    },
    /*点击步骤条动态锚点*/
    jump (index) {
      this.steps.active = index
      let jump = document.querySelectorAll('.floor')
      // 获取需要滚动的距离
      let total = jump[index].offsetTop + 40
      // 获取滚动条拖动的距离
      let distance = document.getElementById('page').scrollTop
      let step = total / 20
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total
          step = newTotal / 20
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
    /*Danger组件传值*/
    getRisk(...data) {
      this.$set(this.risks[data[2]].risk, data[0], data[1]);
    },
    getDyRisk(...data) {
      this.$set(this.dangers[data[2]].risk, data[0], data[1]);
    },
    morePermission() {
      this.more_permission = !this.more_permission
      if(this.more_permission == true){
        this.permissions = this.detail.permissions
        this.tranpermissions = this.detail.tranpermissions
      }else{
        this.permissions = this.detail.permissions.slice(0, 5)
        this.tranpermissions = this.detail.tranpermissions.slice(0, 5)
      }
    },
    moreAttachment() {
      this.more_attachment = !this.more_attachment
      if(this.more_attachment == true){
        this.attachment = this.detail.attachment
      }else{
        this.attachment = this.detail.attachment.slice(0, 5)
      }
    },
    moreSensitives() {
      this.more_sensitives = !this.more_sensitives
      if(this.more_sensitives == true){
        this.sensitives = this.detail.sensitives
      }else{
        this.sensitives = this.detail.sensitives.slice(0, 5)
      }
    },
    moreVirusname() {
      this.more_virusname = !this.more_virusname
      if(this.more_virusname == true){
        this.virusname = this.detail.virusname
      }else{
        this.virusname = this.detail.virusname.slice(0, 5)
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../style/mixin';
@import '../style/common';

.apk-detail{
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
      .download{
        a{
          color: #408ec0;
        }
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
    .info{
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #ccc;
    }
    .el-dialog{
      .inside-image{
        padding: 10px 0;
        overflow: hidden;
        .inside-image-item{
          float: left;
          box-sizing: border-box;
          width: 20%;
          height: 150px;
          text-align: center;
          padding: 5px;
          img{
            width: 80%;
            height: 80%;
          }
        }
      }
    }
    .el-tabs__header{
      .el-tabs__item{
        padding: 0 15px;
      }
    }
    .el-tabs__content{
      .el-collapse{
        border-top: 0;
        border-bottom: 0;
        .el-collapse-item{
          position: relative;
          padding-left: 50px;
          &:before{
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 4px;
            background: #ddd;
            left: 20px;
          }
          .danger-img{
            position: absolute;
            top: 0;
            left: 16px;
          }
        }
      }
    }
  }
  .steps{
    @media screen{
      position: fixed;
      top: 50%;
      transform: translate(0,-50%);
      right: 50px;
      @media(max-height:500px){
        display: none;
      }
    }
  }
}
</style>
