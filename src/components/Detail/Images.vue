<template>
  <div class="image-list">
    <swiper v-if="images.length" :options="swiperOption">
      <swiper-slide v-for="(img, index) in images" key="index" class="image-wrapper">
        <img :src="img.src" @click="show(img)">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <div v-else class="info">
      {{text}}
    </div>
    <transition name="fade">
      <div v-show="active" class="show-img" @click="hide">
        <img :src="activeImg" class="img">
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: false,
        activeImg: '',
        swiperOption: {
          slidesPerView: 3,
          /*centeredSlides: true,*/
          spaceBetween: 30,
          slidesPerGroup: 3,
          loop: false,
          loopFillGroupWithBlank: true,
          grabCursor: true,
          autoplay: {
            delay: 5000,
            /*disableOnInteraction: true*/
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            1200: {
              slidesPerView: 2,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 30
            }
          }
        }
      }
    },
    created() {
      /*this.changeSlide()*/
    },
    props: {
      images: Array,
      text: String
    },
    methods: {
      show(img) {
        this.active = true
        this.activeImg = img.src
      },
      hide() {
        this.active = false
        this.activeImg = ""
      }
      /*changeSlide() {
        if(!this.images[2] && !this.images[1]){
          this.$set(this.swiperOption, 'slidesPerView', 1);
          this.$set(this.swiperOption, 'slidesPerGroup', 1);
          this.$set(this.swiperOption, 'loop', false);
        }else if(!this.images[2] && this.images[1] && this.images[0]){
          this.$set(this.swiperOption, 'slidesPerView', 2);
          this.$set(this.swiperOption, 'slidesPerGroup', 2);
          this.$set(this.swiperOption, 'loop', false);
        }
      }*/
    }
  }
</script>
<style lang="less">

.image-list{
  position: relative;
  .image-wrapper{
    text-align: center;
    img{
      width: 180px;
      height: 320px;
    }
  }
  .show-img{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    opacity: 1;
    background: rgba(7,17,27,0.5);
    cursor: grab;
    &.fade-enter-active, &.fade-leave-active{
      transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-active{
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
    .img{
      position: absolute;
      width: 320px;
      height: 480px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>