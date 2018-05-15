// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import {post,get,del,put} from './config/http'
import { store } from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
//截图轮播
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.prototype.$axios = Axios
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$del=del;
Vue.prototype.$put=put;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
/*访问页面之前验证token*/
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) {  // 获取当前的token是否存在
      next();
    }
    else {
      Vue.prototype.$message.warning('登录过期，请重新登录');
      next({
          path: '/',
      })
    }
  }
  else {
    next();
  }
})