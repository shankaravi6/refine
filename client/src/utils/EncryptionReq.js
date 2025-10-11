import CryptoJS from "crypto-js";

const secretKey = "letsintosiloworld";
export const encryptReq = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};
