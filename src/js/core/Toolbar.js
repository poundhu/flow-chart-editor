import Basebar from "./basebar";
/**
 * 事件都应该通过这里触发，base只负责渲染
 * 取消之前被触发事件
 * 选中后被触发事件
 * @param {Object} options
 */
const Toolbar = function(options) {
  this.options = options || {};
  Basebar.call(this);
};
Toolbar.prototype = new Basebar();
Toolbar.prototype.constructor = Toolbar;

export default Toolbar;