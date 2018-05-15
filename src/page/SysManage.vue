<template>
  <div class="sysmanage">
    <div class="wrapper">
      <Detail-Box :box-title="'设备管理'" class="box">
        <div slot="file" v-loading="loading" element-loading-text="加载中"
        element-loading-spinner="el-icon-loading">
          <el-row class="detail-desc">
            <el-col :span="4">设备型号:</el-col>
            <el-col :span="20">{{storage.device_model}}</el-col>
          </el-row>
          <el-row class="detail-desc">
            <el-col :span="4">设备编号:</el-col>
            <el-col :span="20">{{storage.device_code}}</el-col>
          </el-row>
          <el-row class="detail-desc">
            <el-col :span="4">操作系统:</el-col>
            <el-col :span="20">{{storage.os}}</el-col>
          </el-row>
          <el-row class="detail-desc">
            <el-col :span="4">持续运行时间:</el-col>
            <el-col :span="20">{{time}}</el-col>
          </el-row>
          <el-row class="detail-desc">
            <el-col :span="4">设备系统时间:</el-col>
            <el-col :span="20">{{storage.currenttime}}</el-col>
          </el-row>
          <el-row class="detail-desc">
            <el-col :span="4">软件版本:</el-col>
            <el-col :span="20">{{storage.software_name}}</el-col>
          </el-row>
          <el-row class="detail-desc">
            <el-col :span="4">CPU型号:</el-col>
            <el-col :span="20" v-if="storage.cpu">{{storage.cpu.model}}</el-col>
          </el-row>
        </div>
      </Detail-Box>
      <Detail-Box :box-title="'存储管理'" class="box">
        <div slot="file" v-loading="loading" element-loading-text="加载中"
        element-loading-spinner="el-icon-loading">
          <el-table
            :data="cpu"
            style="width: 100%">
            <el-table-column
              label="基带"
              prop="model"
              min-width="25%"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="频率"
              min-width="25%"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{(scope.row.hz/1000).toFixed(2)}}GHZ</span>
              </template>
            </el-table-column>
            <el-table-column
              label="核心数"
              prop="core"
              min-width="25%"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="占用率"
              min-width="25%"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-progress :percentage="scope.row.percent"></el-progress>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="mem"
            style="width: 100%">
            <el-table-column
              label="内存总数"
              min-width="25%"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.total}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="已使用"
              min-width="25%"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.used}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="未使用"
              min-width="25%"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.free}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="使用率"
              min-width="25%"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-progress :percentage="scope.row.percent"></el-progress>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="storage.disk"
            style="width: 100%">
            <el-table-column
              label="磁盘分区"
              prop="device"
              min-width="12.5%"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="挂载位置"
              prop="device"
              min-width="12.5%"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="存储容量"
              prop="total"
              min-width="25%"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="已经使用"
              prop="used"
              min-width="12.5%"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="剩余容量"
              prop="free"
              min-width="12.5%"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="使用率"
              min-width="25%"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-progress :percentage="scope.row.percent"></el-progress>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </Detail-Box>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/Layout/PageTitle'
import DetailBox from '../components/Layout/DetailBox'
import {bytesToSize} from '../config/utils'

export default {
  data () {
    return {
      storage: {},
      cpu: [],
      mem: [],
      loading: true,
    }
  },
  components: {
    PageTitle,
    DetailBox
  },
  created() {
    this.init()
  },
  computed: {
    time() {
      let time = ""
      if(this.storage.timefromboot){
        if(this.storage.timefromboot.days){
          time += this.storage.timefromboot.days + "天"
        }
        if(this.storage.timefromboot.hours){
          time += this.storage.timefromboot.hours + "小时"
        }
        if(this.storage.timefromboot.minutes){
          time += this.storage.timefromboot.minutes + "分"
        }
        if(this.storage.timefromboot.seconds){
          time += this.storage.timefromboot.seconds + "秒"
        }
        return time
      }
    },
    hz() {
      if(this.cpu.hz){
        console.log(this.cpu.hz);
        return this.cpu.hz
      }
    }
  },
  methods: {
    init() {
      this.$get( '/api/systeminspect/')
      .then((response) => {
        this.storage = response
        if(this.storage.cpu){
          this.cpu.push(this.storage.cpu)
        }
        if(this.storage.mem){
          this.storage.mem.free = this.storage.mem.free.slice(0,-3)
          this.storage.mem.total = this.storage.mem.total.slice(0,-3)
          this.storage.mem.used = this.storage.mem.total - this.storage.mem.free
          this.storage.mem.percent = Math.round(this.storage.mem.used / this.storage.mem.total * 10000) / 100.00
          this.storage.mem.free = bytesToSize(this.storage.mem.free * 1024)
          this.storage.mem.total = bytesToSize(this.storage.mem.total * 1024)
          this.storage.mem.used = bytesToSize(this.storage.mem.used * 1024)
          this.mem.push(this.storage.mem)
        }
        if(this.storage.disk){
          this.storage.disk.forEach(item => {
            item.free = bytesToSize(item.free)
            item.total = bytesToSize(item.total)
            item.used = bytesToSize(item.used)
          })
        }
        this.loading = false
      }).catch(err => {

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.sysmanage{
  .wrapper{
    margin: 20px;
    .box{
      border: none;
    }
  }
}
</style>
