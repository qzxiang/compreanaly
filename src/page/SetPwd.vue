<template>
  <div class="password_form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="orig_password">
        <el-input type="password" v-model="ruleForm.orig_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" @focus="showPassword" @blur="hidePassword"></el-input>
        <span class="info">提示：长度为6-14个字符，支持英文、数字</span>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data () {
    const validateOrig = (rule, value, callback) => {
      const reg = /^[0-9A-Za-z]{6,14}$/
      if (value === '') {
        callback(new Error('请输入原密码'));
      }else if(!reg.test(value)){
        callback(new Error('格式有误'));
      } else {
        callback();
      }
    }
    const validatePass = (rule, value, callback) => {
      /*//不能为纯数字或纯字母
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z$#@!~^&_]{6,14}$/ */
      const reg = /^[0-9A-Za-z]{6,14}$/
      if (value === '') {
        callback(new Error('请输入新密码'));
      }else if(!reg.test(value)){
        callback(new Error('格式有误'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        username: this.$route.query.username,
        orig_password: '',
        password: '',
        checkPass: '',
      },
      rules: {
        orig_password: [
          { required: true, validator: validateOrig, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      show_password: false
    }
  },
  props: {

  },
  created(){

  },
  computed: {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            "orig_password": this.ruleForm.orig_password,
            "password": this.ruleForm.password,
            "is_active": true
          }
          this.$put( '/authentication/user/'+ this.ruleForm.username + '/', data)
          .then((response) => {
            this.$message.success("修改密码成功");
            this.$router.push('layout');
          }).catch(err => {
            if(err.response.data.message == "Password check error."){
              this.$message.warning("原密码错误");
            }else{
              this.$message.warning("修改密码失败");
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showPassword() {
      this.show_password = true
    },
    hidePassword() {
      this.show_password = false
    }
  }
}
</script>

<style lang="less">
@import '../style/mixin';
.password_form{
  width: 90%;
  margin: 80px 0;
  padding-left: 100px;
  .el-form-item__label{
    font-weight: 700;
  }
  .el-input{
    width: 300px;
  }
  .info{
    margin-left: 10px;
    color: red;
    font-size: 12px;
  }
}
</style>
