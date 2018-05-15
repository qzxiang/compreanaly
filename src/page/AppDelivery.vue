<template>
  <div>
    <PageTitle></PageTitle>
    <div class="taskinfo">
      <p class="taskstep yellow">任务队列中有{{tasknum}}个任务</p>
      <p class="taskstep">
      <span class="yellow">●</span><span>上传应用文件，单个文件最大为256M</span><span class="red">(单个应用平均检测时间约为7分钟)</span></p>
      <p class="taskstep"><span class="yellow">●</span><span>确定投放应用</span></p>
      <p class="taskstep"><span class="yellow">●</span><span>投放完毕</span></p>
      <div class="delivery-button" v-if="!delistatus">
        <el-upload
          ref="upload"
          :action= "uploadurl"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          :on-progress="onUpload"
          :headers="headers"
          :show-file-list="false"
          :multiple= "false">
          <el-button slot="trigger" type="success" size="mini" :disabled="fileList.length > 0">上传应用</el-button>
          <span class="deli">
            <el-button type="primary" size="mini" @click="delivery" :disabled="fileList.length == 0 || !uploadState">确定投放</el-button>
          </span>
        </el-upload>
      </div>
      <div class="delivery-button" v-else>
        <el-button type="primary" size="mini" @click="changebutton" v-show="delistatus">继续投放应用</el-button>
      </div>
      <div v-show="fileList.length == 0">
        <el-upload
          class="upload-dragger"
          ref="uploadDrag"
          drag
          :action= "uploadurl"
          :on-success="uploadSuccessDrag"
          :before-upload="beforeUploadDrag"
          :on-progress="onUploadDrag"
          :headers="headers"
          :show-file-list="false"
          :multiple= "false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">可将文件拖拽至此上传</div>
        </el-upload>
      </div>
      <div class="upload-detail">
        <el-row v-for="(file, index) in newList" :key="index" class="upload-menu">
          <el-col :span="8" class="num">{{file.name}}</el-col>
          <el-col :span="4" class="data_num">{{file.size}}</el-col>
          <el-col :span="8" class="upload_status" v-show="!delistatus">
            <div v-if="!deliError">
              <el-progress v-if="file.status == 'uploading'" :text-inside="true" :stroke-width="20" :percentage="Math.floor(file.percentage)"></el-progress>
              <span v-else-if="file.status == 'success'" style="text-align:center;">上传成功</span>
              <span v-else class="error">上传失败</span>
            </div>
            <span v-else class="error">该应用投放失败</span>
          </el-col>
          <el-col :span="4" class="btn" v-show="!delistatus">
            <el-button v-if="file.status == 'success'" type="danger" size="mini" @click="removeList(file,index)">删除</el-button>
            <el-button v-else type="warning" size="mini" @click="abortList(file, index)">取消</el-button>
          </el-col>
          <el-col :span="12" v-show="delistatus" class="upload_status">该应用投放成功</el-col>
        </el-row>
        <el-row v-for="(file, index) in newDrag" :key="index" class="upload-menu">
          <el-col :span="8" class="num">{{file.name}}</el-col>
          <el-col :span="4" class="data_num">{{file.size}}</el-col>
          <el-col :span="8" class="upload_status" v-show="!delistatus">
            <div v-if="!deliError">
              <el-progress v-if="file.status == 'uploading'" :text-inside="true" :stroke-width="20" :percentage="Math.floor(file.percentage)"></el-progress>
              <span v-else-if="file.status == 'success'" style="text-align:center;">上传成功</span>
              <span v-else>上传失败</span>
            </div>
            <span v-else class="error">该应用投放失败</span>
          </el-col>
          <el-col :span="4" class="btn" v-show="!delistatus">
            <el-button v-if="file.status == 'success'" type="danger" size="mini" @click="removeDrag(file,index)">删除</el-button>
            <el-button v-else type="warning" size="mini" @click="abortDrag(file, index)">取消</el-button>
          </el-col>
          <el-col :span="12" v-show="delistatus" class="upload_status">该应用投放成功</el-col>
        </el-row>
      </div>
      <el-row v-if="delistatus">
        <el-col :span="8">
          <Loading v-if="state_engine == 0" :text="wait_text" :type="type1"></Loading>
          <div v-else-if="state_engine == 1 || state_engine == 2">
            <el-progress type="circle" :percentage="per_engine" :status="per_engine==100 ? 'success': ''"></el-progress>
            <div class="progress-text">静态分析</div>
          </div>
          <div v-else>
            <el-progress type="circle" :percentage="100" status="exception"></el-progress>
            <div class="progress-text">静态分析</div>
          </div>
        </el-col>
        <el-col :span="8" v-if="fileformat.toUpperCase() !== 'IPA' && fileformat.toUpperCase() !== 'DEB'">
          <Loading v-if="state == 0" :text="wait_text" :type="type2"></Loading>
          <div v-else-if="state == 1 || state == 2">
            <el-progress type="circle" :percentage="per_state" :status="per_state==100 ? 'success': ''"></el-progress>
            <div class="progress-text">动态分析</div>
          </div>
          <div v-else>
            <el-progress type="circle" :percentage="100" status="exception"></el-progress>
            <div class="progress-text">动态分析</div>
          </div>
        </el-col>
        <el-col :span="8" v-if="fileformat.toUpperCase() !== 'IPA' && fileformat.toUpperCase() !== 'DEB'">
          <Loading v-if="state_ratcher == 0" :text="wait_text" :type="type3"></Loading>
          <div v-else-if="state_ratcher == 1 || state_ratcher == 2">
            <el-progress type="circle" :percentage="per_ratcher" :status="per_ratcher==100 ? 'success': ''"></el-progress>
            <div class="progress-text">漏洞分析</div>
          </div>
          <div v-else>
            <el-progress type="circle" :percentage="100" status="exception"></el-progress>
            <div class="progress-text">漏洞分析</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/Layout/PageTitle'
