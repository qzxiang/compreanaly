<template>
  <div>
    <el-row :key="index" v-for="(item, index) in sort_highlight" v-html="item"></el-row>
  </div>
</template>

<script>
import {unique} from '../../config/appsearch'

export default {
  props: {
    highlight: Array,
  },
  computed: {
    sort_highlight() {
      return unique(this.highlight)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
