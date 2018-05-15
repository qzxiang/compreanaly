<template>
  <div>
    <div v-for="(item, index) in observable">
      <el-row v-if="item.NUM">
        <el-col :span="6"><b>号码</b></el-col>
        <el-col :span="18">{{item.NUM}}</el-col>
      </el-row>
      <el-row v-if="item.CONTENT">
        <el-col :span="6"><b>内容</b></el-col>
        <el-col :span="18">{{item.CONTENT}}</el-col>
      </el-row>
      <el-row v-if="item.URL">
        <el-col :span="6"><b>URL</b></el-col>
        <el-col :span="18">{{item.URL}}</el-col>
      </el-row>
      <el-row v-if="item.IP">
        <el-col :span="6"><b>IP</b></el-col>
        <el-col :span="18">{{item.IP}}</el-col>
      </el-row>
      <el-row v-if="item.PARAM">
        <div v-if="item.PARAM_CONTENT">
          <el-col :span="6"><b>参数</b></el-col>
          <el-col :span="18">{{item.PARAM_CONTENT}}:{{item.PARAM}}</el-col>
        </div>
        <div v-else>
          <el-col :span="6"><b>参数</b></el-col>
          <el-col :span="18">{{item.PARAM}}</el-col>
        </div>
      </el-row>
      <el-row v-if="item.RESP">
        <el-col :span="6"><b>返回值</b></el-col>
        <el-col :span="18">{{item.RESP}}</el-col>
      </el-row>
      <el-row v-if="item.PORT">
        <el-col :span="6"><b>PORT</b></el-col>
        <el-col :span="18">{{item.PORT}}</el-col>
      </el-row>
      <el-row v-if="item.USERNAME">
        <el-col :span="6"><b>用户名</b></el-col>
        <el-col :span="18">{{item.USERNAME}}</el-col>
      </el-row>
      <el-row v-if="item.PASSWORD">
        <el-col :span="6"><b>密码</b></el-col>
        <el-col :span="18">{{item.PASSWORD}}</el-col>
      </el-row>
      <el-row v-if="item.FROM">
        <el-col :span="6"><b>FROM</b></el-col>
        <el-col :span="18">{{item.FROM}}</el-col>
      </el-row>
      <el-row v-if="item.TO">
        <el-col :span="6"><b>TO</b></el-col>
        <el-col :span="18">{{item.TO}}</el-col>
      </el-row>
      <el-row v-if="item.SUBJECT">
        <el-col :span="6"><b>主题</b></el-col>
        <el-col :span="18">{{item.SUBJECT}}</el-col>
      </el-row>
      <el-row v-if="item.ATTACHMENT">
        <el-col :span="6"><b>附件</b></el-col>
        <el-col :span="18">{{item.ATTACHMENT}}</el-col>
      </el-row>
      <el-row v-if="item.MSTYPE">
        <el-col :span="6"><b>类型</b></el-col>
        <el-col :span="18">{{item.MSTYPE}}</el-col>
      </el-row>
      <el-row v-if="item.SAMPLEHASH">
        <el-col :span="6"><b>样本HASH</b></el-col>
        <el-col :span="18">{{item.SAMPLEHASH}}</el-col>
      </el-row>
      <el-row v-if="item.DOWNFILEHASH">
        <el-col :span="6"><b>下载文件HASH</b></el-col>
        <el-col :span="18">{{item.DOWNFILEHASH}}</el-col>
      </el-row>
      <el-row v-if="item.URLSOURCE">
        <el-col :span="6"><b>URL来源</b></el-col>
        <el-col :span="18">{{item.URLSOURCE}}</el-col>
      </el-row>
      <el-row v-if="item.PACKAGENAME">
        <el-col :span="6"><b>文件路径</b></el-col>
        <el-col :span="18">{{item.PACKAGENAME}}</el-col>
      </el-row>
      <el-row v-if="item.FILEHASH">
        <el-col :span="6"><b>文件HASH</b></el-col>
        <el-col :span="18">{{item.FILEHASH}}</el-col>
      </el-row>
      <el-row v-if="item.FILESOURCE">
        <el-col :span="6"><b>文件来源</b></el-col>
        <el-col :span="18">{{item.FILESOURCE}}</el-col>
      </el-row>
      <el-row v-if="item.TOPSTR">
        <el-col :span="6"><b>置顶字符串</b></el-col>
        <el-col :span="18">{{item.TOPSTR}}</el-col>
      </el-row>
      <el-row v-if="item.FILETYPE">
        <el-col :span="6"><b>文件类型</b></el-col>
        <el-col :span="18">{{item.FILETYPE}}</el-col>
      </el-row>
      <el-row v-if="item.NOTIFYCOUNT">
        <el-col :span="6"><b>攻击次数</b></el-col>
        <el-col :span="18">{{item.NOTIFYCOUNT}}</el-col>
      </el-row>
      <el-row v-if="item.TITLE">
        <el-col :span="6"><b>标题</b></el-col>
        <el-col :span="18">{{item.TITLE}}</el-col>
      </el-row>
      <el-row v-if="item.SMSCOUNT">
        <el-col :span="6"><b>发送次数</b></el-col>
        <el-col :span="18">{{item.SMSCOUNT}}</el-col>
      </el-row>
      <el-row v-if="item.FLOATCOUNT">
        <el-col :span="6"><b>浮动次数</b></el-col>
        <el-col :span="18">{{item.FLOATCOUNT}}</el-col>
      </el-row>
      <el-row v-if="item.ICONCOUNT">
        <el-col :span="6"><b>创建次数</b></el-col>
        <el-col :span="18">{{item.ICONCOUNT}}</el-col>
      </el-row>
      <el-row v-if="item.MMSCOUNT">
        <el-col :span="6"><b>发送次数</b></el-col>
        <el-col :span="18">{{item.MMSCOUNT}}</el-col>
      </el-row>
      <el-row v-if="item.NETCOUNT">
        <el-col :span="6"><b>连接次数</b></el-col>
        <el-col :span="18">{{item.NETCOUNT}}</el-col>
      </el-row>
      <el-row v-if="item.CALLCOUNT">
        <el-col :span="6"><b>拨打次数</b></el-col>
        <el-col :span="18">{{item.CALLCOUNT}}</el-col>
      </el-row>
      <el-row v-if="item.NAME">
        <el-col :span="6"><b>名称</b></el-col>
        <el-col :span="18">{{item.NAME}}</el-col>
      </el-row>
      <el-row v-if="item.FILENAME">
        <el-col :span="6"><b>文件名</b></el-col>
        <el-col :span="18">{{item.FILENAME}}</el-col>
      </el-row>
      <el-row v-if="item.HASH">
        <el-col :span="6"><b>HASH</b></el-col>
        <el-col :span="18">{{item.HASH}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    observable: Array
  }
}
</script>

<style lang="less">

</style>
