export default {
  /**
   * 去除空格
   * @param {String} str 需要去除空格的字符串
   */
  trim(str) {
    return str ? str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "") : "";
  },
  /**
   * 循环方法
   * @param {Array} arr 数组
   * @param {Function} handler  如果返回true，则中断不予返回
   */
  forEach(arr, handler) {
    if (!arr || !arr.length) return;
    for (let i = 0, l = arr.length; i < l; i++) {
      const item = arr[i];
      if (handler) {
        if (handler(item, i)) {
          return;
        }
      }
    }
  },
  /**
   * 想让找到符合要求的element元素
   * @param {Element} ele 元素
   * @param {String} classNames  样式
   */
  findParentElement(ele, classNames) {
    if (!ele) return null;
    classNames =
      typeof classNames === "string" ?
      this.trim(classNames).split(/\s+/) :
      classNames;
    let bo = false;
    this.forEach(classNames, item => {
      if (!bo && ele && ele.classList && ele.classList.contains(item)) {
        bo = true;
      }
      return bo;
    });
    if (bo) {
      return ele;
    }
    if (ele && ele.parentElement && ele.parentElement.nodeName !== "BODY") {
      return this.findParentElement(ele.parentElement, classNames);
    }
  },
  /**
   * 注册事件
   * @param {Element} ele
   * @param {String} type
   * @param {Function} handler
   * @param {Object} params
   */
  registerEvent(ele, type, handler, params) {
    if (ele.addEventListener) {
      ele.addEventListener(type, handler, params, false);
    } else if (ele.attachEvent) {
      // 如果支持attachEvent 就使用attachEvent去注册事件
      ele.attachEvent("on" + type, handler, params);
    } else {
      // 如果 attachEvent 和 addEventListner都不支持 就是用 onclick这种方式
      ele["on" + type] = handler;
    }
  },
  /**
   * 移除事件
   * @param {Element} ele
   * @param {String} type
   * @param {Function} handler
   */
  removeEvent(ele, type, handler) {
    if (ele.addEventListener) {
      ele.removeEventListener(type, handler, false);
    } else if (ele.attachEvent) {
      // 如果支持attachEvent 就使用attachEvent去注册事件
      ele.detachEvent("on" + type, handler);
    } else {
      // 如果 attachEvent 和 addEventListner都不支持 就是用 onclick这种方式
      ele["on" + type] = null;
    }
  }
};