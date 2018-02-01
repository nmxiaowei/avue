import { Notification, Message } from 'element-ui';
/**
 * 获取url参数
 */
export const GetQueryString = (url, name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = url.substr(url.indexOf('?') + 1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
export const parseParam = (param) => {

	let paramStr = "";

	if (param instanceof Object) {

		for (let o in param) {
			if (!vaildUtil.ifnull(param[o])) {
				paramStr = `${paramStr}${o}=${param[o]}&`
			}

		}

	}

	return paramStr.substr(0, paramStr.length - 1);

};

/**
 * 弹窗
 */
export const messageBox = function (conf) {
	if (!(conf instanceof Object)) {
		Message({
			title: '错误提示',
			message: conf,
			type: 'info',
		})
	} else if (conf.type == 1) {
		Notification({
			title: conf.title,
			message: conf.msg,
			type: conf.boxtype,
		})
	} else {
		Message({
			title: conf.title,
			message: conf.msg,
			type: conf.boxtype,
		})
	}
}
export const vaildUtil = (function () {
	/**
	 * 判断身份证号码
	 */
	const ifcardid = function (code) {
		let list = [];
		let result = true;
		let msg = '';
		var city = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江 ",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北 ",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏 ",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外 "
		};
		if (!this.ifnull(code)) {
			if (code.length == 18) {
				if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
					msg = "证件号码格式错误";
				} else if (!city[code.substr(0, 2)]) {
					msg = "地址编码错误";
				} else {
					//18位身份证需要验证最后一位校验位
					code = code.split('');
					//∑(ai×Wi)(mod 11)
					//加权因子
					var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
					//校验位
					var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
					var sum = 0;
					var ai = 0;
					var wi = 0;
					for (var i = 0; i < 17; i++) {
						ai = code[i];
						wi = factor[i];
						sum += ai * wi;
					}
					var last = parity[sum % 11];
					if (parity[sum % 11] != code[17]) {
						msg = "证件号码校验位错误";
					} else {
						result = false;
					}

				}
			} else {
				msg = "证件号码长度不为18位";
			}

		} else {
			msg = "证件号码不能为空";
		}
		list.push(result);
		list.push(msg);
		return list;
	}
	/**
	 * 判断手机号码是否正确
	 */
	const ifmobile = function (phone) {
		let list = [];
		let result = true;
		let msg = '';
		var isPhone = /^0\d{2,3}-?\d{7,8}$/;
		//增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]  
		var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/;
		if (!this.ifnull(phone)) {
			if (phone.length == 11) {
				if (isPhone.test(phone)) {
					msg = '手机号码格式不正确';
				} else {
					result = false;
				}
			} else {
				msg = '手机号码长度不为11位';
			}
		} else {
			msg = '手机号码不能为空';
		}
		list.push(result);
		list.push(msg);
		return list;
	}
	/**
	 * 判断姓名是否正确
	 */
	const ifname = function (name) {
		var regName = /^[\u4e00-\u9fa5]{2,4}$/;
		if (!regName.test(name)) return false;
		return true;
	};
	/**
	 * 判断是否为数字
	 */
	const ifnum = function (num, type) {
		let regName = /[^\d.]/g;
		if (type == 1) {
			if (!regName.test(num)) return false;
		} else if (type == 2) {
			regName = /[^\d]/g;
			if (!regName.test(num)) return false;
		}
		return true;
	};
	/**
	 * 判断是否为数字或者小数点
	 */
	const ifnumord = function (num, type) {
		let regName = /[^\d.]/g;
		if (type == 1) {
			if (!regName.test(num)) return false;
		} else if (type == 2) {
			regName = /[^\d.]/g;
			if (!regName.test(num)) return false;
		}
		return true;
	};
	/**
	 * 判断是否为空
	 */
	const ifnull = function (val) {
		if (val instanceof Array) {
			if (val.length == 0) return true;
			else return false;
		} else if (val instanceof Object) {

		} else {
			if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
			return false;
		}
		return false;

	};
	return {
		ifmobile,
		ifname,
		ifnull,
		ifcardid,
		ifnum,
		ifnumord,
	}
})();

