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

Vue.use(VueCookies);
Vue.use(ElementUI);
Vue.prototype.$store = store;
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  var token = store.getters.gettoKen;
  
  if (token == '' || token == null) {
    //token为空的时候
    if (to.name == 'Login' || to.name == 'Register' || to.name == 'ForgotPassword') {
      next()
    } else {
      next('/Login')
    }
  } else {
    if (token) {
      var userInfo = store.getters.getUserInfo;
      // 侧边栏状态持久化
      sidebar.map((item, index) => {
        if (to.name == item.name) {
          store.dispatch('setDefaultActive',item.Active)
        }
      })
      // 资质认证管理
      if(to.name != 'QualityApproval' && to.name != 'ApproveFaild'){
        if(userInfo.hasCredient == '-1'){
          next('/QualityApproval')
        }
        if(userInfo.hasCredient == '0' || userInfo.hasCredient == '2'){
          next('/ApproveFaild')
        }
      }
      if(to.name == 'QualityApproval'){
        if(userInfo.hasCredient == '0' || userInfo.hasCredient == '2'){
          next('/ApproveFaild')
        }
      }
      if (to.name == 'Login' || to.name == 'Register' || to.name == 'ForgotPassword') {
        next('/')
      }
    }
    next();
  }
});

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
