import { ethers } from "ethers"
import { BigNumber, BigNumberish, parseFixed } from "@ethersproject/bignumber"
import CONFIGS from "@configs/index"
import CryptoJS from "crypto-js"
import { IPropsFormatNumberOption } from "@interfaces/IHelper"
import { ILocal, TLocalKey, ELocalKey } from "@interfaces/ILocal"

const names = ["wei", "kwei", "mwei", "gwei", "szabo", "finney", "ether"]

const Helper = {
  setLocalStorage({ key, value }: ILocal) {
    localStorage.setItem(key, value || "")
  },
  getLocalStorage(key: TLocalKey) {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null
  },
  removeLocalStorage(key: TLocalKey) {
    localStorage.removeItem(key)
  },
  resetLocalStorage() {
    Object.keys(ELocalKey).map((key) => localStorage.removeItem(ELocalKey[key]))
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
    const passphrase = `${CONFIGS.KEYTEXT}`
    return CryptoJS.AES.encrypt(data, passphrase).toString()
  },
  decryptWithAES(ciphertext: string) {
    const passphrase = `${CONFIGS.KEYTEXT}`
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  },
  decryptSocketWithAES<T>(ciphertext: string): T | undefined {
    if (ciphertext) {
      const removeDoubleQuotes = ciphertext.replace(/["']/g, "")
      const passphrase = `${CONFIGS.KEYTEXT}`
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
  },
  BNToNumber(_bn: string) {
    return Number(BigNumber.from(_bn).toString())
  },
  WeiToNumber(_wei: string) {
    return Number(ethers.utils.formatEther(_wei))
  },
  parseUnits(value: string, unitName?: BigNumberish): BigNumber {
    if (typeof unitName === "string") {
      const index = names.indexOf(unitName)
      if (index !== -1) {
        unitName = 3 * index
      }
    }
    return parseFixed(value, unitName != null ? unitName : 18)
  },
  toWei(ether: string): BigNumber {
    return this.parseUnits(ether, 18)
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

export default Helper
