var db = (function(){
	var db = {};
	var uuidList;
	var name;
	//判断是否为空
	function ifnull(val){
		if(val instanceof Array){
			if(val.length==0) return true;
			else return false;
		}else if(val instanceof Object){
			
		}else{
			if(val=='null'||val==null||val=='undefined'||val==undefined||val=='') return true;
			return false;
		}
		
	};
	//日期格式化
	function dateFormat(date, format){
		if(date != 'Invalid Date') {
			var o = {
				"M+": date.getMonth() + 1, //month
				"d+": date.getDate(), //day
				"h+": date.getHours(), //hour
				"m+": date.getMinutes(), //minute
				"s+": date.getSeconds(), //second
				"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
				"S": date.getMilliseconds() //millisecond
			}
			if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
				(date.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(format))
					format = format.replace(RegExp.$1,
						RegExp.$1.length == 1 ? o[k] :
						("00" + o[k]).substr(("" + o[k]).length));
			return format;
		}
		return '';
	
	}
	//数组中查找指定位置
	function ifIndex(list,val){
		var result = -1;
		for(var i =0 ;i < list.length;i++){
			if(list[i]==val){
				result = i;
				break;
			}
		}
		return result;
	};
	//获取UUID列表
	var getUUIDlist =function(){
		var uuidList=store.get(`$${name}`);
		var result=[];
		if(ifnull(uuidList)){
			return result;
		}else{
			result = uuidList
			return result;
		};
	};
	//修改UUID列表
	var setUUIDlist = function(list){
		store.set(`$${name}`,list);
	};
	//生成UUID
	db.getuuid = function(){
		function S4() {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		}
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};
	db.use = function(key){
		name=key;
		uuidList=getUUIDlist();
	}
	db.clear = function(){
		store.clear();
	}
	db.remove = function(key){
		store.remove(key);
	}
	//数据添加
	db.add = function(data,uuid){
		if(ifnull(store.get(uuid))){
			if(ifnull(uuid)) uuid=this.getuuid();
			uuidList.push(uuid);
			setUUIDlist(uuidList);
			store.set(uuid,data);
			return uuid;
		}else{
			this.update(uuid,data);
		}
		
	};
	db.setId = function(list){
		if(!ifnull(list)){
			if(ifnull(list[0].id)){
				const uuid=this.getuuid();
				list.forEach((value,key,arr) =>{
					list[key].id=uuid;
				})
			}
		}
	}
	db.set = function(uuid,data){
		store.set(uuid,data);
	}
	db.gets = function(uuid){
		return store.get(uuid);
	}
	//数据删除
	db.del = function(uuid){
		var index = ifIndex(uuidList,uuid);
		if(index!=-1){
			uuidList.splice(index,1);
			setUUIDlist(uuidList);
			store.remove(uuid);
			return true;
		}else{
			return false;
		}
	};
	//数据更新
	db.update = function(uuid,data){
		var index = ifIndex(uuidList,uuid);
		if(index!=-1){
			store.set(uuid,data);
			return true;
		}else{
			return false;
		}
	};
	//数据获取
	db.get = function(uuid){
		var result;
		if(ifnull(uuid)){
			result = []
			if(!ifnull(uuidList)){
				for(var i=0;i<uuidList.length;i++){
					result.push(store.get(uuidList[i]));
				}
			};							
		}else{
			if(!ifnull(uuidList)){
				result = store.get(uuidList[0]);
			};	
		}
		return result;
	};
	return db;
})();
export default  db;