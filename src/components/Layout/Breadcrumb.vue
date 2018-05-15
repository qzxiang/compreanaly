<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in levelList" key="index">
      <router-link :to="item.path">{{item.meta}}
      </router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item >{{$route.meta.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        levelList: null
      }
    },
    created(){
      this.getBreadcrumb();
    },
    computed: {

    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.meta.name);
        const first = matched[0];
        if (first.path == '/apkdetail') {
          matched = [{ meta: '应用管理', path: '/appmanage' }];
        }else if (first.path == '/iosdetail') {
          matched = [{ meta: '应用管理', path: '/appmanage' }];
        }else if (first.path == '/adduser') {
          matched = [{ meta: '用户管理', path: '/usermanage' }];
        }
        else{
          matched = [];
        }
        this.levelList = matched;
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    }
  }
</script>

<style lang="less">
@import '../../style/mixin';
.header_container{
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  background-color: #f4f4f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  .now-page:hover{
    color: #409EFF;
    cursor: pointer;
  }
}
</style>
