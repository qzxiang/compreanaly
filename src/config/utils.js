import { permission } from '../config/translate'

var permissionArr = permission()

//时间戳转换为时间
export const formatDate= (time) =>{
  if(time){
    var day = new Date(time*1000);
    var year=day.getFullYear();
    var month=day.getMonth()+1;
    var date=day.getDate();
    var hour=day.getHours();
    var minute=day.getMinutes();
    var second=day.getSeconds();
    return year+"-"+add0(month)+"-"+add0(date)+"   "+add0(hour)+":"+add0(minute)+":"+add0(second);
  }
}
//时间戳转换为日期
export const formatDay= (time) =>{
  if(time){
    var day = new Date(time*1000);
    var year=day.getFullYear();
    var month=day.getMonth()+1;
    var date=day.getDate();
    return year+"-"+add0(month)+"-"+add0(date);
  }
}
const add0= m=> m<10 ? '0'+m : m ;

//显示投放后百分比
export const showPercent= (data) =>{
  if(data == 0){
    return 0
  }else if(data == 1){
    return 50
  }else if(data == 2){
    return 100
  }
}

//文件大小转换
export const bytesToSize = (bytes) =>{
  if (bytes === 0) return '0 B';
  var k = 1024, // or 1024
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

//时间格式转化为时间戳
export const timeChangetype = (stringTime) =>{
  if(stringTime){
    var timestamp = Date.parse(new Date(stringTime))/1000;
    return timestamp;
  }else{
    return 0
  }
}
export const getPermission = (permissions) => {
  let arr = []
  let item = 0
  for (item in permissions) {
    var words = permissions[item].split('.')
    if (words.length >= 1) {
      if(arr.indexOf(words[words.length - 1]) == -1){
        arr.push(words[words.length - 1])
      }
    } else {
      arr.push(permissions[item])
    }
  }
  return arr
}

//权限翻译
export const tranPermission = (permissions) => {
  let arr = []
  let item = 0
  for (item in permissions) {
    var words = permissions[item].split('.')
    if (words.length >= 1) {
      let name = words[words.length - 1]
      if(name){
        name = permissionArr[name]
          ? permissionArr[name]
          : "自定义权限";
      }
      arr.push(name)
    } else {
      arr.push(permissions[item])
    }
  }
  return arr
}