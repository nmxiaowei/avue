/**
 * 单机版处理机制
 * 
 */
import { baseUrl, khglUrl, dicUrl, imgBaseUrl, } from '@/config/env';
import { GetQueryString, vaildUtil, setStore, getStore, dateFormat, removeStore } from '@/util/yun'
import dbUtil from '@/util/db';
import PHOTODATA from '@/const/photo'
import store from '@/store';
export default(function() {
	const page={
		rows:[],
		page:1,
		limit:10,
	}
	const init = (config) => {
		const method = config.method;
		const url = config.url;
		const data = config.data != null ? JSON.parse(config.data) : {};
		const custId = store.state.cust==undefined?{}:store.state.cust.custId;

		function geturlcustId(key) {
			return url.substr(url.indexOf(key) + key.length + 1);
		}

		if(method == 'get') {
			if(url.indexOf(`${khglUrl}/cust/cust?`) != -1 && url.indexOf('page') != -1) {
				const key = "cust";
				return List(key);
			} else if(url.indexOf(`${khglUrl}/cust/cust?`) != -1 && url.indexOf('idNo') != -1) {
				return custCheck();
			} else if(url.indexOf(`${khglUrl}/cust/cust?`) != -1 && url.indexOf('custId') != -1) {
				const key = "cust";
				return Get(key, custId, 1);
			} else if(url.indexOf(`${khglUrl}/cust/staff`) != -1) {
				const key = "staff";
				return Get(key, geturlcustId(key), 2);
			} else if(url.indexOf(`${khglUrl}/cust/plant`) != -1) {
				const key = "plant";
				return Get(key, custId);
			} else if(url.indexOf(`${khglUrl}/cust/breed`) != -1) {
				const key = "breed";
				return Get(key, custId);
			} else if(url.indexOf(`${khglUrl}/cust/custBusiness`) != -1) {
				const key = "custBusiness";
				return Get(key, custId);
			} else if(url.indexOf(`${khglUrl}/cust/business`) != -1) {
				const key = "business";
				return Get(key, custId, 2);
			} else if(url.indexOf(`${khglUrl}/cust/family`) != -1) {
				const key = "family";
				return Get(key, custId, 2);
			} else if(url.indexOf(`${khglUrl}/cust/finrpt`) != -1) {
				const key = "finrpt";
				return Get(key, custId, 2);
			} else if(url.indexOf(`${khglUrl}/cust/rela`) != -1) {
				const key = "rela";
				return Get(key, custId);
			} else if(url.indexOf(`${khglUrl}/cust/rptdtl`) != -1) {
				const key = "rptdtl";
				const type = geturlcustId(custId);
				return Get(`${key}-${type}`, custId, 3);
			} else if(url.indexOf(`${khglUrl}/cust/otherinfo`) != -1) {
				const key = "otherinfo";
				return Get(key, custId, 2);
			} else if(url.indexOf(`${khglUrl}/cust/doc`) != -1) {
				const key = "doc";
				const type = geturlcustId(custId);
				return Get(`${key}-${type}`, custId);
			}

		} else if(method == 'post') {
			if(url.indexOf(`${khglUrl}/cust/cust`) != -1 && data.idNo != undefined) {
				const key = "cust";
				CUST.id = CUST.custId;
				return Add(key, dbUtil.uuidGenerater(), data, 1);
			} else if(url.indexOf(`${khglUrl}/cust/staff`) != -1) {
				const key = "staff";
				if(data.id != undefined) {
					return Update(key, data);
				} else {
					data.id = dbUtil.uuidGenerater();
					return Add(key, custId, data, 2);
				}
			} else if(url.indexOf(`${khglUrl}/cust/plant`) != -1) {
				const key = "plant";
				data.id = dbUtil.uuidGenerater();
				return Add(key, custId, data);
			} else if(url.indexOf(`${khglUrl}/cust/breed`) != -1) {
				const key = "breed";
				data.id = dbUtil.uuidGenerater();
				return Add(key, custId, data);
			} else if(url.indexOf(`${khglUrl}/cust/custBusiness`) != -1) {
				const key = "custBusiness";
				data.id = dbUtil.uuidGenerater();
				return Add(key, custId, data);
			} else if(url.indexOf(`${khglUrl}/cust/business`) != -1) {
				const key = "business";
				if(data.id != undefined) {
					return Update(key, data);
				} else {
					data.id = dbUtil.uuidGenerater();
					return Add(key, custId, data, 2);
				}
			} else if(url.indexOf(`${khglUrl}/cust/family`) != -1) {
				const key = "family";
				if(data.id != undefined) {
					return Update(key, data);
				} else {
					data.id = dbUtil.uuidGenerater();
					return Add(key, custId, data, 2);
				}
			} else if(url.indexOf(`${khglUrl}/cust/finrpt`) != -1) {
				const key = "finrpt";
				if(data.id != undefined) {
					return Update(key, data);
				} else {
					data.id = dbUtil.uuidGenerater();
					return Add(key, custId, data, 2);
				}
			} else if(url.indexOf(`${khglUrl}/cust/rela`) != -1) {
				const key = "rela";
				data.id = dbUtil.uuidGenerater();
				return Add(key, custId, data);
			} else if(url.indexOf(`${khglUrl}/cust/rptdtl`) != -1) {
				const key = "rptdtl";
				const type = data[0].subjCd;
				const obj = Get(`${key}-${type}`, custId, 3);
				if(!vaildUtil.ifnull(obj.data)) {
					return Update(`${custId}-${key}-${type}`, data);
				} else {
					data.id = dbUtil.uuidGenerater();
					return Add(`${key}-${type}`, custId, data, 2);
				}
			} else if(url.indexOf(`${khglUrl}/cust/otherinfo`) != -1) {
				const key = "otherinfo";
				if(data.id != undefined) {
					return Update(key, data);
				} else {
					data.id = dbUtil.uuidGenerater();
					return Add(key, custId, data, 2);
				}
			} else if(url.indexOf(`${khglUrl}/file/upload/base64`) != -1) {
				const key = "upload";
				let list = [];
				for(let i = 0; i < data.length; i++) {
					list.push(data[i].data);
				}
				return dbUtil.resultSuccessGenerater(list);
			} else if(url.indexOf(`${khglUrl}/cust/doc`) != -1) {
				const key = "doc";
				const type = data[0].docName;
				let list = [];
				for(let i = 0; i < data.length; i++) {
					data[i].id = dbUtil.uuidGenerater();
					data[i].seqNo = data.id;
					data[i].mtnDate = dateFormat(new Date(), 'yyyyMMdd');
					data[i].crtDate = dateFormat(new Date(), 'yyyyMMdd');
					Add(`${key}-${type}`, custId, data[i]);
					list.push(data[i]);
				}
				return dbUtil.resultSuccessGenerater(list);
			}

		} else if(method == 'delete') {
			if(url.indexOf(`${khglUrl}/cust/cust`) != -1 && data instanceof Array) {
				const key = "cust";
				return Del(key, custId, data, 1);
			} else if(url.indexOf(`${khglUrl}/cust/plant`) != -1) {
				const key = "plant";
				return Del(key, custId, geturlcustId(custId), 2);
			} else if(url.indexOf(`${khglUrl}/cust/breed`) != -1) {
				const key = "breed";
				return Del(key, custId, geturlcustId(custId), 2);
			} else if(url.indexOf(`${khglUrl}/cust/custBusiness`) != -1) {
				const key = "custBusiness";
				return Del(key, custId, geturlcustId(custId), 2);
			} else if(url.indexOf(`${khglUrl}/cust/rela`) != -1) {
				const key = "rela";
				return Del(key, custId, geturlcustId(custId), 2);
			} else if(url.indexOf(`${khglUrl}/cust/doc`) != -1) {
				const key = "doc";
				const type = data.type;
				return Del(`${key}-${type}`, custId, geturlcustId(key), 2);
			}
		} else if(method == 'put') {
			if(url.indexOf(`${khglUrl}/cust/cust`) != -1 && data.idNo != undefined) {
				const key = "cust";
				return Update(key, data);
			} else if(url.indexOf(`${khglUrl}/cust/cust`) != -1) {
				const key = "cust";
				return Update(key, data);
			} else if(url.indexOf(`${khglUrl}/cust/plant`) != -1) {
				const key = "plant";
				return Update(key, data, 1);
			} else if(url.indexOf(`${khglUrl}/cust/breed`) != -1) {
				const key = "breed";
				return Update(key, data, 1);
			} else if(url.indexOf(`${khglUrl}/cust/custBusiness`) != -1) {
				const key = "custBusiness";
				return Update(key, data, 1);
			} else if(url.indexOf(`${khglUrl}/cust/rela`) != -1) {
				const key = "rela";
				return Update(key, data, 1);
			} else if(url.indexOf(`${khglUrl}/cust/rela`) != -1) {
				const key = "finrpt";
				return Update(key, data, 1);
			} else if(url.indexOf(`${khglUrl}/cust/doc`) != -1) {
				const key = "doc";
				const type = data.docName;
				return Update(`${key}-${type}`, data, 1);
			}
		}

	};
	//身份证重复查询
	const custCheck = () => {
		const data = {
			code: 200,
			data: null,
			message: "SUCCESS",
		}
		return data;
	};
	//客户管理列表
	const List = (name) => {
		dbUtil.use(name);
		page.rows=dbUtil.get();
		return page;
	};
	//获取
	const Get = (type, uid, parent) => {
		return dbUtil.get(type, uid, parent);
	}
	//增加
	const Add = (type, uid, data, parent) => {
		return dbUtil.add(type, uid, data, parent);
	}
	//删除
	const Del = (type, uid, id, parent) => {
		return dbUtil.del(type, uid, id, parent);
	}
	//更新
	const Update = (type, data) => {
		return dbUtil.update(type, data);
	}
	//获取客户全部数据
	const gelCust = (uid) => {
		let custs = {
			main: '',
			staff: '',
			plant: [],
			breed: [],
			business: '',
			custBusiness: [],
			family: '',
			rela: '',
			rptdtl: [],
			doc: [],
			otherinfo: '',

		}
		custs.main = JSON.parse(getStore(`${uid}`)); //基本信息
		custs.staff = getCustList(JSON.parse(getStore(`${uid}-staff`)))[0]; //职工信息
		custs.plant = getCustList(JSON.parse(getStore(`${uid}-plant`))); //种植信息
		custs.breed = getCustList(JSON.parse(getStore(`${uid}-breed`))); //养殖信息
		custs.business = getCustList(JSON.parse(getStore(`${uid}-business`)))[0]; //经商信息
		custs.custBusiness = getCustList(JSON.parse(getStore(`${uid}-custBusiness`))); //经商列表
		custs.family = getCustList(JSON.parse(getStore(`${uid}-family`)))[0]; //家庭信息
		custs.finrpt = getCustList(JSON.parse(getStore(`${uid}-finrpt`)))[0]; //家庭列表
		custs.rela = getCustList(JSON.parse(getStore(`${uid}-rela`)))[0]; //财务信息
		const rptdtlList = ['A0001', 'A0002', 'A0003', 'A0004', 'A0005', 'A0006', 'D0001', 'D0002', 'D0003', 'D0004', 'D0005', 'P0002'];
		custs.rptdtl = [];
		for(let i = 0; i < rptdtlList.length; i++) {
			const obj = getCustList(JSON.parse(getStore(`${uid}-rptdtl-${rptdtlList[i]}`))); //财务列表
			obj && obj.length ? custs.rptdtl.push(obj) : '';
		}
		const docList = PHOTODATA;
		custs.doc = [];
		custs.doc = getDocList(uid,docList);
		custs.otherinfo = getCustList(JSON.parse(getStore(`${uid}-otherinfo`)))[0]; //其他信息
		return custs;
	}
	const getDocList = function(uid,docList) {
		let list=[];
		for(let i = 0; i < docList.length; i++) {
			if(docList[i].children && docList[i].children.length) {
				list=list.concat(getDocList(uid,docList[i].children));
			} else {
				const obj = getCustList(JSON.parse(getStore(`${uid}-doc-${docList[i].value}`))); //影像资料列表
				obj && obj.length ? list.push(obj) : '';
			}
		}
		return list;
	}
	const getCustList = (data) => {
		let list = [];
		if(data && data.length) {
			for(let i = 0; i < data.length; i++) {
				list.push(JSON.parse(getStore(data[i])));
			}
		}
		return list;
	}
	return {
		init,
		gelCust,
	}
})()