<template>
  <div class="title">
    <span>{{$route.meta.name}}</span>
    <span>
      <slot name="back"></slot>
    </span>
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
.title{
  height: 60px;
  line-height: 60px;
  padding-left: 25px;
  font-size: 22px;
  font-weight: 700;
  color: #666666;
}
</style>
