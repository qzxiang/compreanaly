import {securityflawsType} from '../config/translate'
import {securityflawsRisk} from '../config/translate'

var securityType = securityflawsType()
var securityRisk = securityflawsRisk()

/*增加type属性*/
export const keyClassify = (arr, type) =>{
  arr.forEach(function(item, index) {
    item["type"] = type
  });
  return arr;
}

/*根据个数对数组排序*/
export const sort = (arr) =>{
  arr.sort(function (a, b) {
    if (a["doc_count"]) {
      var doc_count_a = a["doc_count"];
    } else {
      var doc_count_a = "";
    }
    if (b["doc_count"]) {
      var doc_count_b = b["doc_count"];
    } else {
      var doc_count_b = "";
    }
    if (doc_count_a < doc_count_b) {
      return 1;
    } else if (doc_count_a > doc_count_b) {
      return -1;
    } else {
      return 0;
    }
  });
  return arr;
}

/*获取漏洞行为详情*/
export const getSecurityflaws = (arr) =>{
  arr.forEach(function(item, index) {
    item["type"] = securityType[item.key];
    item["risklevel"] = securityRisk[item.key];
  });
  return arr;
}