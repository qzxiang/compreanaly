<template>
  <div class="detail-box">
    <el-row class="detail-title">
      <el-col :span="20">
      <span style="display:inline-block">{{boxTitle}}</span>
      <span style="display:inline-block"><slot name="more"></slot></span>
      </el-col>
      <el-col :span="4">
        <slot name="img"></slot>
      </el-col>
    </el-row>
    <slot name="file"></slot>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  props: ['boxTitle'],
  created(){

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="less">
.detail-box{
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 10px;
  .detail-title{
    margin-bottom: 10px;
    padding: 5px 0;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 2px solid #408eba;
    .more{
      cursor: pointer;
      color: #3f8eba;
    }
  }
  .detail-desc{
    margin-bottom: 5px;
    font-size: 12px;
    color: #666666;
  }
  .image{
    display: flex;
    padding: 20px 0;
    overflow: hidden;
    .image-item{
      flex: 1;
      float: left;
      text-align: center;
      img{
        width: 190px;
        height: 280px;
      }
    }
  }
}
</style>
