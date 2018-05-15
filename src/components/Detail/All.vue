<template>
  <div>
    <el-row v-if="list.srcip">
      <el-col :span="6"><b>源地址</b></el-col>
      <el-col :span="18">{{list.srcip}}</el-col>
    </el-row>
    <el-row v-if="list.attachinfo.srcport">
      <el-col :span="6"><b>源端口</b></el-col>
      <el-col :span="18">{{list.attachinfo.srcport}}</el-col>
    </el-row>
    <el-row v-if="list.destip">
      <el-col :span="6"><b>目的地址</b></el-col>
      <el-col :span="18">{{list.destip}}</el-col>
    </el-row>
    <el-row v-if="list.attachinfo.destport">
      <el-col :span="6"><b>目的端口</b></el-col>
      <el-col :span="18">{{list.attachinfo.destport}}</el-col>
    </el-row>
    <el-row v-for="(value,key, index) in list.attachinfo" :key="index">
      <el-col :span="6" v-if="key !== 'srcport' && key !== 'destport'"><b>{{key}}</b></el-col>
      <el-col :span="18" v-if="key !== 'srcport' && key !== 'destport'" v-html="value"></el-col>
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
