import {translate, scenType, high_danger_word, middle_danger_word, netType } from '../config/translate'

var translation = translate()
var high = high_danger_word()
var middle = middle_danger_word()
var scensTrans = scenType()
var net = netType()

/*根据type对漏洞数组分类*/
export const typeClassify = (data, type) =>{
	let arr = data.filter((item) =>{
		if(item.type == type){
			return item;
		}
	})
	return arr;
}
/*根据name对漏洞数组分类*/
export const nameClassify = (arr) =>{
  let newobj = {};
  let newarr = [];

  arr.forEach(function(item, index, array) {
    newobj[item.meaning] = newobj[item.meaning] || [];
    newobj[item.meaning].push(item);
  });
  let i = 0;
  for (let index in newobj) {
  	let test = {};
  	test[index] = newobj[index];
    newarr[i] = test;
    i++;
  }
  return newarr;
}
/*根据risklevel对漏洞数组分类*/
export const riskClassify = (data, risk) =>{
	let [high, medium, low] = risk;
	let arr = data.filter((item) =>{
		if(item.risklevel == "高危" && high == true){
			return item;
		}else if(item.risklevel == "中危" && medium == true){
			return item;
		}else if(item.risklevel == "低危" && low == true){
			return item;
		}
	})
	return arr;
}
/*根据risklevel对动态数组分类*/
export const dangerClassify = (data, risk) =>{
  let [high, medium, low] = risk;
  let arr = data.filter((item) =>{
    if(item.risk){
      if(item.risk == "high" && high == true){
        return item;
      }else if(item.risk == "medium" && medium == true){
        return item;
      }else if(item.risk == "low" && low == true){
        return item;
      }
    }
  })
  return arr;
}
/*获得高中低漏洞个数*/
export const riskCount = (data) =>{
	let count = {high: 0, medium: 0, low: 0}
	let arr = data.filter((item) =>{
		if(item.risklevel == "高危"){
			count.high++;
		}else if(item.risklevel == "中危"){
			count.medium++;
		}else if(item.risklevel == "低危"){
			count.low++;
		}
	})
	return count;
}

/*动态数据分类*/
export const dyClassify = (data, type) =>{
	let arr = data.filter((item) =>{
    let name = item.name + ""
    let namearr = []
    if (name.indexOf("(") > -1) {
        namearr = name.split('(');
        item.name = namearr[0];
    }
		if(type == "场景化行为") {
			return item;
		}else if(type == "危险行为" && (high.indexOf(item.name) > -1 || middle.indexOf(item.model) > -1 || middle.indexOf(item.name) > -1 )){
      showDanger(item)
			return item;
		}else if(type == "短信行为" && item.model == "SMS"){
      showSms(item);
			return item;
		}else if(type == "网络行为" && (new RegExp("NET").test(item.model) == true || item.name == "ENCODE_URL" || item.model == "HTTPS")){
      showNet(item)
			return item;
		}else if(type == "文档操作行为"  && item.model == "FILE"){
      showFile(item)
			return item;
		}else if(type == "CALL/媒体联系人行为"  && (item.model == "CALLS" || item.model == "MEDIA" || item.model == "CONTACT")){
			return item;
		}else if(type == "其他行为" && item.type != "engine" && item.model != "SMS" &&  !(new RegExp("NET").test(item.model) == true || item.name == "ENCODE_URL" || item.model == "HTTPS") && item.model != "FILE" &&
			item.model != "CLALLS" && item.model != "MEDIA" && item.model != "CONTACT"){
      showAll(item)
			return item;
		}else if(type == "全部行为" && item.type != "mark"){
      showAll(item)
			return item;
		}
	})
	return arr;
}

