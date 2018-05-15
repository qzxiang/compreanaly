<template>
  <div>
    <el-row v-if="list.data[0].attachinfo.URL">
      <el-col :span="6"><b>URL</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.URL}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.ENTITY">
      <el-col :span="6"><b>ENTITY</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.ENTITY}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.IP">
      <div v-if="list.data[0].subtype == 'UDP相关'">
        <el-col :span="6"><b>连接的IP及端口号</b></el-col>
        <el-col :span="18">{{list.data[0].attachinfo.IP}}:{{list.data[0].attachinfo.PORT}}</el-col>
      </div>
      <div v-else>
        <el-col :span="6"><b>URL对应IP</b></el-col>
        <el-col :span="18">{{list.data[0].attachinfo.IP}}</el-col>
      </div>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.DATA">
      <el-col :span="6"><b>需要上传的数据</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.DATA}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.FILE">
      <el-col :span="6"><b>创建URL对应的源</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.FILE}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.DOMAIN">
      <el-col :span="6"><b>创建URL对应的源</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.DOMAIN}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.INPUT_IP">
      <el-col :span="6"><b>函数参数输入IP及端口号</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.INPUT_IP}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.LOCAL_HOST">
      <el-col :span="6"><b>源域名</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.LOCAL_HOST}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.LOCAL_ADDRESS">
      <el-col :span="6"><b>源地址</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.LOCAL_ADDRESS}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.LOCAL_PORT">
      <el-col :span="6"><b>源端口</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.LOCAL_PORT}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.DST_HOST">
      <el-col :span="6"><b>目的域名</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.DST_HOST}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.DST_ADDRESS">
      <el-col :span="6"><b>目的地址</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.DST_ADDRESS}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.DST_PORT">
      <el-col :span="6"><b>目的端口</b></el-col>
      <el-col :span="18">{{list.data[0].attachinfo.DST_PORT}}</el-col>
    </el-row>
    <el-row v-if="list.data[0].attachinfo.CALLSTACK">
      <el-col :span="6"><b>调用信息</b></el-col>
      <el-col :span="18" v-html="list.data[0].attachinfo.CALLSTACK"></el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  props: {
    list: Array
  }
}
</script>

<style lang="less" scoped>

</style>
