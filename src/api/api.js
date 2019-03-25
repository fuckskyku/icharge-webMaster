import api from './apiSetting'

/**
 * 
 * @param {桩站管理后台接口抛出}
 * 
 */ 

//发送手机验证码
export const getPhoneCode = param => { return api.get('/charge/getPhoneCode', param) }

//操作第一步判断验证码是否正确
export const firstoperate = param => { return api.post('/station/firstoperate', param) }

//图形验证码接口
export const captcha = param => { return api.get('/station/captcha', param) }

//桩站注册
export const register = param => { return api.post('/station/register', param) }

//登录
export const login = param => { return api.post('/station/login', param) }

//验证手机号码是否注册过
export const isregistermobile = param => { return api.get('/station/isregistermobile', param) }

//忘记密码
export const forgetpassword = param => { return api.post('/station/forgetpassword', param) }

//退出登录
export const logout = param => { return api.post('/station/logout', param) }

//获取优惠券列表
export const getcouponlist = param => { return api.get('/station/getcouponlist', param) }

//获取优惠券详情
export const getstationcoupondetail = param => { return api.get('/station/getstationcoupondetail', param) }

//新建优惠券
export const addcoupon = param => { return api.post('/station/addcoupon', param) }

//获取桩站公司信息详情
export const getStationUserInfo = param => { return api.get('/station/getStationUserInfo', param) }

//获取用电记录列表
export const getchargeorderlist = param => { return api.get('/station/getchargeorderlist', param) }

//获取用电账单详情
export const getchargeorderdetail = param => { return api.get('/station/getchargeorderdetail', param) }

//获取电站终端列表
export const getClientList = param => { return api.get('/station/getClientList', param) }

//桩站资质认证提交资料
export const editStationUserInfo = param => { return api.post('/station/editStationUserInfo', param) }

//获取资金记录列表
export const getstationchargespendloglist = param => { return api.get('/station/getstationchargespendloglist', param) }

//获取资金流水详情
export const getstaitionchargespendlogdetail = param => { return api.get('/station/getstaitionchargespendlogdetail', param) }

//设置桩站的时段电价
export const settingstationtimeintervalprice = param => { return api.post('/station/settingstationtimeintervalprice', param) }

//设置桩站电价
export const settingstationprice = param => { return api.post('/station/settingstationprice', param) }

//获取时段电价列表
export const getstationintervalpricelist = param => { return api.get('/station/getstationintervalpricelist', param) }

//删除时段电价
export const deletestationtimeintervalprice = param => { return api.get('/station/deletestationtimeintervalprice', param) }

//获取角色列表
export const getRoleList = param => { return api.get('/station/getRoleList', param) }

//新增/编辑角色
export const editRole = param => { return api.post('/station/editRole', param) }

//删除角色
export const delRole = param => { return api.get('/station/delRole', param) }

//获取角色信息
export const getRoleDetail = param => { return api.get('/station/getRoleDetail', param) }

//编辑权限
export const editPermission = param => { return api.post('/station/editPermission', param) }

//删除权限
export const delPermission = param => { return api.get('/station/delPermission', param) }

//获取权限列表
export const getPermissionList = param => { return api.get('/station/getPermissionList', param) }

//获取权限详情
export const getPermissionDetail = param => { return api.get('/station/getPermissionDetail', param) }

//获取银行列表
export const getbanklist = param => { return api.get('/charge/getbanklist', param) }

//获取地区列表
export const getcity = param => { return api.get('/charge/getcity', param) }

//获取七牛Token
export const getQiniuToken = param => { return api.get('/charge/getQiniuToken', param) }
