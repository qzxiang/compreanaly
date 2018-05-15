<template>
  <ul class="steps-wrapper">
    <li class="steps_floor" :class="{'active': steps.active == index}" v-for="(step, index) in steps.step" @click="jump(index)">
      <div class="floor_icon" :class="{'active': steps.active == index}"></div>
      <p class="floor_text">{{step}}</p>
    </li>
  </ul>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  props: {
    steps: Object
  },
  created(){

  },
  computed: {

  },
  methods: {
    jump(index){
      this.$emit("floor", index);
    }
  }
}
</script>

<style lang="less">
.steps-wrapper{
  cursor: pointer;
  @media screen{
    padding-right: 20px;
    @media(max-width:767px){
      padding-right: 0;
    }
  }
  .steps_floor{
    position: relative;
    padding-left: 30px;
    height: 35px;
    font-size: 14px;
    &:hover{
      color: #408eba;
      font-weight: 700;
    }
    &:before{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #e6ebf5;
      left: 4px;
      z-index: 100;
    }
    &:first-child:before{
      width: 2px;
      top: 15px;
    }
    &:last-child:before{
      width: 2px;
      height: 5px;
    }
    &.active{
      color: #408eba;
      font-weight: 700;
    }
    .floor_icon{
      position: absolute;
      width: 10px;
      height: 10px;
      border: 2px solid #408eba;
      top: 5px;
      left: 0px;
      border-radius: 10px;
      z-index: 1000;
      box-sizing: border-box;
      &.active{
        background: #408eba;
      }
      &:hover{
        background: #408eba;
      }
    }
    .floor_text{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      @media screen{
        @media(max-width:767px){
          display: none;
        }
      }
    }
  }
}
</style>
