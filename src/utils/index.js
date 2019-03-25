
//获取cookie、
export function getCookie(value) {
  var arr, reg = new RegExp("(^| )" + value + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

/**
 * 验证必填元素
 */
export function required(value, param) {
    if (!this.depend(param)) {
      return 'dependency-mismatch'
    } else if (typeof value === 'number') {
      value = value.toString()
    } else if (typeof value === 'boolean') {
      return !0
    }
  
    return value.length > 0
  }
  /**
   * 验证电子邮箱格式
   */
  export function email(value) {
    return this.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
  }
  /**
   * 验证手机格式
   */
  export function tel(value) {
    return this.optional(value) || /^1[3456789]\d{9}$/.test(value)
  }
  /**
   * 验证URL格式
   */
  export function url(value) {
    return this.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
  }
  /**
   * 验证日期格式
   */
  export function date(value) {
    return this.optional(value) || !/Invalid|NaN/.test(new Date(value).toString())
  }
  /**
   * 验证ISO类型的日期格式
   */
  export function dateISO(value) {
    return this.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
  }
  /**
   * 验证十进制数字
   */
  export function number(value) {
    return this.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
  }
  /**
   * 验证整数
   */
  export function digits(value) {
    return this.optional(value) || /^\d+$/.test(value)
  }
  /**
   * 验证身份证号码
   */
  export function idcard(value) {
    return this.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
  }
  /**
   * 验证两个值的内容是否相同
   */
  export function equalTo(value, param) {
    return (this.optional(value) && this.optional(param)) || value == param
  }
  /**
   * 验证是否包含某个值
   */
  export function contains(value, param) {
    return this.optional(value) || value.indexOf(param) >= 0
  }
  /**
   * 验证最小长度
   */
  export function minlength(value, param) {
    return this.optional(value) || value.length >= param
  }
  /**
   * 验证最大长度
   */
  export function maxlength(value, param) {
    return this.optional(value) || value.length <= param
  }
  /**
   * 验证一个长度范围[min, max]
   */
  export function rangelength(value, param) {
    return this.optional(value) || (value.length >= param[0] && value.length <= param[1])
  }
  /**
   * 验证最小值
   */
  export function min(value, param) {
    return this.optional(value) || value >= param
  }
  /**
   * 验证最大值
   */
  export function max(value, param) {
    return this.optional(value) || value <= param
  }
  /**
   * 验证一个值范围[min, max]
   */
  export function range(value, param) {
    return this.optional(value) || (value >= param[0] && value <= param[1])
  }
  /**
   * 判断规则依赖是否存在
   */
  export function depend(param) {
    switch (typeof param) {
      case 'boolean':
        param = param
        break
      case 'string':
        param = !!param.length
        break
      case 'function':
        param = param()
      default:
        param = !0
    }
    return param
  }
  
  /**
   * 判断输入值是否为空
   */
  export function optional(value) {
    return !this.required(value) && 'dependency-mismatch'
  }
  
  /**
   * 数组对象对比
   */
  export function arrCompare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
  }
  
  //替换图片路径
export function formatImgUrl(imgUlr) {
  if (imgUlr != "" && imgUlr != "undefined" && imgUlr) {
    if (this.url(imgUlr)) {
      return imgUlr;
    } else {
      // return "https://admin.school.mseenet.com" + imgUlr;
       return "http://img.mseenet.com/" + imgUlr;
    }
  }
  return '';
}
  export default {
    formatImgUrl,
    /* 验证 */
    required,
    tel,
    email,
    url,
    date,
    dateISO,
    number,
    digits,
    idcard,
    equalTo,
    contains,
    minlength,
    maxlength,
    rangelength,
    min,
    max,
    range,
    depend,
    optional,  
    /* 验证 结束*/
    arrCompare,
  
  }
  