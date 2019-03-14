
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};

export function isDom(obj) {
  return typeof HTMLElement === 'object' ?
    (function () {
      return obj instanceof HTMLElement;
    })() :
    (function () {
      return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    })()
}