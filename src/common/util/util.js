export class BossUtil {
  constructor() {}

  /**
   * 生成guid
   * @returns {string}
   */
  static guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * 深度复制两个对象
   * @param obj
   * @returns {any}
   */
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    return JSON.parse(JSON.stringify(obj));
  }
  // 深拷贝
  static deepCopy(p, c = {}) {
    for (var i in p) {
      if (!p.hasOwnProperty(i)) {
        continue;
      }
      if (typeof p[i] === 'object') {
        c[i] = p[i].constructor === Array ? [] : {};
        this.deepCopy(p[i], c[i]);
      } else {
        c[i] = p[i];
      }
    }
    return c;
  }

  /*
   * Comments:隐藏手机号中间四位
   * Param phoneNum * phoneNum:手机号
   * @Return string:处理后的手机号
   */
  static hiddenPhoneNum(phoneNum) {
    phoneNum = phoneNum.substr(0, 3) + '****' + phoneNum.substr(7);
    return phoneNum;
  }

  /**
   * 检测手机号是否合法
   *
   * @param {string} selector 选择器(例如：'#btn','.btn','input[type=text]')
   * @param {boolean}  格式正确返回true，不符合/为空 返回false。
   */
  static isMobileNumber(selector) {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    let ipt = document.querySelector(selector);
    ipt.onblur = function() {
      if (reg.test(ipt.value)) {
        return true;
      } else {
        return false;
      }
    };
  }

  /**
   * 验证邮箱格式是否规范（支持大小写字母、数字、下划线及中划线）
   *
   * @param {string} selector 选择器(例如：'#btn','.btn','input[type=text]')
   * @param {boolean}  符合规定格式返回true，不符合/为空 返回false。
   */
  static isEmail(selector) {
    let email = document.querySelector(selector);
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (email.value) {
      return reg.test(email.value);
    } else {
      return false;
    }
  }
  static GetAgeByBirthday(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split('-');
    var birthYear = parseInt(strBirthdayArr[0]);
    var birthMonth = parseInt(strBirthdayArr[1]);
    var birthDay = parseInt(strBirthdayArr[2]);

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear === birthYear) {
      returnAge = 0; // 同年 则为0岁
    } else {
      var ageDiff = nowYear - birthYear; // 年之差
      if (ageDiff > 0) {
        if (nowMonth === birthMonth) {
          var dayDiff = nowDay - birthDay; // 日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birthMonth; // 月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge; // 返回周岁年龄
  }
  // 判断是否是对象
  static isObject(o) {
    return o.constructor.name === 'Object';
  }
  // 判断是否是数组
  static isArray(a) {
    return Array.isArray(a);
  }
  // 判断是否是数字
  static isNumber(a) {
    if (Object.is(a, NaN)) return false;
    return !isNaN(a);
  }
  // 判断是否是字符串
  static isString(s) {
    return s.constructor.name === 'String';
  }
  // 判断是否是日期
  static isDate(d) {
    return d.constructor.name === 'Date';
  }
}