/**
 * 计算年的时间差
 */
export const nowCovyearOld = function (date) {
	return dateFormat(new Date(), 'yyyy') - date;
}
/**
 * 计算到当年年份的时间差
 */
export const nowCri = function (date) {
	if (new Date().getTime() - new Date(date).getTime() < 0) return true;
	return false;
}
/**
 * 计算年俩个年份的时间差
 */
export const dateCri = function (date1, date2) {
	if (new Date(date2).getTime() - new Date(date1).getTime() < 0) return true;
	return false;
}
//根据个数返回相应的数组
export const getArraynum = function (len) {
	let list = [];
	for (let i = 1; i <= len; i++) {
		list.push(i);
	}
	return list;
}
/**
 * 根据身份证计算年龄，性别
 */
export const IdCard = function (UUserCard, num) {
	if (UUserCard.length == 18) {
		if (num == 1) {
			//获取出生日期
			let birth = ''
			birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
			return birth;
		}
		if (num == 2) {
			//获取性别
			if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
				//男
				return "1";
			} else {
				//女
				return "2";
			}
		}
		if (num == 3) {
			//获取年龄
			var myDate = new Date();
			var month = myDate.getMonth() + 1;
			var day = myDate.getDate();
			var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
			if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
				age++;
			}
			return age;
		}
	}
	return '';

}
/**
 * 根据传入的list和制定的属性求和
 */
export const calcListnum = function (list, value) {
	let num = 0;
	for (let i = 0; i < list.length; i++) {
		var o = list[i];
		num = num + Number(o[value]);
	}
	return Number(num);
}
/**
 * Object的属性致空，但是属性存在
 */
export const setObjectnull = function (obj) {
	for (var o in obj) {
		obj[o] = "";
	}
	return obj;
}
/**
 * Object的属性为null的至为空字符串
 */
export const setObjectstr = function (obj) {
	for (var o in obj) {
		if (obj[o] == null || obj[o] == 'null') {
			obj[o] = "";
		}
	}
	return obj;
}
/**
 * 字符串数组转对象数组
 */
export const strCovArray = function () {
	let list = [];
	for (let i = 0; i < arguments.length; i++) {
		const str = arguments[i];
		if (!!str) {
			list.push(str);
		}
	}
	return list;
}
/**
 * JSON格式化
 */
export const formatJson = function (json, options) {
	var reg = null,
		formatted = '',
		pad = 0,
		PADDING = '    ';
	options = options || {};
	options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
	options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
	if (typeof json !== 'string') {
		json = JSON.stringify(json);
	} else {
		try {
			json = JSON.parse(json);
		} catch (e) {
			new Error('不是JSON对象');
		}

		json = JSON.stringify(json);
	}
	reg = /([\{\}])/g;
	json = json.replace(reg, '\r\n$1\r\n');
	reg = /([\[\]])/g;
	json = json.replace(reg, '\r\n$1\r\n');
	reg = /(\,)/g;
	json = json.replace(reg, '$1\r\n');
	reg = /(\r\n\r\n)/g;
	json = json.replace(reg, '\r\n');
	reg = /\r\n\,/g;
	json = json.replace(reg, ',');
	if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
		reg = /\:\r\n\{/g;
		json = json.replace(reg, ':{');
		reg = /\:\r\n\[/g;
		json = json.replace(reg, ':[');
	}
	if (options.spaceAfterColon) {
		reg = /\:/g;
		json = json.replace(reg, ':');
	}
	(json.split('\r\n')).forEach(function (node, index) {
		var i = 0,
			indent = 0,
			padding = '';

		if (node.match(/\{$/) || node.match(/\[$/)) {
			indent = 1;
		} else if (node.match(/\}/) || node.match(/\]/)) {
			if (pad !== 0) {
				pad -= 1;
			}
		} else {
			indent = 0;
		}

		for (i = 0; i < pad; i++) {
			padding += PADDING;
		}

		formatted += padding + node + '\r\n';
		pad += indent;
	});
	return formatted;
}
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}
/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
export const setSessionStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}
/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
	if (!name) return;
	return window.sessionStorage.getItem(name);
}

