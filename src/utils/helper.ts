import Config from "@src/configs"
import { ethers } from "ethers"
import CryptoJS from "crypto-js"
import { IPropsFormatNumberOption } from "@src/interfaces/IHelper"
import { ILocal, TKey } from "@src/interfaces/ILocal"

const helper = {
  setLocalStorage({ key, val }: ILocal) {
    localStorage.setItem(key, val || "")
  },
  getLocalStorage(key: TKey) {
    return localStorage.getItem(key)
  },
  removeLocalStorage(key: TKey) {
    localStorage.removeItem(key)
  },
  resetLocalStorage() {
    localStorage.removeItem("token")
    localStorage.removeItem("time")
    localStorage.removeItem("email")
    localStorage.removeItem("address")
    localStorage.removeItem("loginWith")
  },
  getTokenFromLocal() {
    return typeof window === "undefined" ? null : localStorage.getItem("token")
  },
  async getWalletAccount() {
    if (!window.ethereum)
      throw new Error("MetaMask is required. Please install the extension.")

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts()
    return accounts
  },
  encryptWithAES(data: string) {
    const passphrase = `${Config.NEXT_PUBLIC_KEYTEXT}`
    return CryptoJS.AES.encrypt(data, passphrase).toString()
  },
  decryptWithAES(ciphertext: string) {
    const passphrase = `${process.env.NEXT_PUBLIC_KEYTEXT}`
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  },
  decryptSocketWithAES<T>(ciphertext: string): T | undefined {
    if (ciphertext) {
      const removeDoubleQuotes = ciphertext.replace(/["']/g, "")
      const passphrase = `${process.env.NEXT_PUBLIC_KEYTEXT}`
      const bytes = CryptoJS.AES.decrypt(removeDoubleQuotes, passphrase)

      const originalText = bytes.toString(CryptoJS.enc.Utf8)

      return JSON.parse(originalText)
    }
    return undefined
  },
  formatNumber(value: number, options?: IPropsFormatNumberOption) {
    const formatFn = new Intl.NumberFormat("en-US", {
      notation: options?.notation || "standard",
      compactDisplay: options?.compactDisplay || "short",
      maximumFractionDigits: options?.maximumFractionDigits || 2
    })

    return formatFn.format(value)
  },
  isEmptyArray<T>(_arg: T[] | undefined) {
    if (typeof _arg === "undefined") return true

    if (Array.isArray(_arg) && !_arg.length) {
      return true
    }
    return false
  }
  // async helperAxiosAPI<T>(promiseAPI: Promise<AxiosResponse<T, any>>) {
  //   return promiseAPI
  //     .then((res) => ({ response: res.data, error: null }))
  //     .catch((error) => {
  //       if (error.response && typeof error.response.data === "object") {
  //         return { response: null, error: error.response.data.message }
  //       }
  //       return { response: null, error }
  //     })
  // }
}

export default helper
