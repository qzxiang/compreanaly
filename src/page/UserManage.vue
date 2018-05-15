<template>
  <div class="usermanage">
    <div class="search">
      <el-form :inline="true" :model="form" class="demo-form-inline" @submit.native.prevent>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="add()" size="mini">添加用户</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="20" style="text-align:right">
          <el-form-item label="搜索：">
            <el-input v-model.trim="form.search" @keyup.enter.native="search" placeholder="请输入用户名" size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="search-result">
      <el-table
        :data="newData"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        @sort-change="sortChange"
        style="width: 100%">
        <el-table-column
          type="index"
          :index= "indexMethod"
          label="ID"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          sortable="custom"
          show-overflow-tooltip
          >
        </el-table-column>
        <el-table-column
          label="用户类型"
          show-overflow-tooltip
          >
          <template slot-scope="scope">
            <span v-if="scope.row.is_superuser == true">管理员</span>
            <span v-else>普通用户</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="realname"
          label="真实姓名"
          show-overflow-tooltip
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          show-overflow-tooltip
          >
        </el-table-column>
        <el-table-column
          label="状态"
          show-overflow-tooltip
          >
          <template slot-scope="scope">
            <span v-if="scope.row.is_active == true">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="created_date"
          sortable="custom"
          show-overflow-tooltip
          >
          <template slot-scope="scope">
            <span v-if="scope.row.created_date !== 'None'">{{scope.row.created_date}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="上次登录时间"
          show-overflow-tooltip
          >
          <template slot-scope="scope">
            <span v-if="scope.row.last_login !== 'None'">{{scope.row.last_login}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
          >
          <template slot-scope="scope">
            <div style="float:left;">
              <el-button type="text" size="small" @click="passwordModel(scope.row)">重置密码</el-button>
              <el-button type="text" size="small" @click="infoModel(scope.$index, scope.row)">修改信息</el-button>
              <el-button type="text" size="small" @click="delModel(scope.$index, scope.row)">删除用户</el-button>
              <el-button type="text" size="small" @click="toggle(false, scope.$index, scope.row.username)" v-if="scope.row.is_active == true">禁用</el-button>
              <el-button type="text" size="small" @click="toggle(true, scope.$index, scope.row.username)" v-else>启用</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="重置密码"
      :visible.sync="passwordVisible"
      width="30%">
      <div>是否确认将该用户的密码重置为：<span style="color:red;margin:0 5px;">123456</span>？</div>
      <div slot="footer">
        <el-button @click="passwordVisible = false">取 消</el-button>
        <el-button type="primary" @click="password">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改信息"
      :visible.sync="infoVisible" @close="cancle('infoForm')">
      <el-form :model="infoForm" :rules="rules" ref="infoForm" label-width="100px" class="dialog_form">
        <el-form-item label="用户名">
          <el-input v-model="infoForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="infoForm.realname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="infoForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="is_superuser">
          <el-radio-group v-model="infoForm.is_superuser">
            <el-radio label="false">普通用户</el-radio>
            <el-radio label="true">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="infoVisible = false">取 消</el-button>
        <el-button type="primary" @click="info('infoForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="删除用户"
      :visible.sync="delVisible"
      width="30%">
      <span>确认是否删除</span>
      <span slot="footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
    <div class="Pagination" v-show="table.length">
      <div class="pagination-result" v-if="this.start + 1 !== endItem">显示第{{this.start + 1}}至{{endItem}}项结果，共{{table.length}}项</div>
      <div class="pagination-result" v-else>显示第{{this.start + 1}}项结果，共{{table.length}}项</div>
      <div class="pagination-button">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10]"
          :page-size= "pageSize"
          layout="sizes, prev, pager, next"
          :total="table.length"
          prev-text="上页"
          next-text="下页">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {sortTimeUp, sortTimeDown, sortUserUp, sortUserDown} from '../config/usermanage'

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
      const reg = /^[0-9A-Za-z]{6,14}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(!reg.test(value)){
        callback(new Error('格式有误'));
      } else {
        if (this.passwordForm.checkPass !== '') {
          this.$refs.passwordForm.validateField('checkPass');
        }
        callback();
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      form: {
        search: ''
      },
      passwordForm: {
        username: '',
        orig_password: '',
        password: '',
        checkPass: '',
      },
      infoForm: {
        username: '',
        realname: '',
        email: '',
        is_superuser: ''
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
        ],
        realname: [
          { min: 1, max: 10, message: '长度为1到10个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '格式有误，请输入正确的邮箱', trigger: 'blur'}
        ],
        is_superuser: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ],
      },
      tableData: [],
      table: [],
      currentPage: 1,
      pageSize: 5,
      delVisible: false,
      infoVisible: false,
      passwordVisible: false,
      index: '',
      username: '',
      is_active: true,
      loading: false,
    }
  },
  components: {

  },
  created() {
    this.init()
  },
  computed: {
    /*分页方法*/
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    end() {
      return this.currentPage * this.pageSize;
    },
    endItem(){
      if(this.end > this.table.length){
        return this.table.length
      }else{
        return this.end
      }
    },
    newData() {
      return this.table.slice(this.start,this.end);
    },
    /*end*/
  },
  methods: {
    init() {
      this.loading = true
      this.$get( '/authentication/user/')
      .then((response) => {
        this.tableData = response
        this.tableData = sortUserUp(this.tableData)
        this.tableData.forEach(function(item, index) {
          item.last_login = item.last_login.split(".")[0]
          item.created_date = item.created_date.split(".")[0]
        })
        this.table = this.tableData
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    cancle(formName) {
      this.$refs[formName].resetFields();
    },
    infoModel(index, row) {
      this.infoVisible = true
      this.index = this.start + index
      this.is_active = row.is_active
      this.username = row.username
      this.infoForm.username = row.username
      this.infoForm.is_superuser = row.is_superuser + ""
      this.infoForm.email = row.email
      this.infoForm.realname = row.realname
    },
    passwordModel(row) {
      this.passwordVisible = true
      this.username = row.username
    },
    delModel(index, row) {
      if(row.username == "admin"){
        this.$message.warning("不能删除超级用户");
        return false
      }
      if(row.is_active == true){
        this.$message.warning("不能删除已启用用户");
        return false
      }
      this.delVisible = true
      this.index = this.start + index
      this.username = row.username
    },
    add() {
      this.$router.push('adduser');
    },
    del() {
      this.delVisible = false
      this.$del( '/authentication/user/'+ this.username + '/')
        .then((response) => {
          this.table.splice(this.index, 1)
          this.index = ""
          this.username = ""
          this.$message.warning("删除用户成功")
        }).catch(err => {
          this.index = ""
          this.username = ""
          this.$message.warning("删除用户失败")
        })
    },
    info(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.infoVisible = false
          const data = {
            "is_superuser": this.infoForm.is_superuser ==="false" ? false : true,
            "realname": this.infoForm.realname,
            "email": this.infoForm.email,
            "is_active": this.is_active
          }
          this.$put( '/authentication/user/'+ this.username + '/', data)
          .then((response) => {
            this.$message.success("修改用户信息成功");
            this.$set(this.table[this.index], 'realname', data.realname);
            this.$set(this.table[this.index], 'email', data.email);
            this.$set(this.table[this.index], 'is_superuser', data.is_superuser);
            this.index = ""
            this.is_active = true
            this.username = ""
          }).catch(err => {
            console.log(err);
            this.$message.warning("修改用户信息失败");
          })
        } else {
          return false;
        }
      })
    },
    password() {
      this.passwordVisible = false
      this.$get( '/authentication/passwordreset/'+ this.username + '/?reset_flag=1')
      .then((response) => {
        this.username = ""
        if(status == 0){
          this.$message.success("密码已重置");
        }else if(status == 1){
          this.$message.success("用户名不存在");
        }else{
          this.$message.warning("密码重置失败");
        }
      }).catch(err => {
        this.username = ""
        this.$message.warning("密码重置失败");
      })
    },
    toggle(state, index, username) {
      if(username == "admin"){
        this.$message.warning("不能禁用超级用户");
        return false
      }
      if(username == localStorage.getItem('username')) {
        this.$message.warning("不能禁用本用户");
        return false
      }
      const data = {
        "is_active": state
      }
      this.$put( '/authentication/user/'+ username + '/', data)
      .then((response) => {
        this.$set(this.table[this.start + index], 'is_active', state);
      }).catch(err => {
        this.$message.warning("失败");
      })
    },
    search() {
      this.loading = true
      this.$get( '/authentication/user/?search=' + this.form.search)
        .then((response) => {
          this.table = response
          this.table = sortUserUp(this.table)
          this.table.forEach(function(item, index) {
            item.last_login = item.last_login.split(".")[0]
            item.created_date = item.created_date.split(".")[0]
          })
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
    },
    /*返回页数大小*/
    handleSizeChange(val) {
      this.pageSize = val;
    },
    /*返回当前页数*/
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    /*计算当前列ID*/
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    sortChange(data) {
      if(data.order == "descending" && data.prop == "created_date"){
        this.table = sortTimeDown(this.table)
      }
      if(data.order == "ascending" && data.prop == "created_date"){
        this.table = sortTimeUp(this.table)
      }
      if(data.order == "descending" && data.prop == "username"){
        this.table = sortUserDown(this.table)
      }
      if(data.order == "ascending" && data.prop == "username"){
        this.table = sortUserUp(this.table)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../style/common';
@import '../style/mixin';
.usermanage{
  /* 搜索框 */
  .search{
    padding: 25px 50px;
    overflow: hidden;
  }
  /* 搜索结果表格 */
  .search-result{
    padding: 0 30px;
    .el-table{
      th.is-leaf:last-child{
        text-align: center;
        }
      td:last-child{
        text-align: center;
      }
      .el-icon-document{
        cursor: pointer;
      }
    }
  }
  .dialog_form{
    width: 90%;
    .el-form-item__label{
      font-weight: 700;
    }
    .el-input{
      width: 50%;
    }
    .info{
      margin-left: 10px;
      color: red;
      font-size: 12px;
    }
  }
  /* 分页 */
  .Pagination{
    position: absolute;
    bottom: 0;
    right: 30px;
    left: 30px;
    overflow: hidden;
    .pagination-result{
      display:inline-block;
      float: left;
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      color: #5a5e66;
    }
    .pagination-button{
      display:inline-block;
      float: right;
      height: 30px;
    }
  }
}
</style>