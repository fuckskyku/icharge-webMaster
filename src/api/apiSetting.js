import Vue from "vue";
import axios from "axios";
import Qs from "qs";
import router from "../router";
import store from '../Store/store';

let cancel,
promiseArr = {};
const CancelToken = axios.CancelToken;
const TOKEN = store.getters.gettoKen;
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) { 
    return config;
  },
  function(error) {
    // 请求错误 do something
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 响应数据 do something
    // console.log('response',response.headers['access-control-expose-headers'])
    if(response.headers['access-control-expose-headers']){
      store.commit('sessionId',response.headers['access-control-expose-headers'])
    }
    if (response.data.code == 412) {
      router.push("/Login");
    }
    return response;
  },
  function(error) {
    // 对响应错误 do something
    // console.log(error)
    return Promise.reject(error);
  }
);

export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url,
        params: param,
        headers: { TOKEN },
        cancelToken: new CancelToken(function(c) {
          cancel = c; // 记录当前请求的取消方法
        })
      }).then(res => {
        resolve(res);
      });
    });
  },

  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        transformRequest: [
          function(data) {
            // 对 data 进行任意转换处理
            // console.log(Qs.stringify(data))
            // console.log(JSON.stringify(data))
            return Qs.stringify(data);
          }
        ],
        data: param,
        headers: { TOKEN },
        cancelToken: new CancelToken(function(c) {
          cancel = c; // 记录当前请求的取消方法
        })
      }).then(res => {
        resolve(res);
      });
    });
  },

  //postJson请求
  postJson(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param,
        headers: { TOKEN, "Content-Type": "application/json" },
        cancelToken: new CancelToken(function(c) {
          cancel = c; // 记录当前请求的取消方法
        })
      }).then(res => {
        resolve(res);
      });
    });
  }
};
