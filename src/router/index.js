
import Vue from 'vue'
import Router from 'vue-router'
//引入路由组件
import Index from '@/components/Index'
import Login from '@/components/pages/login/Login'
import Register from '@/components/pages/register/Register'
import ForgotPassword from '@/components/pages/forgotPassword/ForgotPassword'
import Approve from '@/components/pages/approval/Approve'
import QualityApproval from '@/components/pages/approval/QualityApproval'
import ApproveFaild from '@/components/pages/approval/ApproveFaild'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/QualityApproval',
      name: 'QualityApproval',
      component: QualityApproval
    },
    {
      path: '/Approve',
      name: 'Approve',
      component: Approve
    },
    {
      path: '/ApproveFaild',
      name: 'ApproveFaild',
      component: ApproveFaild
    },
    {
      path: '/',
      redirect: '/index',
      name: 'Index',
      component: Index,
      children: [
        //首页路由
        { path: '/index', name: "Home", component: (resolve) => require(['@/components/pages/home/Home'], resolve), meta: { title: "首页" } },
        { path: '/ChangePassword', name: "ChangePassword", component: (resolve) => require(['@/components/pages/home/changePassword/ChangePassword'], resolve), meta: { title: "修改密码" } },
        { path: '/ElectricityManagement', name: "ElectricityManagement", component: (resolve) => require(['@/components/pages/home/electricityManagement/ElectricityManagement'], resolve), meta: { title: "电费管理" } },
        { path: '/StageElectricity', name: "StageElectricity", component: (resolve) => require(['@/components/pages/home/stageElectricity/StageElectricity'], resolve), meta: { title: "时段电价" } },
        { path: '/CouponManagement', name: "CouponManagement", component: (resolve) => require(['@/components/pages/home/couponManagement/CouponManagement'], resolve), meta: { title: "优惠券管理" } },
        { path: '/CouponDetails', name: "CouponDetails", component: (resolve) => require(['@/components/pages/home/couponManagement/CouponDetails'], resolve), meta: { title: "优惠券管理" } },
        { path: '/BranchAccount', name: "BranchAccount", component: (resolve) => require(['@/components/pages/home/branchAccount/BranchAccount'], resolve), meta: { title: "子账号管理" } },
        { path: '/RoleManagement', name: "RoleManagement", component: (resolve) => require(['@/components/pages/home/roleManagement/RoleManagement'], resolve), meta: { title: "角色管理" } },
        { path: '/CompanyInformation', name: "CompanyInformation", component: (resolve) => require(['@/components/pages/home/companyInformation/CompanyInformation'], resolve), meta: { title: "公司信息" } },
        { path: '/StationManagement', name: "StationManagement", component: (resolve) => require(['@/components/pages/home/stationManagement/StationManagement'], resolve), meta: { title: "桩站管理" } },
        { path: '/ElectricityBills', name: "ElectricityBills", component: (resolve) => require(['@/components/pages/home/electricityBills/ElectricityBills'], resolve), meta: { title: "用电账单" } },
        { path: '/ElectricityBillDetails', name: "ElectricityBillDetails", component: (resolve) => require(['@/components/pages/home/electricityBills/ElectricityBillDetails'], resolve), meta: { title: "用电账单详情" } },
        { path: '/MoneyBills', name: "MoneyBills", component: (resolve) => require(['@/components/pages/home/moneyBills/MoneyBills'], resolve), meta: { title: "资金账单" } },
        { path: '/MoneyBillDetails', name: "MoneyBillDetails", component: (resolve) => require(['@/components/pages/home/moneyBills/MoneyBillDetails'], resolve), meta: { title: "资金账单详情" } },
      ]
    }
  ]
})
