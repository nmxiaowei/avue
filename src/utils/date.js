// 获取当前日期
export const getDayText = (date = new Date()) => {
  if (typeof (date) === 'number') {
    date = new Date(date);
  } else if (typeof (date) === 'string') {
    date = new Date(date.replace(/-/g, '/').replace(/\./g, '/'));
  }
  return '日一二三四五六'.charAt(date.getDay());
};
export const dateFtt = (fmt, date) => {
  // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};

export const getDateValues = (value, format = 'yyyy/MM/dd hh:mm::ss') => {

  function strDetail(str) {
    str = str + '';
    if (str.length === 1) {
      return '0' + str;
    }
    return str;
  }
  let str = new Date();
  if (typeof (value) === 'number') {
    str = new Date(value);
  } else if (typeof (value) === 'string') {
    str = new Date(value.replace(/-/g, '/').replace(/\./g, '/'));
  }
  let result = [];
  let year = str.getFullYear();
  let month = str.getMonth() + 1;
  let date = str.getDate();
  let hours = str.getHours();
  let minutes = str.getMinutes();
  let seconds = str.getSeconds();
  if (format.includes('y')) result.push(strDetail(year));
  if (format.includes('M')) result.push(strDetail(month));
  if (format.includes('d')) result.push(strDetail(date));
  if (format.includes('h')) result.push(strDetail(hours));
  if (format.includes('m')) result.push(strDetail(minutes));
  if (format.includes('s')) result.push(strDetail(seconds));
  return result;
};
export const timeToSec = time => {
  var s = '';
  var hour = time.split(':')[0] || '00';
  var min = time.split(':')[1] || '00';
  var sec = time.split(':')[2] || '00';

  s = Number(hour * 3600) + Number(min * 60) + Number(sec);
  return s;
};
export const GetDateStr = (AddDayCount, type = 0) => {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m =
    dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
  var result = y + '-' + m + '-' + d;
  result = type === 0 ? result + ' 00:00:00' : result + ' 23:59:59';
  return result;
};
