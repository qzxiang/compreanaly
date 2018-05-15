<template>
  <div class="user_form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" @focus="showUser" @blur="hideUser"></el-input>
        <span class="info">提示：长度为4-14个字符，支持英文、数字和下划线</span>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" @focus="showPassword" @blur="hidePassword"></el-input>
        <span class="info">提示：长度为6-14个字符，支持英文、数字</span>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="ruleForm.realname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="is_superuser">
        <el-radio-group v-model="ruleForm.is_superuser">
          <el-radio label="false">普通用户</el-radio>
          <el-radio label="true">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data () {
    const validateUser = (rule, value, callback) => {
      const reg = /^[0-9a-zA-z]\w{3,13}$/
      if (!value) {
        return callback(new Error('请输入用户名'));
      }else if(!reg.test(value)){
        callback(new Error('格式有误'));
      } else {
        callback();
      }
    }
    const validatePass = (rule, value, callback) => {
      /*//不能为纯数字或纯字母
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z$#@!~^&_]{6,14}$/
      var reg = /^[0-9A-Za-z$#@!~^&_]{6,14}$/*/
      const reg = /^[0-9A-Za-z]{6,14}$/
      if (value === '') {
        callback(new Error('请输入密码'));
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
        username: '',
        password: '',
        checkPass: '',
        realname: '',
        email: '',
        is_superuser: 'false'
      },
      rules: {
        username: [
          { required: true, validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        realname: [
          { min: 1, max: 20, message: '格式有误，请输入长度为0-20个字符的中英文字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '格式有误，请输入正确的邮箱', trigger: 'blur'}
        ],
        is_superuser: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ],
      },
      show_user: false,
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
            "username": this.ruleForm.username,
            "is_superuser": this.ruleForm.is_superuser,
            "password": this.ruleForm.password,
            "realname": this.ruleForm.realname,
            "email": this.ruleForm.email,
            "is_active": true
          }
          this.$get( '/authentication/user/' + this.ruleForm.username + '/')
          .then((response) => {
            this.$message.warning("用户名重复");
          }).catch(err => {
            if(err.response.statusText === "Not Found"){
              this.$post( '/authentication/user/', data)
              .then((response) => {
                this.$message.success("创建成功");
                this.$router.push('usermanage');
              }).catch(err => {
                this.$message.warning("创建失败");
              })
            }else{
              this.$message.warning(err.response.statusText);
            }
          })
        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showUser() {
      this.show_user = true
    },
    hideUser() {
      this.show_user = false
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
.user_form{
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
