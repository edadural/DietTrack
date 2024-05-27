// utils.js
import moment from "moment";
import "moment/locale/tr";

export const dateTimeFormatter = (val) => {
  if (val) {
    return moment(val).format("YYYY-MM-DD HH:MM");
  }
  return null
};

export const dateFormatter = (val) => {
  if (val) {
    return moment(val).format("YYYY-MM-DD");
  }
  return null
};

export const shortText = (val, len = 10) => {
  if (val) {
    if (val.length <= len) {
      return val;
    } else {
      return val.substring(0, len) + '...';
    }
  }
  return null
};