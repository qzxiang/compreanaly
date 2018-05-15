<template>
  <div class="real-time" >
    <p class="title">实时分析数据</p>
    <div class="box" @mouseover="enter" @mouseout="leave" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
      <p class="ctt" v-if="statistics.length == 0 && loading==false">暂无数据</p>
      <ul id="con1" ref="con1" :class="{anim:animate==true}" v-else>
        <li v-for='item in datas' @click="view(item.id)">
          <el-tooltip placement="top">
            <div slot="content">《{{item.appname}}》应用有{{item.text}}</div>
            <span>《{{item.appname}}》应用有{{item.text}}</span>
          </el-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import router from '../../router'
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      animate:false,
      datas:[],
      statistics:[],
      num: 0,
      flaws_state: false,
      behaviors_state: false,
      payware_state: false,
      adware_state: false,
      clock: '',
      number: 0,
      loading: true
    }
  },
  created(){
    this.init()
  },
  methods: {
    scroll(){
      if(this.datas.length > 7 ){
        this.animate=true;// 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      }
      setTimeout(()=>{
        if(this.datas.length == 7){
          if(this.num == this.statistics.length){
            this.num = 0
          }
          this.datas.push(this.statistics[this.num])
          this.num++
        }else if(this.datas.length == 8){
          if(this.num == this.statistics.length){
            this.num = 0
          }
          this.datas.push(this.statistics[this.num])
          this.datas.shift()   //删除数组的第一个元素
          this.animate= false  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
          this.num++
        }
      },1000)
    },
    getStatistics(){
      this.$get( '/api/statisticsreal/')
      .then((response) => {
        if(response && response.length > 0){
          response.forEach(app =>{
            //判断漏洞行为
            if(app.securityflaws && app.securityflaws.length > 0){
              app.securityflaws.forEach(flaws =>{
                let flaws_data = flaws + "漏洞"
                let obj = {"appname":app.appname,"text": flaws_data,"id":app.id}
                if(this.statistics.length == 0){
                  this.statistics.unshift(obj)
                }else{
                  this.statistics.every(item =>{
                    if(item.appname == app.appname && item.text == flaws_data){
                      this.flaws_state = true
                      return false
                    }
                    return true
                  })
                  if(!this.flaws_state){
                    this.statistics.unshift(obj)
                  }
                  this.flaws_state = false
                }
              })
            }
            //判断场景化行为
            if(app.scenbehaviors && app.scenbehaviors.length > 0){
              app.scenbehaviors.forEach(behavior =>{
                let behavior_data = behavior + "行为"
                let obj = {"appname":app.appname,"text": behavior_data,"id":app.id}
                if(this.statistics.length == 0){
                  this.statistics.unshift(obj)
                }else{
                  this.statistics.every(item =>{
                    if(item.appname == app.appname && item.text == behavior_data){
                      this.behaviors_state = true
                      return false
                    }
                    return true
                  })
                  if(!this.behaviors_state){
                    this.statistics.unshift(obj)
                  }
                  this.behaviors_state = false
                }
              })
            }
            //判断支付件
            if(app.payware && app.payware.length > 0){
              app.payware.forEach(pay =>{
                let pay_data = pay + "支付件"
                let obj = {"appname":app.appname,"text": pay_data,"id":app.id}
                if(this.statistics.length == 0){
                  this.statistics.unshift(obj)
                }else{
                  this.statistics.every(item =>{
                    if(item.appname == app.appname && item.text == pay_data){
                      this.payware_state = true
                      return false
                    }
                    return true
                  })
                  if(!this.payware_state){
                    this.statistics.unshift(obj)
                  }
                  this.payware_state = false
                }
              })
            }
            //判断广告件
            if(app.adware && app.adware.length > 0){
              app.adware.forEach(ad =>{
                let ad_data = ad + "广告件"
                let obj = {"appname":app.appname,"text": ad_data,"id":app.id}
                if(this.statistics.length == 0){
                  this.statistics.unshift(obj)
                }else{
                  this.statistics.every(item =>{
                    if(item.appname == app.appname && item.text == ad_data){
                      this.adware_state = true
                      return false
                    }
                    return true
                  })
                  if(!this.adware_state){
                    this.statistics.unshift(obj)
                  }
                  this.adware_state = false
                }
              })
            }
          })
        }
        this.datas = this.statistics.slice(0,7)
        this.num = this.datas.length
        this.loading = false
      }).catch(err => {
        //this.loading = false
        console.log(err);
      })
    },
    init(){
      this.getStatistics()
      this.scroll()
      this.clock = setInterval(this.scroll,2000)
    },
    enter(){
      clearInterval(this.clock)
    },
    leave(){
      this.clock = setInterval(this.scroll,2000)
    },
    view(id){
      this.$router.push({
        path: '/apkdetail',
        query: {
          id: id,
        }
      })
    }
  },
  destroyed() {
    /*关闭定时器*/
    clearInterval(this.clock)
  }
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';
.real-time{
  margin: 20px 10px;
  border: 1px solid #ebebeb;
  height: 340px;
  .title{
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 700;
    height: 30px;
  }
  .box{
    position: relative;
    overflow: hidden;
    height: 300px;
    cursor: pointer;
    .anim{
      transition: all 0.5s;
      margin-top: -43px;
    }
    #con1 li{
      list-style: none;
      line-height: 35px;
      height: 35px;
      margin: 0 5px 7px 5px;
      padding-left: 5px;
      color: #808E94;
      border-bottom: 1px solid #ccc;
      font-size: 8px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      &:hover{
        color: #000;
      }
    }
    p{
      color: #808E94;
      font-size: 16px;
    }
  }
}
</style>
