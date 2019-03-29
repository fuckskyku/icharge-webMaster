import Vue from 'vue'
import App from './App'
import router from './router'
import store from './Store/store'
import VueCookies from 'vue-cookies'
import sidebar from './utils/sidebar'

//引入elementUI
import ElementUI from 'element-ui';
import {
  Loading
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import "animate.css"
// 引入公共样式
import "../src/assets/css/cssReset.css";
import "../src/assets/css/public.css";
// 引入存储方法
import util from './utils/util'

Vue.use(util);
Vue.use(VueCookies);
Vue.use(ElementUI);
Vue.prototype.$store = store;
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  var token = window.localStorage.getItem("GLOBAL_TOKEN");
  if (token == '' || token == null) {
    //token为空的时候，全局token也的等于空
    global.TOKEN = null;

    if (to.name == 'Login' || to.name == 'Register' || to.name == 'ForgotPassword') {
      next()
    } else {
      next('/Login')
    }
  } else {
    if (token) {
      if (to.name == 'Login' || to.name == 'Register' || to.name == 'ForgotPassword') {
        next('/')
      }
      //配置全局变量
      if (window.localStorage.getItem('GLOBAL_TOKEN') != null) {
        global.TOKEN = window.localStorage.getItem('GLOBAL_TOKEN');
      } else {
        global.TOKEN = null;
      }
      var userInfo = store.getters.getUserInfo;
      // 侧边栏状态持久化
      sidebar.map((item) => {
        if (to.name == item.name) {
          store.dispatch('setDefaultActive', item.Active)
        }
      })
      // 资质认证管理

      if (to.name != 'QualityApproval' && to.name != 'ApproveFaild' && to.name != 'Approve') {
        if (userInfo.hasCredient == '-1') {
          next('/QualityApproval')
        }
        if (userInfo.hasCredient == '0' || userInfo.hasCredient == '2') {
          next('/ApproveFaild')
        }
      }
      if (to.name == 'QualityApproval') {
        if (userInfo.hasCredient == '0' || userInfo.hasCredient == '2') {
          next('/ApproveFaild')
        }
      }
    }
    next();
  }
});

import {
  formatDate
} from "@/utils/date.js";
Vue.filter('formatDate', function (time) { //时间过滤
  var times = time * 1000
  var date = new Date(times);
  return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss');
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
})
