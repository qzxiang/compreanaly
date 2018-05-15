<template>
  <div class="dyn-wrapper">
    <div class="title">
      动态行为分析
    </div>
    <div class="chart" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
      <p class="ctt" v-if="dynbehaviors.length == 0 && loading==false">暂无数据</p>
      <div id="dyn" style="height: 100%;" v-else></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {translate} from '../../config/translate'

export default {
  data() {
    return {
      dynbehaviors: [],
      seriesName: [],
      seriesNum: [],
      loading: true
    }
  },
  created(){

  },
  mounted(){
    this.init()
  },
  computed: {

  },
  methods: {
    init(){
      this.$get( '/api/statistics/?field=scenbehaviors.name')
      .then((response) => {
        this.dynbehaviors = response
        this.dynbehaviors.forEach((item, index) => {
          let objName = {}
          let objNum = {}
          let translation = translate()
          objName = translation[item.key]
            ? translation[item.key]
            : item.key
          objNum = item.doc_count
          this.seriesName.push(objName)
          this.seriesNum.push(objNum)
        })
        this.loading = false
        if(this.dynbehaviors.length > 0){
          this.initData()
        }
      }).catch(err => {
        //this.loading = false
      })
    },
    initData(){
      // 指定图表的配置项和数据
      var option = {
        color: ['#FD631F'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '5%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        yAxis : [
            {
                type : 'value',
                splitNumber: 1
            }
        ],
        xAxis : [
            {
                type : 'category',
                data : this.seriesName,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel:{
                  interval: 0,
                  rotate: 20
                }
            }
        ],
        series : [
            {
                name:'数量',
                type:'bar',
                barWidth: '30%',
                data: this.seriesNum
            }
        ]
    };
      this.loading = false
      // 使用刚指定的配置项和数据显示图表。
      this.dyn = echarts.init(document.getElementById('dyn'))
      this.dyn.setOption(option);
      const self = this;
      window.addEventListener("resize", function () {
        self.dyn.resize();
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';
.dyn-wrapper{
  height: 320px;
  padding: 20px 10px;
  .title{
    height: 10%;
    padding: 10px;
    border: 1px solid #ebebeb;
    border-bottom: none;
    font-size: 14px;
    font-weight: 700;
  }
  .chart{
    position: relative;
    height: 90%;
    border: 1px solid #ebebeb;
    border-top: none;
    p{
      color: #808E94;
      font-size: 16px;
    }
  }
}

</style>
