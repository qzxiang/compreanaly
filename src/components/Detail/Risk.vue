<template>
  <div>
    <el-row v-for="(value,key, index) in list.attachinfo" :key="index">
      <el-col :span="6"><b>{{key}}</b></el-col>
      <el-col :span="18" v-html="value"></el-col>
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
