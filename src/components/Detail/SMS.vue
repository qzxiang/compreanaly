<template>
  <div>
    <el-row v-if="list.attachinfo.TO || list.attachinfo.FROM">
      <el-col :span="6"><b>号码</b></el-col>
      <el-col :span="18" v-if="list.attachinfo.TO && list.attachinfo.FROM">TO：{{list.attachinfo.TO}}</el-col>
      <el-col :span="18" v-else-if="list.attachinfo.TO && !list.attachinfo.FROM">TO：{{list.attachinfo.TO}}</el-col>
      <el-col :span="18" v-else-if="!list.attachinfo.TO && list.attachinfo.FROM">FROM：{{list.attachinfo.FROM}}</el-col>
      <el-col :span="18" v-else></el-col>
    </el-row>
    <el-row v-if="list.attachinfo.CONTENT">
      <el-col :span="6"><b>内容</b></el-col>
      <el-col :span="18">{{list.attachinfo.CONTENT}}</el-col>
    </el-row>
    <el-row v-if="list.attachinfo.Email">
      <el-col :span="6"><b>邮件信息</b></el-col>
      <el-col :span="18">{{list.attachinfo.Email}}</el-col>
    </el-row>
    <el-row v-if="list.attachinfo.RECEIVE_PACKAGE_NAME">
      <el-col :span="6"><b>拦截短信包名</b></el-col>
      <el-col :span="18">{{list.attachinfo.RECEIVE_PACKAGE_NAME}}</el-col>
    </el-row>
    <el-row v-if="list.attachinfo.CALLSTACK">
      <el-col :span="6"><b>调用信息</b></el-col>
      <el-col :span="18" v-html="list.attachinfo.CALLSTACK"></el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  props: {
    list: Object
  }
}
</script>

<style lang="less">

</style>
