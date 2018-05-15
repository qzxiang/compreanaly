<template>
  <div>
    <NetData :list="list" v-if="!list.domain && list.data"></NetData>
    <el-collapse v-else-if="list.domain && list.data">
      <el-collapse-item v-for="(item, index) in list.data" :key="index">
        <template slot="title">
          <div class="danger-img">
            <i class="el-icon-info" :class="{ 'high': item.risk == 'high', 'medium': item.risk == 'medium', 'low': item.risk == 'low'}"></i>
          </div>
          <!-- 其他 -->
          <h3 style="display: flex;padding-right:5px;color:#3c8dbc;">
            <span style="flex: 5">{{item.name}}</span>
            <span style="flex: 3;">类别:{{item.subtype}}</span>
            <span style="flex: 2;text-align: right;font-size: 12px;color: #444;">{{item.time}}</span>
          </h3>
        </template>
        <NetData :list="list"></NetData>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import NetData from './NetData'

export default {
  props: {
    list: Array
  },
  components: {
    NetData
  },
}
</script>

<style lang="less" scoped>
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
