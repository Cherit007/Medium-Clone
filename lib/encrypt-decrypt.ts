let CryptoJS = require("crypto-js");

export const encryptText = (text: string, secretKey: string) => {
  let ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
  return ciphertext;
};

export const decryptText = (
  encryptedText: string,
  secretKey: string
): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (e) {
    return encryptedText;
  }
};