export const scenShow = (data) => {
  let arr = data.forEach(function(item, index, array) {
    if (item.type in scensTrans) {
      item.subtype = scensTrans[item.type]
    }
    item.name = translation[item.name]
      ? translation[item.name] + '(' + item.name + ')'
      : item.name
    item.observable.forEach(function(value, index, array) {
      if (item.type.indexOf('Abuse') > -1) {
        if (value.type == 'URL') {
          item.DOWNLOAD = 'HTTP'
        } else if (value.type == 'FTP'){
          item.DOWNLOAD = 'FTP'
        }
      }
    /*----------------------------*/
      if (item.type.indexOf("Steal") > -1) {
        if (value.type === "URL") {
          item.UPLOAD = "HTTP";
        } else if (value.type === "FTP") {
          item.UPLOAD = "FTP";
        }
      }
      if (value.content) {
        if (value.property === "num") {
          value['NUM'] = value.content;
        }
        if (value['property'] === "content") {
          value['CONTENT'] = value.content;
        }

        if (value['property'] === "" && value['type'] === "URL") {
          value['URL'] = value.content;
        }
        if (value['property'] === "ip") {
          value['IP'] = value.content;
        }
        if (value['property'] === 'param') {
          value['PARAM'] = value.content;
          if (item["type"].indexOf("Steal") > -1 && item["name"].indexOf("_Network") > -1) {
            if (value['extraAttr']) {
              value['PARAM_CONTENT'] = value['extraAttr'];
            }
          }
        }
        if (value['property'] === 'resp') {
          value['RESP'] = value.content;
        }
        if (value['property'] === 'port') {
          value['PORT'] = value.content;
        }
        if (value['property'] === 'username') {
          value['USERNAME'] = value.content;
        }
        if (value['property'] === 'password') {
          value['PASSWORD'] = value.content;
        }
        if (value['property'] === 'from') {
          value['FROM'] = value.content;
        }
        if (value['property'] === 'to') {
          value['TO'] = value.content;
        }
        if (value['property'] === 'subject') {
          value['SUBJECT'] = value.content;
        }
        if (value['property'] === 'attachment') {
          value['ATTACHMENT'] = value.content;
        }
        if (value['property'] === 'type' && (value['type'] === 'SMS' || value['type'] === 'MMS')) {
          if (value.content === 'normal') {
            value['MSTYPE'] = "短信内容不带链接";
          } else if (value.content === 'url') {
            value['MSTYPE'] = "短信内容包含链接";
          }
        }
        if (value['property'] === 'value' && value['extraAttr'] === 'samplehash') {
          value['SAMPLEHASH'] = value.content;
        }
        if (value['property'] === 'value' && value['extraAttr'] === 'filehash') {
          value['DOWNFILEHASH'] = value.content;
        }
        if (value['property'] === 'source' && (value['type'] === 'URL' || value['type'] === 'Ftp')) {
          if (value.content === 'decode') {
            value['URLSOURCE'] = "解密所得";
          } else if (value.content === 'local') {
            value['URLSOURCE'] = "本地字符串";
          }
        }
        if (value['type'] === 'Android.packagename') {
          value['PACKAGENAME'] = value.content;
        }
        if (value['property'] === 'path') {
          value['PATH'] = value.content;
        }
        if (value['type'] === 'Hash' && value['property'] === "") {
          value['FILEHASH'] = value.content;
        }
        if (value['type'] === 'File' && value['property'] === 'source') {
          if (value.content === 'download') {
            value['FILESOURCE'] = "从网络下载";
          } else if (value.content === 'release') {
            value['FILESOURCE'] = "本地释放";
          }
        }
        if (value['type'] === 'String' && value['property'] === "") {
          value['TOPSTR'] = value.content;
        }
        if (value['property'] === 'type' && value['type'] === 'File') {
          value['FILETYPE'] = value.content;
        }

        if ((value['type'] === 'Notify' || value['type'] === 'Notify_Show') && value['property'] === 'count') {
          value['NOTIFYCOUNT'] = value.content;
        }
        if (value['property'] === 'title') {
          value['TITLE'] = value.content;
        }
        if ((value['type'] === 'SMS' || value['type'] === 'SMS_Send') && value['property'] === 'count') {
          value['SMSCOUNT'] = value.content;
        }
        if ((value['type'] === 'Float' || value['type'] === 'FloatWindow_Show') && value['property'] === 'count') {
          value['FLOATCOUNT'] = value.content;
        }
        if (value['type'] === 'Icon' && value['property'] === 'count') {
          value['ICONCOUNT'] = value.content;
        }
        if (value['type'] === 'MMS' && value['property'] === 'count') {
          value['MMSCOUNT'] = value.content;
        }
        if (value['type'] === 'Net' && value['property'] === 'count') {
          value['NETCOUNT'] = value.content;
        }
        if (value['type'] === 'Call' && value['property'] === 'count') {
          value['CALLCOUNT'] = value.content;
        }
        if ((value['type'] === 'Malware' || value['type'] === 'Tool') && value['property'] === 'hash') {
          value['HASH'] = value.content;
        }
        if ((value['type'] === 'Malware' || value['type'] === 'Tool') && value['property'] === 'name') {
          value['NAME'] = value.content;
        }
        if (value['type'] === 'File' && value['property'] === 'name') {
          value['FILENAME'] = value.content;
        }
      }
/*--------------------------*/
    })
    return data
  })
  return arr
}

