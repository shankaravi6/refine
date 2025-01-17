import CryptoJS from "crypto-js";

export const decryptReq = (encryptedData) => {
  const secretKey = "letsintosiloworld";

  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
