<template>
  <div>
    <el-collapse-item v-for="(list, index) in newarr" :key="index">
      <template slot="title">
        <div class="danger-img" v-if="text == '场景化行为'">
          <i class="el-icon-info low"></i>
        </div>
        <div class="danger-img" v-else-if="text == '网络行为'">
          <i v-if="list.domain" class="el-icon-info low"></i>
          <i v-else class="el-icon-info" :class="{ 'high': list.data[0].risk == 'high', 'medium': list.data[0].risk == 'medium', 'low': list.data[0].risk == 'low'}"></i>
        </div>
        <div class="danger-img" v-else>
          <i class="el-icon-info" :class="{ 'high': list.risk == 'high', 'medium': list.risk == 'medium', 'low': list.risk == 'low'}"></i>
        </div>
        <!-- 场景化行为 -->
        <h3 style="display: flex;padding-right:5px;color:#3c8dbc;" v-if="text == '场景化行为'">
          <span style="flex: 5" v-if="list.name.indexOf('SMS_Send')> -1 && list.subtype == '功能滥用(Abuse)'">滥用短信功能进行静默发送短信(SMS_Send)</span>
          <span style="flex: 5" v-else-if="list.name.indexOf('SMS_Send')> -1 && list.subtype == '洪范式攻击类(Flood)'">短信轰炸(SMS_Send)</span>
          <span style="flex: 5" v-else-if="list.name.indexOf('PhoneCall')> -1 && list.subtype == '洪范式攻击类(Flood)'">电话轰炸(PhoneCall)</span>
          <span style="flex: 5" v-else-if="list.name.indexOf('MMS_Send')> -1 && list.subtype == '洪范式攻击类(Flood)'">彩信轰炸(MMS_Send)</span>
          <span style="flex: 5" v-else>{{list.name}}</span>
          <span style="flex: 3;">{{list.subtype}}</span>
          <span style="flex: 2;" v-if="list.UPLOAD">上传方式：{{list.UPLOAD}}</span>
          <span style="flex: 2;" v-else-if="list.DOWNLOAD">下载方式{{list.DOWNLOAD}}</span>
          <span style="flex: 2;" v-else></span>
        </h3>
        <!-- 网络行为 -->
        <h3 style="padding-right:5px;color:#3c8dbc;" v-else-if="text == '网络行为'">
          <div v-if="list.domain" style="display: flex;">
            <span style="flex: 1">{{list.domain}}</span>
            <span style="flex: 1;"></span>
          </div>
          <div v-else style="display: flex;">
            <span style="flex: 5">{{list.data[0].name}}</span>
            <span style="flex: 3;">{{list.data[0].subtype}}</span>
            <span style="flex: 2;text-align: right;font-size: 12px;color: #444;">{{list.time}}</span>
          </div>
        </h3>
        <!-- 其他 -->
        <h3 style="display: flex;padding-right:5px;color:#3c8dbc;" v-else>
          <span style="flex: 5">{{list.name}}</span>
          <span style="flex: 3;">{{list.subtype}}</span>
          <span style="flex: 2;text-align: right;font-size: 12px;color: #444;">{{list.time}}</span>
        </h3>
      </template>
      <Scen :observable="list.observable" v-if="text == '场景化行为'"></Scen>
      <Risk :list="list" v-else-if="text == '危险行为'"></Risk>
      <SMS :list="list" v-else-if="text == '短信行为'"></SMS>
      <Net :list="list" v-else-if="text == '网络行为'"></Net>
      <File :list="list" v-else-if="text == '文档操作行为'"></File>
      <Call :list="list" v-else-if="text == 'CALL/媒体联系人行为'"></Call>
      <All :list="list" v-else-if="text == '其他行为' || text == '全部行为'"></All>
    </el-collapse-item>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20]"
      :page-size="5"
      layout="sizes, prev, pager, next"
      :total="arr.length"
      prev-text="上页"
      next-text="下页"
      class="right data-pagination"
      v-show="arr.length">
    </el-pagination>
  </div>
</template>

<script>
import Scen from './Scen'
import Risk from './Risk'
import Net from './Net'
import SMS from './SMS'
import File from './File'
import Call from './Call'
import All from './All'
import {replace_str} from '../../config/taskdetail'

  export default {
    data () {
      return {
        currentPage: 1,
        pageSize: 5
      }
    },
    props: {
      arr: Array,
      text: String
    },
    created(){

    },
    components: {
      Scen,
      Net,
      SMS,
      File,
      Call,
      All,
      Risk
    },
    computed: {
      start() {
        return (this.currentPage - 1) * this.pageSize;
      },
      end() {
        return this.currentPage * this.pageSize;
      },
      newarr() {
        return this.arr.slice(this.start,this.end);
      },
      callstack() {
        return replace_str(this.list.attachinfo.CALLSTACK)
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    }
  }
</script>

<style lang="less" scoped>
.data-pagination{
  margin: 20px 0;
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
</style>
