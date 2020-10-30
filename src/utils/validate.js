import Schema from 'async-validator';
import { deepClone } from './util';
/**
 * 判断是否为空
 */
export function validatenull(val) {
  // 特殊判断
  if (val && parseInt(val) === 0) return false;
  const list = ['$parent'];
  if (val instanceof Date || typeof val === 'boolean' || typeof val === 'number') return false;
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    val = deepClone(val);
    list.forEach(ele => {
      delete val[ele];
    });
    for (var o in val) {
      return false;
    }
    return true;
  } else {
    if (
      val === 'null' ||
      val == null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) {
      return true;
    }
    return false;
  }
  return false;
}
export const asyncValidator = (rules, form, option = {}) =>
  new Promise((resolve, reject) => {
    const schema = new Schema(rules);
    schema.validate(form, option, errors => {
      if (errors) {
        reject(errors);
      } else {
        resolve();
      }
    });
  });