import Loading from '../components/Utils/Loading'
import {baseUrl} from '@/config/env'
import {showPercent, bytesToSize} from '../config/utils'
import { Message } from 'element-ui';
import router from '../router'

export default {
  name: 'AppDelivery',
  data () {
    return {
      form: {
        name: ''
      },
      tasknum: 0,
      delistatus: false,
      deliError: false,
      list: [],
      listDrag: [],
      id: '',
      state: 0,
      state_engine: 0,
      state_ratcher: 0,
      per_state: 0,
      per_engine: 0,
      per_ratcher: 0,
      clock_state: '',
      clock_engine: '',
      clock_ratcher: '',
      md5: '',
      crc32: '',
      fileformat: '',
      clock: '',
      task_clock: '',
      uploadState: false,
      wait_text: "等待中",
      type1: '静态分析',
      type2: '动态分析',
      type3: '漏洞分析',
      arr: [0, 1]
    }
  },
  components: {
    PageTitle,
    Loading
  },
  computed: {
    uploadurl() {
      return baseUrl + '/api/fileupload/'
    },
    headers() {
      return {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    },
    fileList() {
      return this.list.concat(this.listDrag)
    },
    newList() {
      this.list.forEach(function(item, index, array) {
        item.size = bytesToSize(item.size)
      });
      return this.list
    },
    newDrag() {
      this.listDrag.forEach(function(item, index, array) {
        item.size = bytesToSize(item.size)
      });
      return this.listDrag
    }
  },
  methods: {
    init() {
      this.fetchData();
      /*定时获取状态百分比*/
      let self = this
      this.task_clock = setInterval(function(){
          self.fetchData();
        },30000
      )
    },
    fetchData() {
      this.$get( '/api/statisticstask/?running_flag=1' )
      .then((response) => {
        if(response.status == 0){
          this.tasknum = response.count
        }
      }).catch(err => {
        console.log(err);
      })
    },
    delivery() {
      if(this.md5 && this.crc32 && this.fileList[0].name && (this.fileformat.toUpperCase()=="APK" || this.fileformat.toUpperCase()=="IPA" || this.fileformat.toUpperCase()=="DEB")){
        this.$refs.upload.clearFiles()
        this.$refs.uploadDrag.clearFiles()
        this.uploadState = false
        this.state = 0
        this.state_engine = 0
        this.state_ratcher = 0
        var self = this
        var data = {
        md5: this.md5,
        crc32: this.crc32,
        filename: this.fileList[0].name,
        }
        var timeout = 50000
        this.$post( '/api/filedelivery/', data, timeout)
        .then((response) => {
          if(response.id) {
            this.delistatus = true;
            this.id = response.id;
            /*更新任务队列数量*/
            this.fetchData()
            /*定时获取状态百分比*/
            this.clock = setInterval(function(){
                self.$get('/api/task/' + self.id + '/')
                .then((response) => {
                  self.state = response.state
                  self.state_engine = response.state_engine
                  self.state_ratcher = response.state_ratcher
                }).catch(err => {
                  console.log(err);
                })
              },5000
            )
            this.clock_state = setInterval(function(){
                if( self.state == 1 && self.per_state < 99 ){
                  self.per_state++
                }else if(self.state == 2){
                  self.per_state = 100
                  clearInterval(this.clock_state)
                }
              },1000
            )
            this.clock_engine = setInterval(function(){
                if( self.state_engine == 1 && self.per_engine < 99 ){
                  self.per_engine++
                }else if(self.state_engine == 2){
                  self.per_engine = 100
                  clearInterval(this.clock_engine)
                }
              },1000
            )
            this.clock_ratcher = setInterval(function(){
                if( self.state_ratcher == 1 && self.per_ratcher < 99 ){
                  self.per_ratcher++
                }else if(self.state_ratcher == 2){
                  self.per_ratcher = 100
                  clearInterval(this.clock_ratcher)
                }
              },1000
            )
          }
        }).catch(err => {
          if(err.response.data.message == "rms_ErrSampleFormat"){
            this.$message.error("文件类型错误")
            this.deliError = true
          }else{
            this.$message.error("投放失败")
            this.deliError = true
          }
        })
      }else if(this.fileformat.toUpperCase()!=="APK" && this.fileformat.toUpperCase()!=="IPA"){
        this.deliError = true
        this.$message.error("文件类型错误")
      }else{
        this.$message.error("投放失败")
        this.deliError = true
      }
    },
    /*upload组件回调方法*/
    uploadSuccess(res,file, fileList) {
      this.list = fileList;
      this.md5 = res.md5
      this.crc32 = res.crc32
      this.fileformat = res.fileformat
      this.uploadState = true;
    },
    onUpload(event, file, fileList) {
      this.list = fileList;
    },
    beforeUpload(file) {
      this.deliError = false
      return this.appCheck(file);
    },
    uploadSuccessDrag(res,file, fileList) {
      this.listDrag = fileList;
      this.md5 = res.md5
      this.crc32 = res.crc32
      this.fileformat = res.fileformat
      this.uploadState = true;
    },
    onUploadDrag(event, file, fileList) {
      this.listDrag = fileList;
    },
    beforeUploadDrag(file) {
      this.deliError = false
      return this.appCheck(file);
    },
    /*end*/
    removeList(file, i) {
      this.list.splice(i,1)
      this.uploadState = false;
    },
    removeDrag(file, i) {
      this.listDrag.splice(i,1)
      this.uploadState = false;
    },
    abortList(file, i) {
      this.$refs.upload.abort(file)
      this.list.splice(i,1)
    },
    abortDrag(file, i) {
      this.$refs.uploadDrag.abort(file)
      this.listDrag.splice(i,1)
    },
    changebutton() {
      this.list = [];
      this.listDrag = [];
      this.delistatus = false;
      this.uploadState = false
      this.clockInit()
    },
    /*关闭定时器*/
    clockInit() {
      clearInterval(this.clock)
      clearInterval(this.clock_state)
      clearInterval(this.clock_engine)
      clearInterval(this.clock_ratcher)
      this.per_state = 0
      this.per_engine = 0
      this.per_ratcher = 0
    },
    appCheck(file) {
      const isLt = file.size / 1024 / 1024 < 256;
      if (!isLt) {
        this.$message.warning('上传文件大小不能超过256MB!');
      }
      return isLt;
    }
  },
  created() {
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    /*监听route的变化，关闭定时器*/
    this.clockInit()
    clearInterval(this.task_clock)
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../style/common';
@import '../style/mixin';

.taskinfo{
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
  color: #929292;
  .taskstep{
    margin-bottom: 30px;
  }
  .taskstyle{
    width: 50%;
  }
  //投放按钮
  .delivery-button{
    margin-top: 50px;
    padding: 0 0 0 12px;
    width: 30%;
    .deli{
      position: relative;
      .show{
        position: absolute;
        right: -15px;
        top: -18px;
        background: #1991d8;
        width: 20px;
        height: 20px;
        color: #fff;
      }
    }
  }
  .yellow{
    color: @yc;
    margin-right: 10px;
  }
  .red{
    color: @rc;
  }
  //拖拽上传组件
  .upload-dragger{
    margin-top: 80px;
    .el-upload{
      width: 100%;
      .el-upload-dragger{
        border: 1px dashed #F00;
        width: 100%!important;
        .el-upload__text{
          color: red;
        }
      }
    }
  }
  .upload-detail{
    margin-top: 80px;
    padding: 10px;
    .upload-menu{
      margin-top: 80px;
      padding: 10px;
      background: #eff2f7;
      padding: 20px;
      line-height:28px;
      .num{
        color: #5cb5f0;
      }
      .data_num{
        padding-left: 50px;
      }
      .upload_status{
        color: #7bcc74;
        line-height:28px;
        padding-right: 10%;
        text-align: center;
        .error{
          color: #ff4545;
        }
      }
    }
  }
  //环形进度条
  .el-row{
    margin: 0 auto;
    padding: 25px 0;
    .el-col{
      position: relative;
      text-align: center;
      .progress-text{
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%,0);
      }
    }
  }
}
</style>
