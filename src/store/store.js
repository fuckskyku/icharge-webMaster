import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);
//数据
const state = {
  defaultActive: '1',
  isClose: false,
  ak: 'y91uy4TfvQO6zYl3hR8Vb07rFaK69T7I',
  sessionId: '', //登录凭证
  token: '', //880A367FF38E46DF826C517294D8A386
  userInfo: {
    userId: '', //用户ID
    token: '', //token
    nickName: '', //昵称
    userName: '', //	用户名
    expirationDate: '', //过期时间
    staId: '', //桩站ID
    hasCredient: '', //资质认证（-1：表示没有资质认证 0：待审 1：审核通过 2：审核不通过）
    mobile: "",
  },
  companyInfo: {
    userId: "",
    licenceName: "",
    staId: "",
    licenceCode: "",
    licenceImg: "",
    managerName: "",
    managerIdcardNo: "",
    managerHandIdcardImg: "",
    bankName: "",
    bankCard: "",
    bankAdress: "",
    staAdress: "",
    remarks: "",
    staLat: "",
    staLng: "",
    status: "",
    createTime: "",
  },
  stationPrice: {
    electricityPrice: "",
    servicePrice: ""
  }
}

//获取数据（自定义过滤计算）
const getters = {
  getDefaultActive: state => state.defaultActive,
  getSessionId: state => state.sessionId,
  gettoKen: state => state.token,
  getIsClose: state => state.isClose,
  getUserInfo: state => state.userInfo,
  getCompanyInfo: state => state.companyInfo,
  getStationPrice: state => state.stationPrice,
}

//提交方法
const mutations = {
  //清空方法
  clearStore(state) {
    if (state) {
      state.sessionId = ''
      state.token = ''
      state.userInfo.userId = ''
      state.userInfo.token = ''
      state.userInfo.nickName = ''
      state.userInfo.userName = ''
      state.userInfo.expirationDate = ''
      state.userInfo.staId = ''
      state.userInfo.hasCredient = ''
      state.userInfo.mobile = ''
      state.companyInfo.userId = ''
      state.companyInfo.licenceName = ''
      state.companyInfo.staId = ''
      state.companyInfo.licenceCode = ''
      state.companyInfo.licenceImg = ''
      state.companyInfo.managerName = ''
      state.companyInfo.managerIdcardNo = ''
      state.companyInfo.managerHandIdcardImg = ''
      state.companyInfo.bankCard = ''
      state.companyInfo.bankAdress = ''
      state.companyInfo.staAdress = ''
      state.companyInfo.remarks = ''
      state.companyInfo.staLat = ''
      state.companyInfo.staLng = ''
      state.companyInfo.status = ''
      state.companyInfo.createTime = ''
      state.stationPrice.electricityPrice = ''
      state.stationPrice.servicePrice = ''
    }
  },
  defaultActive(state, value) {
    state.defaultActive = value;
  },
  isClose(state, value) {
    state.isClose = value;
  },
  sessionId(state, value) {
    state.sessionId = value;
  },
  token(state, value) {
    state.token = value;
  },
  userInfo(state, obj) {
    obj.forEach((item) => {
      Vue.set(state.userInfo, item.key, item.value);
    })
  },
  companyInfo(state, obj) {
    obj.forEach((item) => {
      Vue.set(state.companyInfo, item.key, item.value);
    })
  },
  stationPrice(state, obj) {
    obj.forEach((item) => {
      Vue.set(state.stationPrice, item.key, item.value);
    })
  },
};

//提交拦截
const actions = {
  //清空方法
  setClearStore(state) {
    state.commit('clearStore');
  },
  setAPPid(state, value) {
    state.commit('APPid', value);
  },
  setAppSecret(state, value) {
    state.commit('AppSecret', value);
  },
  setIsClose(state, value) {
    state.commit('isClose', value);
  },
  setSessionId(state, value) {
    state.commit('sessionId', value);
  },
  setDefaultActive(state, value) {
    state.commit('defaultActive', value);
  },
  setToKen(state, value) {
    state.commit('token', value)
  },
  setUserInfo(state, obj) {
    state.commit("userInfo", obj);
  },
  setCompanyInfo(state, obj) {
    state.commit("companyInfo", obj);
  },
  setStationPrice(state, obj) {
    state.commit("stationPrice", obj);
  },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  plugins: [createPersistedState()],
  // plugins: [createPersistedState({
  //   storage: window.sessionStorage
  // })],
  mutations
});
