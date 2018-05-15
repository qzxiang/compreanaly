<template>
  <div class="application-wrapper">
    <p class="title">应用投放量统计</p>
    <div v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
      <div class="chart" v-if="count.length==0 && apk_n.length==0 && ios_n.length==0 && loading==false">
        <p class="ctt">暂无数据</p>
      </div>
      <div id="application" class="chart" v-else></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {formatDay} from '../../config/utils'

export default {
  data () {
    return {
      startDate: '',
      endDate: '',
      sevenDay: [],
      count: [],
      apk_n: [],
      ios_n: [],
      loading: true
    }
  },
  created(){

  },
  mounted(){
    //this.application = echarts.init(document.getElementById('application'));
    this.init();
  },
  computed: {

  },
  methods: {
    init(){
      const apiArr = []
      let self = this
      for (let i = 6; i > -1; i--) {
        const date = formatDay((new Date().getTime() - 86400000*i)/1000)
        this.sevenDay.push(date)
      }
      this.sevenDay.forEach(item => {
        apiArr.push(this.getCount(item))
      })
      this.$axios.all(apiArr)
      .then(this.$axios.spread(function (...res) {
        // 所有请求现在都执行完成
        res.forEach(item => {
          if (item.status == 0) {
            self.count.push(item.count)
            self.apk_n.push(item.apk_n)
            self.ios_n.push(item.count - item.apk_n)
          }
        })
        self.loading = false
        if(self.count.length>0 || self.apk_n.length>0 || self.ios_n.length>0){
          self.initData()
        }
      })).catch(err =>{
        //this.loading = false
      })
    },
    getCount(day) {
       return this.$get( '/api/statisticstask/?date=' + day )
    },
    initData(){
      // 指定图表的配置项和数据
      var option = {
        tooltip : {
          trigger: 'axis',
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '25%',
          bottom: '5%',
          containLabel: true,
        },
        calculable : true,
        legend: { //图例组件
          orient: 'horizontal', //布局  纵向布局 图例标记居文字的左边 vertical则反之
          width: 40, //图例组件的宽度,默认自适应
          x: 'right', //图例显示在右边
          bottom: '15%',
          itemWidth: 30,  //图例标记的图形宽度
          itemHeight: 5, //图例标记的图形高度
          data: ['应用分析量','IOS应用投放量','安卓应用投放量'],
          textStyle: {    //图例文字的样式
            color: '#5a5e66',  //文字颜色
            fontSize: 12    //文字大小
          }
        },
        xAxis : [
            {
                type : 'category',
                splitLine : {show : false},
                data : this.sevenDay,
                textStyle: {    //图例文字的样式
                  color: '#5a5e66',  //文字颜色
                  fontSize: 8    //文字大小
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                position: 'left'
            }
        ],
        series : [
            {
                name:'安卓应用投放量',
                type:'bar',
                tooltip : {trigger: 'item'},
                barWidth: '50%',
                stack: 'APP',
                data: this.apk_n,
                itemStyle:{
                  normal:{
                    color: "#46BEF2", //图标颜色
                  }
                }
            },
            {
                name:'IOS应用投放量',
                type:'bar',
                tooltip : {trigger: 'item'},
                barWidth: '50%',
                stack: 'APP',
                data: this.ios_n,
                itemStyle:{
                  normal:{
                    color: "#86CB71", //图标颜色
                  }
                }
            },
            {
                name:'应用分析量',
                type:'line',
                data: this.count,
                itemStyle:{
                  normal:{
                    color: "#F07C2B", //图标颜色
                  }
                }
            },
        ]
      }
      //this.loading = false
      // 使用刚指定的配置项和数据显示图表。
      this.application = echarts.init(document.getElementById('application'));
      this.application.setOption(option);
      const self = this;
      window.addEventListener("resize", function () {
        self.application.resize();
      });
    }
  }
}
</script>

<style lang="less">
@import '../../style/mixin';
.application-wrapper{
  margin: 20px 10px;
  border: 1px solid #ebebeb;
  .title{
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 700;
  }
  .chart{
    position: relative;
    height: 312px;
    p{
      color: #808E94;
      font-size: 16px;
    }
  }
}
</style>
