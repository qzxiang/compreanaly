<template>
  <div class="fillcontain">
    <el-container>
      <el-header height="50px">
        <div class="head-logo">
          <div class="logo-wrapper">
            <img :src="logo" class="logo">
          </div>
        </div>
        <div class="head-title">
          <div class="title">
            <p>移动应用综合分析工具软件V2.0</p>
          </div>
          <div class="user-info">
            <div class="avatar-wrapper">
              <img :src="avatar" class="avatar" >
            </div>
            <el-dropdown class="user">
              <span>
                {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="setpwd">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="quit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
      <el-aside width="200px">
        <el-menu :default-active="defaultActive" text-color="#72728e" active-text-color="#001529" router>
          <el-menu-item index="layout"><i class="el-icon-menu"></i>统计概况</el-menu-item>
          <el-menu-item index="appdelivery"><i class="el-icon-upload"></i>应用投放</el-menu-item>
          <el-menu-item index="appmanage"><i class="el-icon-goods"></i>应用管理</el-menu-item>
          <el-menu-item index="appsearch"><i class="el-icon-search"></i>应用搜索</el-menu-item>
          <el-menu-item index="classiccase"><i class="el-icon-document"></i>经典案例</el-menu-item>
          <el-menu-item index="usermanage" v-if="is_superuser"><i class="el-icon-setting"></i>用户管理</el-menu-item>
          <el-menu-item index="sysmanage" v-if="is_superuser"><i class="el-icon-setting"></i>系统管理</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="page" id="page">
        <Breadcrumb></Breadcrumb>
        <div class="pageinfo">
          <router-view></router-view>
        </div>
        <FooterTitle></FooterTitle>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from '../components/Layout/Breadcrumb'
import FooterTitle from '../components/Layout/FooterTitle'
import avatar from '../image/avatar.png'
import logo from '../image/logo.png'

export default {
  data () {
    return {
      user: '',
      is_superuser: false,
      avatar: avatar,
      logo: logo
    }
  },
  created() {
    this.init()
  },
  computed: {
    defaultActive: function(){
      if(this.$route.path.replace('/', '') === "setpwd"  || this.$route.path.replace('/', '') === "adduser"){
        return "usermanage";
      }else if(this.$route.path.replace('/', '') === "apkdetail" || this.$route.path.replace('/', '') === "iosdetail"){
        return "appmanage";
      }else{
        return this.$route.path.replace('/', '');
      }
    }
  },
  components: {
    Breadcrumb,
    FooterTitle
  },
  methods: {
    init() {
      this.user = localStorage.getItem('username')
      this.$get( '/authentication/user/' + this.user + '/')
      .then((response) => {
        this.is_superuser = response.is_superuser
      }).catch(err => {
        if(err.response && err.response.status){
          if(err.response.status == 404){
            this.$message.error("请求异常")
          }else if(err.response.status == 500 || err.response.status == 504){
            this.$message.error("服务器连接异常")
          }
        }
        this.loading = false
      })
    },
    quit() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$router.push('/');
    },
    setpwd() {
      this.$router.push({
        path: '/setpwd',
        query: {
          username: this.user
        }
      });
    }
  }
}
</script>


<style lang="less" scoped>
@import '../style/mixin';
.el-container{
  height: 100%;
}
.el-main{
  height: 100%;
  padding: 0;
}
.el-header{
  display: flex;
  background: #001529;
  background-size: cover;
  .head-logo{
    flex: 0 0 30px;
    height: 50px;
    background: #001529;
    .logo-wrapper{
      margin-top: 10px;
      text-align: center;
      font-weight: bold;
      .logo{
        width: 100%;
      }
    }
  }
  .head-title{
    flex: 1;
    .title{
      margin-left: 10px;
      height: 50px;
      line-height: 50px;
      font-size: 1.25rem;
      color: #fff;
    }
    .user-info{
      position: absolute;
      margin-right: 30px;
      right: 0;
      cursor: pointer;
      top: 0;
      height: 50px;
      line-height: 50px;
      color: #ffffff;
      .user{
        position: relative;
        margin-left: 5px;
        top: 5px;
        height: 45px;
        color: #fff;
        &:hover{
          color: #ebebeb;
        }
        span{
          display: inline-block;
          height: 100%;
        }
      }
      .avatar-wrapper{
        position: relative;
        display: inline-block;
        top: 5px;
        height: 40px;
        width: 40px;
        vertical-align: middle;
        img{
          position: absolute;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          transform: translate(-50%,-50%);
        }
      }
    }
  }
}
.el-aside{
  background: #e4e4e4;
}
.el-menu{
  background: transparent;
  border-right: 0;
}
.el-menu-item.is-active{
  background: #ccc;
}
.el-menu-item:hover{
  background: #ccc;
  color: #001529 !important;
}
.page{
  position: relative;
  box-sizing: border-box;
  min-height: calc(~ '100vh - 50px');
  padding : 40px 20px;
  background: #f0f2f5;
  overflow: auto;
  .pageinfo{
    position: relative;
    min-height: calc(~ '100vh - 180px');
    background: #fff;
    overflow: auto;
    box-shadow: 0 -10px 20px rgba(0,0,0,.1);
  }
}

</style>