/*网络行为处理*/
export const showNet = (data) => {
  let udp = new Array("CREATE_SOCKET", "SEND", "RECEIVE");
  let http = new Array("HTTPGET", "HTTPPOST", "CREATE_URL", "OPEN_CONNECTION");
  if (data.model === "HTTPS") {
    data.subtype = "HTTPS相关";
  } else if (udp.indexOf(data.name) > -1) {
    data.subtype = "UDP相关";
  } else if (http.indexOf(data.name) > -1) {
    data.subtype = "HTTP相关";
  } else {
    data.subtype = "SOCKET相关";
  }
  data.name = translation[data.name.toUpperCase()]
      ? data.name + '(' + translation[data.name.toUpperCase()] + ')'
      : data.name;
}

/*短信行为处理*/
function showSms(data) {
  if(data.name){
    let sms_send = new Array("SMS_SEND", "SMS_RECEIVE", "SMS_PARSER", "SMS_INTERCEPT_BY");
    if (sms_send.indexOf(data.name) > -1) {
      data.subtype = "短信发送接收相关行为";
    } else {
      data.subtype = "短信数据库相关行为";
    }
    data.name = translation[data.name.toUpperCase()]
      ? data.name + '(' + translation[data.name.toUpperCase()] + ')'
      : data.name;
  }
  return data;
}

/*危险行为处理*/
function showDanger(data) {
  if(data.name){
    data.name = translation[data.name]
      ? data.name + '(' + translation[data.name.toUpperCase()] + ')'
      : data.name;
  }else if(data.model){
    data.model = translation[data.model.toUpperCase()]
      ? data.model + '(' + translation[data.model.toUpperCase()] + ')'
      : data.model;
  }else if(data.type){
    data.type = translation[data.type.toUpperCase()]
      ? data.type + '(' + translation[data.type.toUpperCase()] + ')'
      : data.type;
  }
  return data;
}

/*文档行为处理*/
function showFile(data) {
  if(data.name){
    if (data.name === "MODIFY") {
      data.name = "MODIFY(文件被修改)";
    } else if (data.name === "OPEN") {
      data.name = "OPEN(文件被open)";
    } else if (data.name === "CREATE") {
      data.name = "CREATE(创建新文件)";
    } else if (data.name === "DELETE") {
      data.name = "DELETE(文件被删除)";
    } else {
      data.name = translation[data.name.toUpperCase()]
        ? data.name + '(' + translation[data.name.toUpperCase()] + ')'
        : data.name;
    }
  }
  return data;
}

/*CALL行为处理*/
function showCall(data) {
  if(data.model){
    if (data.model === "CALLS") {
      data.subtype = "calls相关";
    } else if (data.model === "MEDIA") {
      data.subtype = "media相关";
    } else {
      data.subtype = "联系人相关"
    }
  }
  if(data.name){
    data.name = translation[data.name.toUpperCase()]
      ? data.name + '(' + translation[data.name.toUpperCase()] + ')'
      : data.name;
  }
  return data;
}

