<template>
  <div>
    <el-row v-if="list.attachinfo.VALUE">
      <el-col :span="6"><b>旧的文件路径</b></el-col>
      <el-col :span="18" v-html="theValue"></el-col>
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
  },
  computed: {
    theValue() {
      return this.list.attachinfo.VALUE.replace(txtReg1, "); <br/>← ").replace(txtReg5, "); <br/>← ")
    }
  }
}
</script>

<style lang="less">

</style>
