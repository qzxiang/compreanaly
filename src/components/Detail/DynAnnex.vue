<template>
  <el-table
    :data="attachment"
    style="width: 100%" border>
    <el-table-column
      prop="filename"
      label="文件名"
      show-overflow-tooltip
      min-width= "20%">
      <template slot-scope="scope">
        <a class="annex-download" :href="scope.row.download">{{scope.row.filename}}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="md5"
      label="MD5"
      show-overflow-tooltip
      min-width= "40%">
    </el-table-column>
    <el-table-column
      label="类型"
      show-overflow-tooltip
      min-width= "10%">
      <template slot-scope="scope">
        <span v-if="scope.row.fileformat == 'Unknown'">未知</span>
        <span v-else>{{scope.row.fileformat}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="静态是否检出"
      show-overflow-tooltip
      min-width="10%">
      <template slot-scope="scope">
        <span v-if="scope.row.virusname">是</span>
        <span v-else>否</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="virusname"
      label="检出病毒名"
      show-overflow-tooltip
      min-width = "20%">
    </el-table-column>
  </el-table>
</template>

<script>
import {baseUrl} from '@/config/env'
  export default {
    data () {
      return {

      }
    },
    props: {
      attachment: Array,
    },
    beforeUpdate() {
      this.init()
    },
    computed: {

    },
    methods: {
      init() {
        this.attachment.forEach(item => {
          if(item.fileformat.toUpperCase() == 'APK'){
            item.download = baseUrl + '/download/' + item.md5 + '.' + item.crc32
          }else{
            item.download = baseUrl + '/download/' + item.md5 + '.rms.dump'
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import '../../style/mixin';
@import '../../style/common';
.annex-download{
  color: #408ec0;
}
</style>
