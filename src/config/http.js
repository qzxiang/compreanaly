import Vue from 'vue';
import axios from 'axios';
import {baseUrl} from '@/config/env'
import { Message } from 'element-ui';
import router from '../router'

axios.defaults.timeout = 30000;
axios.defaults.baseURL = baseUrl;
Vue.component(Message.name, Message)

//http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    let headers = response.headers
    if(headers["refresh-token"]){
      localStorage.setItem('token', headers["refresh-token"]);
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        /*case 404:
          Message.error("请求异常");
          break
        case 500:
          Message.error("服务器连接异常");
          break
        case 504:
          Message.error("服务器连接异常");
          break*/
        case 401:
          localStorage.removeItem('token');
          Message.warning("登录过期，请重新登陆");
          router.replace({
            path: '/',
          })
          break
      }
    }
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={},timeout){
  return new Promise((resolve,reject) => {
    axios({
      url: url,
      method: 'get',
      params: params,
      timeout: timeout || axios.defaults.timeout
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}, timeout){
   return new Promise((resolve,reject) => {
      axios({
        url: url,
        method: 'post',
        data: data,
        timeout: timeout || axios.defaults.timeout
      }).then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
   })
 }

 /**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}