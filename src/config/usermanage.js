/*根据投放时间进行排序*/
export const sortTimeUp = (data) =>{
  data.sort(function (a, b) {
    if (a["created_date"]) {
      var created_date_a = a["created_date"];
    } else {
      var created_date_a = "";
    }
    if (b["created_date"]) {
      var created_date_b = b["created_date"];
    } else {
      var created_date_b = "";
    }
    if (created_date_a > created_date_b) {
      return 1;
    } else if (created_date_a < created_date_b) {
      return -1;
    } else {
      return 0;
    }
  });
  return data;
}

export const sortTimeDown = (data) =>{
  data.sort(function (a, b) {
    if (a["created_date"]) {
      var created_date_a = a["created_date"];
    } else {
      var created_date_a = "";
    }
    if (b["created_date"]) {
      var created_date_b = b["created_date"];
    } else {
      var created_date_b = "";
    }
    if (created_date_a < created_date_b) {
      return 1;
    } else if (created_date_a > created_date_b) {
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
    if (username_a > username_b) {
      return 1;
    } else if (username_a < username_b) {
      return -1;
    }else {
      return 0;
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
    if (username_a < username_b) {
      return 1;
    } else if (username_a > username_b) {
      return -1;
    } else {
      return 0;
    }
  });
  return data;
}