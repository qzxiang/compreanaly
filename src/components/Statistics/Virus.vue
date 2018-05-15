<template>
  <div class="virus-wrapper">
    <div class="title">
      <el-row>
        <el-col :span="8">病毒信息统计</el-col>
        <el-col :span="16" class="count" v-if="virus.length>0">
          <p>已检测病毒种类：{{virus.length}}</p>
          <p>被感染应用总数：{{doc_num}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="chart" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
      <p class="ctt" v-if="virus.length == 0 && loading==false">暂无数据</p>
      <div id="circular" style="height: 100%;" v-else></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      virus: [],
      seriesData: [],
      loading: true
    }
  },
  created(){

  },
  mounted(){
    // this.circular = echarts.init(document.getElementById('circular'))
    this.init()
  },
  computed: {
    doc_num() {
      let num = 0
      this.virus.forEach((item) => {
        num += item.doc_count
      })
      return num
    },
    virus_num() {
      let num = 0
      if(this.virus.length){
        num = this.virus.length
      }
      return num
    }
  },
  methods: {
    init(){
      this.$get( '/api/statistics/?field=virusname&num=1000')
      .then((response) => {
        this.virus = response
        this.virus.forEach((item) => {
          let outObj = {};
          outObj.name = item.key;
          outObj.value = item.doc_count;
          this.seriesData.push(outObj);
          this.seriesData = this.seriesData.slice(0, 10)
        })
        this.loading = false
        if(this.virus.length > 0){
          this.initData()
        }
      }).catch(err => {
        //this.loading = false
      })
    },
    initData(){
      // 指定图表的配置项和数据
      var option = {
        title : {
          text: '感染应用病毒Top10',
          x:'center',
          top: 5,
          /*left: 5,*/
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: { //提示框组件
          trigger: 'item', //触发类型(饼状图片就是用这个)
          formatter: "{a} <br/>{b}<br/>数量：{c}<br/>占比：{d}%", //提示框浮层内容格式器
          textStyle: {
            fontSize: 8
          }
        },
        calculable : true,
        series: [ //系列列表
          {
            name:'病毒名称', //系列名称
            type:'pie', //类型 pie表示饼图
            center:['50%','50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
            radius: ['20%', '45%'], //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
            itemStyle : {  //图形样式
              normal : { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                label : {  //饼图图形上的文本标签
                  show : true,  //平常不显示
                  formatter:function(val){   //让series 中的文字进行换行
                    return val.name.split("/").join("/\n")
                  }
                },
                labelLine : {     //标签的视觉引导线样式
                  show : true  //平常不显示
                }
              },
              emphasis : {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                label : {  //饼图图形上的文本标签
                  show : true,
                  position : 'center',
                  textStyle : {
                    /*fontSize : '12',*/
                    fontWeight : 'bold'
                  }
                }
              }
            },
            data: this.seriesData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.circular = echarts.init(document.getElementById('circular'))
      this.circular.setOption(option);
      const self = this;
      window.addEventListener("resize", function () {
        self.circular.resize();
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';
.virus-wrapper{
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
  .count{
    text-align: right;
    p{
      margin-bottom: 5px;
    }
  }
  .chart{
    position: relative;
    height: 90%;
    border-left: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    p{
      color: #808E94;
      font-size: 16px;
    }
  }
}

</style>
