import CryptoJS from "crypto-js"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const privateKey: any = process.env.REACT_APP_KEYTEXT

export const encrypt = (text: string) =>
  CryptoJS.AES.encrypt(text, privateKey).toString()
