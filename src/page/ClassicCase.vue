<template>
  <div class="classic">
    <PageTitle></PageTitle>
    <div class="case">
      <el-table
        :data="tableData"
        style="width: 100%"
        :span-method="Span"
        border>
        <el-table-column
          prop="ability"
          label="关键能力"
          show-overflow-tooltip
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="category"
          label="分类"
          show-overflow-tooltip
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="func"
          label="功能"
          show-overflow-tooltip
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="md5"
          label="经典案例文件MD5"
          show-overflow-tooltip
          min-width="150">
        </el-table-column>
        <el-table-column
          label="行为报告"
          show-overflow-tooltip
          min-width="50">
          <template slot-scope="scope">
            <span class="report" @click="viewMore(scope.row.md5)">分析报告</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import PageTitle from '../components/Layout/PageTitle'

export default {
  name: 'Layout',
  data () {
    return {
      tableData: [{
        ability: '运行时数据提取能力',
        category: 'URL',
        func: '监控运行时联网访问url行为 ',
        md5: 'C48CE8259515ABAFFAD1A9BFDF330D8B'
      }, {
        ability: '运行时数据提取能力',
        category: '短信',
        func: '监控运行时短信发送和接收行为',
        md5: '82E0B089AAA1F3ADB493AD3611D8626F'
      }, {
        ability: '运行时数据提取能力',
        category: '邮箱',
        func: '监控运行时联网发送邮件行为',
        md5: '8BAD89DCAB017F49F9C0FA4F491667BD'
      }, {
        ability: '运行时数据提取能力',
        category: 'FTP',
        func: '监控运行时联网访问ftp行为',
        md5: 'BCC458950DC93AAE72A5DF1D4920E0B5'
      }, {
        ability: '运行时数据提取能力',
        category: '截屏 ',
        func: '运行时截屏',
        md5: '2FA09C0C7B1B5091B1C457B6BAE4568B'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '监控窃取本机号码行为',
        md5: '82E0B089AAA1F3ADB493AD3611D8626F'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '监控窃取用户历史短信箱行为',
        md5: '8BAD89DCAB017F49F9C0FA4F491667BD'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '监控窃取用户实时接收短信行为',
        md5: '82E0B089AAA1F3ADB493AD3611D8626F'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '监控窃取用户通话记录行为',
        md5: '007F572F9C8F98FAAE4761BEF86ADB03'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '监控窃取用户通讯录行为',
        md5: 'A4C65C1D53DED4092671611281D14164'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '监控窃取用户地理位置行为',
        md5: 'F34B0B6F3AF7D72A9223118FEC09700E'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '钓鱼窃取手机号码',
        md5: '43FD54A44B8D61221E7306D5D179F1A7'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '钓鱼窃取QQ号码和密码',
        md5: 'BC52CE6A9C98D90159AE4935109E50FE'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '钓鱼窃取支付宝帐号和密码',
        md5: '9E25B6331E78C81A42DA4743890DBC74'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '钓鱼窃取淘宝帐号和密码',
        md5: '6FB4F55471C18CFC70FE391807E453C6'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐私泄露',
        func: '钓鱼窃取银行帐号信息',
        md5: '0B32E578F3E07DEC42D29405CC908FC9'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '勒索件',
        func: '监控窗口置顶行为',
        md5: '4012C0337FFF893D595C3EDF08469B7A'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '静默下载',
        func: '监控私自下载恶意应用行为',
        md5: '2B472C0FD207D319DF66A118194A2F99'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '静默下载',
        func: '监控私自下载文件行为',
        md5: '8E75D908839CB54D899760065A89BAAC'
      }, {
        ability: '场景化攻击行为监控能力',
        category: '隐藏类',
        func: '监控隐藏图标行为',
        md5: '5630E311B3A9CB741F11049CEBA52825'
      }, {
        ability: '运行时文件分析能力',
        category: '附属文件扫描',
        func: '运行时附属文件分析',
        md5: '2B472C0FD207D319DF66A118194A2F99'
      }, {
        ability: '精细化本地动作监控能力',
        category: '文件',
        func: '监控文件操作行为',
        md5: 'C48CE8259515ABAFFAD1A9BFDF330D8B'
      }, {
        ability: '精细化本地动作监控能力',
        category: '系统信息',
        func: '监控系统信息操作行为',
        md5: 'C48CE8259515ABAFFAD1A9BFDF330D8B'
      }, {
        ability: '精细化本地动作监控能力',
        category: '包管理',
        func: '监控包管理操作行为',
        md5: 'C48CE8259515ABAFFAD1A9BFDF330D8B'
      }, {
        ability: '精细化本地动作监控能力',
        category: '加解密',
        func: '监控加解密行为',
        md5: '4012C0337FFF893D595C3EDF08469B7A'
      }]
    }
  },
  components: {
    PageTitle
  },
  computed: {

  },
  methods: {
    viewMore(md5) {
      this.$router.push({
        path: '/apkdetail',
        query: {
          md5: md5,
        }
      })
    },
    Span({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return [5, 1]
        } else if(rowIndex > 0 && rowIndex < 5){
          return [0, 0]
        } else if (rowIndex === 5) {
          return [15, 1]
        } else if(rowIndex > 5 && rowIndex < 20){
          return [0, 0]
        } else if(rowIndex === 21){
          return [4, 1]
        } else if(rowIndex > 20 && rowIndex < 25){
          return [0, 0]
        }
      }else if (columnIndex === 1) {
        if (rowIndex === 5) {
          return [11, 1]
        } else if(rowIndex > 5 && rowIndex < 16){
          return [0, 0]
        } else if (rowIndex === 17) {
          return [2, 1]
        } else if(rowIndex === 18){
          return [0, 0]
        }
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../style/common';

.classic{
  .case{
    margin: 50px 80px;
    .el-table{
      th{
        text-align: center;
        }
      td{
        text-align: center;
      }
      .report{
        cursor: pointer;
        color: #108ee9;
      }
    }
  }
}

</style>