/**
 * 删除lsessionStorage
 */
export const removeSessionStore = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
	let result = '';
	if (typeof (value) == 'string') {
		let index = 0;
		index = findArray(dic, value);
		if (!!dic == true) {
			result = dic[index] == undefined ? '' : dic[index].label;
		} else {
			result = value;
		}
	} else if (typeof (value) == 'object') {
		let index = 0;
		let count = 0
		while (count < value.length) {
			if (!!dic == true) {
				index = findArray(dic, value[count]);
				if (dic[index] != undefined) {
					result = result + dic[index].label + '/';
					dic = dic[index].children;
				} else {
					return result;
				}

			}
			count++;
		}
		result = result.substr(0, result.length - 1);
	}
	return result;
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
	for (let i = 0; i < dic.length; i++) {
		if (dic[i].value == value) {
			return i;
			break;
		}
	}
}
/**
 * 查找字符串是否存在
 */
export const findStrArray = (dic, value) => {
	if (!vaildUtil.ifnull(dic)) {
		for (let i = 0; i < dic.length; i++) {
			if (dic[i] == value) {
				return i;
				break;
			}
		}
	}
	return -1;
}
/**
 * 查找对象数组是否存在
 */
export const findObjArray = (dic, obj, v1, v2) => {
	v1 = v1 || 'value';
	v2 = v2 || 'value';
	for (let i = 0; i < dic.length; i++) {
		let o = dic[i];
		if (o[v1] == obj[v2]) {
			return i;
			break;
		}
	}
	return -1;
}
/**
 * 根据字典的值取缓存里面的
 */
export const getDicvalue = (obj) => {
	var flag = 0;
	if (obj == 'Area_CD1' || obj == 'INDUSTRY_CLASS') {
		flag = 1000;
	}
	if (localStorage.getItem(obj) == null) {
		return eval(obj);
	} else {
		return JSON.parse(localStorage.getItem(obj));
	}
}
/**
 * 验证俩个对象的属性值是否相等
 */
export const validObj = (olds, news) => {
	var flag = true;
	for (var obj in news) {
		if (news[obj] != olds[obj]) {
			flag = false;
			break;
		}
	}
	return flag;
}
/**
 * 数据转换器
 */
export const dataFormat = (data, type) => {
	data = getSessionStore(data) || getStore(data) || null;
	if (vaildUtil.ifnull(data)) return undefined;
	if (type == 1) {	//转json对象
		return JSON.parse(data);
	} else if (type == 2) {//转Boolean对象
		return eval(data);
	} else {
		return data;
	}
}
//设置缓存
export const setCache = (key, str) => {
	const date = dateFormat(new Date(), 'yyyy/MM/dd hh:mm:ss');
	const obj = {
		date: date,
		value: str,
	}
	setStore(key, obj);
}
//获取缓存
export const getCache = (key, time) => {
	const str = JSON.parse(getStore(key));
	if (vaildUtil.ifnull(str)) return '';
	const date = str.date;
	//缓存是否大于有效期
	if ((parseInt(new Date() - new Date(date)) / 1000 / 60) < time) {
		return str.value;
	}
}
//删除数组制定元素
export const removeByValue = (arr, val) => {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == val) {
			arr.splice(i, 1);
			return arr;
			break;
		}
	}
}
/**
 * 日期格式化
 */
export const dateFormat = (date, format) => {
	if (date != 'Invalid Date') {
		var o = {
			"M+": date.getMonth() + 1, //month
			"d+": date.getDate(), //day
			"h+": date.getHours(), //hour
			"m+": date.getMinutes(), //minute
			"s+": date.getSeconds(), //second
			"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
			"S": date.getMilliseconds() //millisecond
		}
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
			(date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
						("00" + o[k]).substr(("" + o[k]).length));
		return format;
	}
	return '';

}
//判断pad还是pc
export const IsPC = function () {
	const userAgentInfo = navigator.userAgent;
	const Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"];
	let flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}