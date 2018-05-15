<template>
  <div class="danger">
    <div v-if="type == 'security'">
      <span></span>
      <a class="item" :class="{'active': item.state==true}" v-for="(item, index) in risks" @click="hide(index)">
        <span class="img" :class="item.style"></span>
        <b>{{item.text}}</b>
      </a>
    </div>
    <div v-else-if="type == 'dyn'">
      <span></span>
      <a class="item" :class="{'active': item.state==true}" v-for="(item, index) in risks" @click="dyhide(index)">
        <span class="img" :class="item.style"></span>
        <b>{{item.text}}</b>
      </a>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        risks: [
          {
          text: '高危',
          style: 'high',
          state: true
          },
          {
          text: '中危',
          style: 'medium',
          state: true
          },
          {
          text: '低危',
          style: 'low',
          state: true
          }
        ]
      }
    },
    props: {
      selectType: Number,
      type: String
    },
    created(){

    },
    computed: {

    },
    methods: {
      hide(index) {
        this.risks[index].state = !this.risks[index].state;
        this.$emit("riskHide", index, this.risks[index].state, this.selectType);
      },
      dyhide(index) {
        this.risks[index].state = !this.risks[index].state;
        this.$emit("dyRiskHide", index, this.risks[index].state, this.selectType);
      }
    }
  }
</script>

<style lang="less" scoped>
@import '../../style/mixin';
.danger{
  margin: 10px 50px;
  .item{
    margin-right: 15px;
    color: #ccc;
    cursor: pointer;
    &:hover{
      color: #ccc;
    }
    .img{
      border-radius:50px;
      padding: 1px 20px 1px 20px;
      box-sizing:border-box;
    }
    .high{
      background-color: #dd4b39;
    }
    .medium{
      background-color: #f39c12;
    }
    .low{
      background-color: #0073b7;
    }
  }
  .active{
    color: #000;
  }
}
</style>
