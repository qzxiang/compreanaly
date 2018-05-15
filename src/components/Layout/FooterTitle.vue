<template>
  <div class="footer">
    <p>由以下机构提供技术支持:<a href="https://github.com/qzxiang" target="_blank">qzxiang</a></p>
  </div>
</template>

<script>

export default {
  created(){

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';

.footer{
  background: #fff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #929292;
  box-shadow: 0 10px 20px rgba(0,0,0,.1);
  a{
    color: #108ee9;
  }
}
</style>
