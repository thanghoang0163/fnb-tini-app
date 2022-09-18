export const isHasValue = (value) =>
  value !== null && typeof value !== "undefined";

export const isNotEmpty = (value) =>
  isHasValue(value) && (value + "").trim().length > 0;

export const numberFormatter = (number, suffix = "") => {
  if (!isNotEmpty(number)) return "";
  return parseInt(number).toLocaleString("vi-VN") + suffix;
};

export const statusFormatter = (status) => {
  let statusFormatter = status;
  switch (status) {
    case "delievered":
      statusFormatter = "Đã giao";
      break;
    case "shipping":
      statusFormatter = "Đang vận chuyển";
      break;
    case "processing":
      statusFormatter = "Đang tiến hành";
      break;
    case "waiting":
      statusFormatter = "Đang chờ giao";
      break;
    case "canceled":
      statusFormatter = "Đã hủy";
      break;
  }
  return statusFormatter;
};
