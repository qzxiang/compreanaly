<template>
  <div class="Key-data">
    <el-table
      :data="urlip"
      style="width: 100%"
      :span-method="urlipSpan"
      border>
      <el-table-column
        label="URL及对应IP"
        min-width= "20%">
        <template slot-scope="scope">
          <el-button v-if="detail.state == 2 && detail.urlip && detail.urlip.length > 5" @click="more(detail.urlip, 'urlip')" size="mini" type="primary">
            <span v-if="!more_urlip">展示全部</span>
            <span v-else>收起</span>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="URL"
        min-width= "60%">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content" style="width:800px;word-break:break-all;">{{scope.row.url}}</div>
            <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">{{scope.row.url}}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP"
        show-overflow-tooltip
        min-width = "20%">
      </el-table-column>
    </el-table>
    <el-table
      :data="sms_message"
      style="width: 100%"
      :span-method="smsSpan"
      border>
      <el-table-column
        label="短信数据"
        min-width= "20%">
        <template slot-scope="scope">
          <el-button v-if="detail.state == 2 && detail.sms_message && detail.sms_message.length > 5" @click="more(detail.sms_message, 'sms')" size="mini" type="primary">
            <span v-if="!more_sms">展示全部</span>
            <span v-else>收起</span>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="号码"
        show-overflow-tooltip
        min-width= "60%">
        <template slot-scope="scope">
          <span>From:</span>
          <span style="margin-left: 10px" v-if="scope.row.from || scope.row.to || scope.row.content">本机</span>
          <span style="margin-left: 10px" v-else>{{ scope.row.from }}</span>
          <span style="margin-left: 20px">To:</span>
          <span style="margin-left: 10px" v-if="!scope.row.to">本机</span>
          <span style="margin-left: 10px" v-else>{{ scope.row.to }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        show-overflow-tooltip
        min-width = "20%">
      </el-table-column>
    </el-table>
    <el-table
      :data="email"
      style="width: 100%"
      :span-method="emailSpan"
      border>
      <el-table-column
        label="邮箱数据"
        min-width= "20%">
        <template slot-scope="scope">
          <el-button v-if="detail.state == 2 && detail.email && detail.email.length > 5" @click="more(detail.email, 'email')" size="mini" type="primary">
            <span v-if="!more_email">展示全部</span>
            <span v-else>收起</span>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="from"
        label="邮箱"
        show-overflow-tooltip
        min-width= "20%">
      </el-table-column>
      <el-table-column
        prop="user"
        label="用户名"
        show-overflow-tooltip
        min-width= "20%">
      </el-table-column>
      <el-table-column
        prop="to"
        label="目的邮箱"
        show-overflow-tooltip
        min-width="20%">
      </el-table-column>
      <el-table-column
        prop="subject"
        label="主题内容"
        show-overflow-tooltip
        min-width = "20%">
      </el-table-column>
    </el-table>
    <el-table
      :data="ftp"
      style="width: 100%"
      :span-method="ftpSpan"
      border>
      <el-table-column
        label="FTP数据"
        min-width= "20%">
        <template slot-scope="scope">
          <el-button v-if="detail.state == 2 && detail.ftp && detail.ftp.length > 5" @click="more(detail.ftp, 'ftp')" size="mini" type="primary">
            <span v-if="!more_ftp">展示全部</span>
            <span v-else>收起</span>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址"
        show-overflow-tooltip
        min-width= "20%">
      </el-table-column>
      <el-table-column
        prop="port"
        label="端口号"
        show-overflow-tooltip
        min-width= "20%">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        show-overflow-tooltip
        min-width= "20%">
      </el-table-column>
      <el-table-column
        prop="user"
        label="用户名"
        show-overflow-tooltip
        min-width="20%">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        more_urlip: false,
        more_sms: false,
        more_email: false,
        more_ftp: false,
        urlip: [],
        sms_message: [],
        email: [],
        ftp: []
      }
    },
    props: {
      detail: Object,
    },
    created(){
      if(this.detail.urlip){
        this.urlip = this.detail.urlip.slice(0,5)
      }
      if(this.detail.sms_message){
        this.sms_message = this.detail.sms_message.slice(0,5)
      }
      if(this.detail.email){
        this.email = this.detail.email.slice(0,5)
      }
      if(this.detail.ftp){
        this.detail.ftp = this.detail.ftp.reverse()
        this.ftp = this.detail.ftp.slice(0,5)
      }
    },
    computed: {

    },
    methods: {
      urlipSpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % this.detail.urlip.length === 0) {
            return {
              rowspan: this.detail.urlip.length,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      smsSpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % this.detail.sms_message.length === 0) {
            return {
              rowspan: this.detail.sms_message.length,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      emailSpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % this.detail.email.length === 0) {
            return {
              rowspan: this.detail.email.length,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      ftpSpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % this.detail.ftp.length === 0) {
            return {
              rowspan: this.detail.ftp.length,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      more(data, name) {
        switch(name)
        {
        case 'urlip':
          this.more_urlip = !this.more_urlip
          if(this.more_urlip == true){
            this.urlip = data
          }else{
            this.urlip = data.slice(0, 5)
          }
          break;
        case 'sms':
          this.more_sms = !this.more_sms
          if(this.more_sms == true){
            this.sms_message = data
          }else{
            this.sms_message = data.slice(0, 5)
          }
          break;
        case 'email':
          this.more_email = !this.more_email
          if(this.more_email == true){
            this.email = data
          }else{
            this.email = data.slice(0, 5)
          }
          break;
        case 'ftp':
          this.more_ftp = !this.more_ftp
          if(this.more_ftp == true){
            this.ftp = data
          }else{
            this.ftp = data.slice(0, 5)
          }
          break;
        }
      },
    }
  }
</script>

<style lang="less">
@import '../../style/mixin';
@import '../../style/common';
.Key-data{
  .el-table__body td {
    vertical-align: top;
  }
}

</style>
