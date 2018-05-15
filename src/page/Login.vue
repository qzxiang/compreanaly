<template>
  <div class="login-wrap">
    <div class="ms-title">移动应用综合分析工具软件v2.0</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" size="mini">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <p class="license">{{license}}</p>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
  data() {
    return {
      license: "",
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.init()
    this.verifyLicense()
  },
  methods: {
    init() {
      let token = localStorage.getItem('token')
      if (token) {
        localStorage.removeItem('token')
      }
    },
    verifyLicense() {
      this.$get( '/license/manager/?type=verify')
      .then((response) => {
        switch (response.status)
        {
        case 0:
          this.getLicense()
          break;
        case 1:
          this.license = "您当前设备的license文件解析失败，请重新授权。"
          break;
        case 2:
          this.license = "您当前的运行环境与许可证授权不一致，该工具不得迁移至其他终端使用。"
          break;
        case 3:
          this.license = "您当前使用的许可证已过期，请重新授权"
          break;
        case 4:
          this.license = "您的许可证时间尚未生效。"
          break;
        case 999:
          this.license = "该工具授权失败，请重新授权。"
          break;
        default:
          this.license = "该工具授权失败，请重新授权。"
        }
      }).catch(err => {
        this.$message.warning("验证license文件失败");
      })
    },
    getLicense() {
      this.$get( '/license/manager/?type=extract')
      .then((response) => {
        switch (response.status)
        {
        case 0:
          if(response.license_type == 0){
            this.license = "您当前使用的试用版将于"+ response.expire_date + "过期"
          }else if(response.license_type == 1){
            this.license = "您的设备已成功授权，请放心使用"
          }
          break;
        case 1:
          this.$message.warning("读取license文件失败,请刷新页面。");
          break;
        case 2:
          this.$message.warning("验证license文件失败,请刷新页面。");
          break;
        default:
          this.$message.warning("读取license文件失败,请刷新页面。");
        }
      }).catch(err => {
        this.$message.warning("读取license文件失败");
      })
    },
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false;
        }
      });
    },
    login() {
      var data = {
        username: this.ruleForm.username,
        password: this.ruleForm.password
      }
      this.$post( '/authentication/login/', data)
      .then((response) => {
        if(response.token){
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', data.username);
          this.$router.push('layout');
        }
      }).catch(err => {
        if(err.response.data.message == "Invalid username/password"){
          this.$message.warning("用户名或密码不正确");
        }else if(err.response.data.message == "No active"){
          this.$message.warning("该账户已被禁用，请联系管理员");
        }
      })
    }
  }
}
</script>

<style lang="less">
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
    //background: url('../image/background.jpg');
    background: #f0f2f5;
    background-size: cover;
    .ms-title{
      position: absolute;
      top:50%;
      width:100%;
      margin-top: -180px;
      text-align: center;
      font-size:30px;
      color: #666;
    }
    .ms-login{
      position: absolute;
      left:50%;
      top:50%;
      width:200px;
      height:160px;
      margin:-150px 0 0 -140px;
      padding:40px;
      border-radius: 5px;
      background: transparent;
      .license{
        margin-bottom: 10px;
        white-space:nowrap;
        font-size: 14px;
        color: #689AFC;
      }
      .login-btn{
        text-align: center;
        button{
          width:60%;
          height:36px;
        }
      }
    }
  }

</style>