/*所有行为处理*/
function showAll(data) {
  if (data.name) {
    if (data.model) {
      if (data.name === "MODIFY" && data.model === "FILE") {
        data.name = "MODIFY(文件被修改)";
      } else if (data.name === "OPEN" && data.model === "FILE") {
        data.name = "OPEN(文件被打开)";
      } else if (data.name === "CREATE" && data.model === "FILE") {
        data.name = "CREATE(创建新文件)";
      } else if (data.name === "DELETE" && data.model === "FILE") {
        data.name = "DELETE(文件被删除)";
      } else if (data.name === "REMOVE" && data.model === "FILE") {
        data.name = "DELETE(文件被移出)";
      } else {
        data.name = translation[data.name.toUpperCase()]
          ? data.name + '(' + translation[data.name.toUpperCase()] + ')'
          : data.name;
      }
    } else {
      data.name = translation[data.name.toUpperCase()]
        ? data.name + '(' + translation[data.name.toUpperCase()] + ')'
        : data.name;
    }
  } else if (data.model) {
    data.name = translation[data.model.toUpperCase()]
      ? data.model + '(' + translation[data.model.toUpperCase()] + ')'
      : data.model;
  } else if (data.type) {
    data.name = translation[data.type.toUpperCase()]
      ? data.type + '(' + translation[data.type.toUpperCase()] + ')'
      : data.type;
  } else {
    data.name = "暂无命名!";
  }
  return data;
}

//处理CALLSTACK内容
export const formCallstack = (data) =>{
  if(data){
    for (let i = 0; i < data.length; i++) {
      if(data[i].attachinfo.CALLSTACK){
        data[i].attachinfo.CALLSTACK = replace_str(data[i].attachinfo.CALLSTACK)
      }
      if (high.indexOf(data[i].name) > -1) {
        data[i].risk = "high"
      } else if (middle.indexOf(data[i].model) > -1 || middle.indexOf(data[i].name) > -1) {
        data[i].risk = "medium"
      } else {
        data[i].risk = "low"
      }
    }
  }
  return data
}
export const replace_str = (str) =>{
  var txtReg1 = /\)/g;
  var txtReg2 = /\@/g;
  if (str.indexOf("@") > 0) {
      str = str.replace(txtReg2, "<br/>← ");
      str = "← " + str;
  } else {
      str = str.replace(txtReg1, ");<br/>← ");
      str = str.substring(0, str.length - 2);
      str = "← " + str;
  }
  return str.substring(0, str.length - 2);
}

//域名聚合
export const clusterDomain = (data) =>{
    var domain_arr = [];//域名数据
    var index = 0;
    for (var i in data) {
        var judge = '0';
        if (data[i].attachinfo.URL && data[i].attachinfo.URL !== undefined) {
            var domain = getDomain(data[i].attachinfo.URL);
            if (domain !== '') {
                if (domain_arr.length === 0) {
                    domain_arr[index] = [];
                    domain_arr[index]['data'] = [];
                    domain_arr[index]['data'].push(data[i]);
                    domain_arr[index]['domain'] = domain;
                    index++;
                } else {
                    for (var j = 0; j < domain_arr.length; j++) {
                        if (domain === domain_arr[j]['domain']) {
                            domain_arr[j]['data'].push(data[i]);
                            judge = '1';    //表示域名数组中已经存在该域名
                        }
                    }
                    if (judge === '0') {
                        domain_arr[index] = [];
                        domain_arr[index]['data'] = [];
                        domain_arr[index]['data'].push(data[i]);
                        domain_arr[index]['domain'] = domain;
                        index++;
                    }
                }
            }else if (domain === '') {
                domain_arr[index] = [];
                domain_arr[index]['data'] = [];
                domain_arr[index]['data'].push(data[i]);
                index++;
            }
        } else if (data[i].attachinfo.URL === undefined) {
            domain_arr[index] = [];
            domain_arr[index]['data'] = [];
            domain_arr[index]['data'].push(data[i]);
            index++;
        }
    }
    return domain_arr;
}

//获取域名
function getDomain(url) {
    var arr1 = [];
    var arr2 = [];
    var domain = '';
    if (url.indexOf("://") > -1) {
        arr1 = url.split('//');
        arr2 = arr1[1].split('/');
        domain = arr2[0];
    } else {
        domain = '';
    }
    return domain;
}
/*对附件信息内容进行排序*/
export const sortAttachment = (data) =>{
  data.sort(function (a, b) {
    if (a["virusname"]) {
      return -1;
    }
    if (b["virusname"]) {
      return 1;
    }
    if (a["fileformat"]) {
      var format_a = a["fileformat"];
    } else {
      var format_a = "";
    }
    if (b["fileformat"]) {
      var format_b = b["fileformat"];
    } else {
      var format_b = "";
    }
    if (format_a > format_b) {
      return 1;
    } else {
      return -1;
    }
  });
  return data;
}