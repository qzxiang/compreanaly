/*根据投放时间进行排序*/
export const sortTimeUp = (data) =>{
  data.sort(function (a, b) {
    if (a["throwtime"]) {
      var throwtime_a = a["throwtime"];
    } else {
      var throwtime_a = "";
    }
    if (b["throwtime"]) {
      var throwtime_b = b["throwtime"];
    } else {
      var throwtime_b = "";
    }
    if (throwtime_a > throwtime_b) {
      return 1;
    } else if (throwtime_a < throwtime_b) {
      return -1;
    } else {
      return 0;
    }
  });
  return data;
}

export const sortTimeDown = (data) =>{
  data.sort(function (a, b) {
    if (a["throwtime"]) {
      var throwtime_a = a["throwtime"];
    } else {
      var throwtime_a = "";
    }
    if (b["throwtime"]) {
      var throwtime_b = b["throwtime"];
    } else {
      var throwtime_b = "";
    }
    if (throwtime_a < throwtime_b) {
      return 1;
    } else if (throwtime_a > throwtime_b) {
      return -1;
    } else {
      return 0;
    }
  });
  return data;
}

/*根据投放用户进行排序*/
export const sortUserUp = (data) =>{
  data.sort(function (a, b) {
    if (a["username"]) {
      var username_a = a["username"];
    } else {
      var username_a = "";
    }
    if (b["username"]) {
      var username_b = b["username"];
    } else {
      var username_b = "";
    }
    if (a["throwtime"]) {
      var throwtime_a = a["throwtime"];
    } else {
      var throwtime_a = "";
    }
    if (b["throwtime"]) {
      var throwtime_b = b["throwtime"];
    } else {
      var throwtime_b = "";
    }
    if (username_a > username_b) {
      return 1;
    } else if (username_a < username_b) {
      return -1;
    }else {
      if (throwtime_a > throwtime_b) {
        return 1;
      } else if (throwtime_a < throwtime_b) {
        return -1;
      } else {
        return 0;
      }
    }
  });
  return data;
}

export const sortUserDown = (data) =>{
  data.sort(function (a, b) {
    if (a["username"]) {
      var username_a = a["username"];
    } else {
      var username_a = "";
    }
    if (b["username"]) {
      var username_b = b["username"];
    } else {
      var username_b = "";
    }
    if (a["throwtime"]) {
      var throwtime_a = a["throwtime"];
    } else {
      var throwtime_a = "";
    }
    if (b["throwtime"]) {
      var throwtime_b = b["throwtime"];
    } else {
      var throwtime_b = "";
    }
    if (username_a < username_b) {
      return 1;
    } else if (username_a > username_b) {
      return -1;
    } else {
      if (throwtime_a < throwtime_b) {
        return 1;
      } else if (throwtime_a > throwtime_b) {
        return -1;
      } else {
        return 0;
      }
    }
  });
  return data;
}