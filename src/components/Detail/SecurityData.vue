<template>
  <div>
    <el-collapse-item v-for="(item, index) in newarr" :key="index">
      <template slot="title">
        <div v-for="(value, key, index) in item" :key="index">
          <div class="danger-img">
            <i class="el-icon-info" :class="{ 'high': value[0].risklevel == '高危', 'medium': value[0].risklevel == '中危', 'low': value[0].risklevel == '低危'}"></i>
          </div>
          <h3 style="padding-right:50px;color:#3c8dbc;">{{key}}({{value.length}})</h3>
        </div>
      </template>
      <div v-for="(value, key, index) in item" :key="index">
        <p>描述：{{value[0].description}}</p>
        <p>建议解决方案：{{value[0].suggest}}</p>
        <el-table
          :data="value"
          style="width: 100%">
          <el-table-column
            prop="file"
            label="文件"
            width="200">
          </el-table-column>
          <el-table-column
            prop="context"
            label="分析内容">
          </el-table-column>
        </el-table>
      </div>
    </el-collapse-item>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15]"
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
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 5
    }
  },
  props: {
    arr: Array,
  },
  created(){

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

<style lang="less">
@import '../../style/mixin';
@import '../../style/common';
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
