<template>
  <div>
    <el-row v-if="list.attachinfo.OLDFILEPATH">
      <el-col :span="6"><b>旧的文件路径</b></el-col>
      <el-col :span="18">{{list.attachinfo.OLDFILEPATH}}</el-col>
    </el-row>
    <el-row v-if="list.attachinfo.NEWFILEPATH">
      <el-col :span="6"><b>新的文件路径</b></el-col>
      <el-col :span="18">{{list.attachinfo.NEWFILEPATH}}</el-col>
    </el-row>
    <el-row v-if="list.attachinfo.FILEPATH">
      <el-col :span="6"><b>文件路径</b></el-col>
      <el-col :span="18">{{list.attachinfo.FILEPATH}}</el-col>
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
