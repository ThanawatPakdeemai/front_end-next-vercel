import { ethers } from "ethers"
import { BigNumber, BigNumberish, parseFixed } from "@ethersproject/bignumber"
import CONFIGS from "@configs/index"
import CryptoJS from "crypto-js"
import { IPropsFormatNumberOption } from "@interfaces/IHelper"
import { IGetEventLog } from "@interfaces/ITransaction"
import { ILocal, TLocalKey, ELocalKey } from "@interfaces/ILocal"
import { ICurrentNakaData } from "@feature/inventory/interfaces/IInventoryService"
import { IResGetIp } from "@interfaces/IGetIP"
import { trickerPriceBNBExternal } from "@feature/buyItem/containers/services/currency.services"
import { getCurrentNaka } from "@feature/balance/containers/services/balance.services"
import {
  AddEthereumChainParameter,
  WatchAssetParams
} from "@interfaces/IMetamask"
import {
  TNFTType,
  TSellerType,
  TType,
  TUrlNFT
} from "@feature/marketplace/interfaces/IMarketService"
import dayjs from "dayjs"
import { TKey } from "@stores/marketFilter"

const names = ["wei", "kwei", "mwei", "gwei", "szabo", "finney", "ether"]

const Helper = {
  setLocalStorage({ key, value }: ILocal) {
    localStorage.setItem(key, value || "")
  },
  getLocalStorage(_key: TLocalKey) {
    return typeof window !== "undefined" ? localStorage.getItem(_key) : null
  },
  removeLocalStorage(_key: TLocalKey) {
    localStorage.removeItem(_key)
  },
  resetLocalStorage() {
    Object.keys(ELocalKey).map((_key) =>
      localStorage.removeItem(ELocalKey[_key])
    )
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
  encryptWithAES(_data: string) {
    const passphrase = `${CONFIGS.KEYTEXT}`
    return CryptoJS.AES.encrypt(_data, passphrase).toString()
  },
  decryptWithAES(_cipherText: string) {
    const passphrase = `${CONFIGS.KEYTEXT}`
    const bytes = CryptoJS.AES.decrypt(_cipherText, passphrase)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  },
  decryptSocketWithAES<T>(_cipherText: string): T | undefined {
    if (_cipherText) {
      const removeDoubleQuotes = _cipherText.replace(/["']/g, "")
      const passphrase = `${CONFIGS.KEYTEXT}`
      const bytes = CryptoJS.AES.decrypt(removeDoubleQuotes, passphrase)

      const originalText = bytes.toString(CryptoJS.enc.Utf8)

      return JSON.parse(originalText)
    }
    return undefined
  },
  formatNumber(_value: number, _options?: IPropsFormatNumberOption) {
    const formatFn = new Intl.NumberFormat("en-US", {
      notation: _options?.notation || "standard",
      compactDisplay: _options?.compactDisplay || "short",
      maximumFractionDigits: _options?.maximumFractionDigits || 2
    })

    return formatFn.format(_value)
  },
  number4digit(_val: number) {
    const _number = parseFloat(
      _val.toFixed(5).substring(0, _val.toFixed(5).length - 1)
    )
    return _number
  },
  textWithDots(_string: string, _length: number) {
    /**
     * TO DO
     */
    // Check _string length
    // Check _string indexOf
    // Check if x is the position 2 of string
    // Check number length is not negative
    // Check number length is not zero
    // Check if address contain with space
    return `${_string?.substring(0, _length)}...${_string?.substring(
      _string.length - _length,
      _string.length
    )}`
  },
  createEncryptLink(_length: number) {
    let result = ""
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < _length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  },
  encodeURILink(_email: string, _token: string) {
    return `?m=${encodeURIComponent(
      this.encryptWithAES(_email)
    )}&refer=${encodeURIComponent(this.encryptWithAES(_token))}`
  },
  copyClipboard(_val: string) {
    // Copy the text inside the text field
    navigator.clipboard.writeText(_val)
  },
  makeID(_length: number) {
    let result = ""
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < _length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  },
  getIP() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const response = await fetch("https://api.ipify.org/?format=json")
      const data: IResGetIp = await response.json()
      resolve(data)
    }).catch(() => {})
  },
  stringToColor(_str: string) {
    let hash = 0
    let color = "#"

    for (let i = 0; i < _str.length; i += 1) {
      // eslint-disable-next-line no-bitwise
      hash = _str.charCodeAt(i) + ((hash << 5) - hash)
    }

    for (let i = 0; i < 3; i += 1) {
      // eslint-disable-next-line no-bitwise
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }

    return color
  },
  stringAvatar(_name: string) {
    return {
      sx: {
        bgcolor: this.stringToColor(_name)
      },
      children: `${_name.split(" ")[0][0]}${_name.split(" ")[1][0]}`
    }
  },
  isEmptyArray<T>(_arg: T[] | undefined) {
    if (typeof _arg === "undefined") return true

    if (Array.isArray(_arg) && !_arg.length) {
      return true
    }
    return false
  },
  parseUnits(_value: string, _unitName?: BigNumberish): BigNumber {
    if (typeof _unitName === "string") {
      const index = names.indexOf(_unitName)
      if (index !== -1) {
        _unitName = 3 * index
      }
    }
    return parseFixed(_value, _unitName != null ? _unitName : 18)
  },
  BNToNumber(_bn: string) {
    return Number(BigNumber.from(_bn).toString())
  },
  WeiToNumber(_wei: BigNumberish) {
    return Number(ethers.utils.formatEther(_wei))
  },
  toWei(_ether: string): BigNumber {
    return ethers.utils.parseUnits(_ether, 18)
  },
  async calItemToNaka(_qty: number, _bulletPerUSD: number, lastPrice: string) {
    const bulletPrice = _bulletPerUSD / parseFloat(lastPrice)
    const bulletToFixed = bulletPrice.toFixed(5)
    const bulletPerNaka = parseFloat(
      bulletToFixed.substring(0, bulletToFixed.length - 1)
    )
    const total: number = _qty * bulletPerNaka

    return total
  },
  async calculateItemPerPrice(price: number, lastPrice: string) {
    const itemPrice = await this.calItemToNaka(1, price, lastPrice)
    const itemToFixed = itemPrice.toFixed(5)
    const itemPerNaka = parseFloat(
      itemToFixed.substring(0, itemToFixed.length - 1)
    )

    return itemPerNaka
  },
  /**
   * @description Calculate price of item in BSC
   * @param itemPerUSD
   * @param currentPrice
   * @returns {number}
   */
  async calPriceBinanceChain(itemPerUSD: number, symbol: string) {
    const result = await trickerPriceBNBExternal(symbol)
    const currentPrice = Number(result.price)
    if (itemPerUSD && currentPrice) {
      const pricePerUSD = currentPrice
      const itemPrice = itemPerUSD / parseFloat(pricePerUSD.toString())
      const itemToFixed = itemPrice.toFixed(5)
      const itemPerUSDBSC = parseFloat(
        itemToFixed.substring(0, itemToFixed.length - 1)
      )
      return itemPerUSDBSC
    }
    return 0
  },
  getFeeGas(effectiveGasPrice: string, gasUsed: number) {
    return this.WeiToNumber(effectiveGasPrice) * gasUsed
  },
  calFloat(_val: number, _regit = 4) {
    if (_val === 0 && _regit) {
      return _val.toFixed(_regit)
    }
    if (_val && _regit) {
      // eslint-disable-next-line prefer-exponentiation-operator, no-restricted-properties
      const decimal = Math.pow(10, _regit)
      const multiplyValue = Number(_val * decimal)
      const divideValue = multiplyValue / decimal

      return divideValue.toFixed(_regit)
    }
  },
  getEventLog({ allowed, events }: IGetEventLog) {
    let data = null
    data = Object.keys(events)
      .filter((key) => allowed.includes(key))
      .reduce((obj: any, key: any) => {
        obj[key] = events[key]
        return obj
      }, {})

    return data
  },
  shortenString(text: string, number?: number | null, disableHash?: boolean) {
    const cLength = number || 6
    return `${text?.substring(
      disableHash ? 2 : 0,
      disableHash ? cLength + 2 : cLength
    )}...${text?.substring(text.length - cLength)}`
  },
  percentageCalc(amount: number, total: number) {
    return (amount / total) * 100
  },
  async getPriceNakaCurrent() {
    const currenr_price = await getCurrentNaka()
    return currenr_price.data
  },
  async getPriceBSCCurrent(_symbol: string) {
    const currentPrice = await trickerPriceBNBExternal(_symbol)
    return currentPrice
  },
  async getItemPriceUsd(_priceItem: number, _qty?: number) {
    const qty: number = _qty ?? 1
    const priceData = await this.getPriceNakaCurrent()
    if (priceData) {
      const priceUsd = Number((priceData as ICurrentNakaData).buy)
      const price = _priceItem * priceUsd * qty
      return this.number4digit(price)
    }
    return this.number4digit(0)
  },
  removeComma(text: string) {
    // eslint-disable-next-line no-useless-escape
    return Number(text.replace(/\,/g, ""))
  },
  /**
   * @description Handle network setting for metamask
   * @param _chainId
   * @returns
   */
  getNetwork(_chainId: string): AddEthereumChainParameter {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return {
          chainId: `0x${Number(CONFIGS.CHAIN.BNB_CHAIN_ID).toString(16)}`,
          chainName: `${CONFIGS.CHAIN.BNB_CHAIN_NAME}`,
          rpcUrls: [`${CONFIGS.CHAIN.BNB_RPC_URL}/`],
          blockExplorerUrls: [`${CONFIGS.CHAIN.BNB_SCAN}/`],
          nativeCurrency: {
            name: CONFIGS.CHAIN.TOKEN_NAME_BUSD,
            symbol: CONFIGS.CHAIN.TOKEN_SYMBOL_BNB,
            decimals: 18
          }
        }

      default:
        return {
          chainId: `0x${Number(CONFIGS.CHAIN.CHAIN_ID).toString(16)}`,
          chainName: `${CONFIGS.CHAIN.CHAIN_NAME}`,
          rpcUrls: [`${CONFIGS.CHAIN.POLYGON_RPC_URL}`],
          blockExplorerUrls: [`${CONFIGS.CHAIN.POLYGON_SCAN}`],
          nativeCurrency: {
            name: CONFIGS.CHAIN.TOKEN_NAME,
            symbol: CONFIGS.CHAIN.TOKEN_SYMBOL,
            decimals: 18
          }
        }
    }
  },
  getParams(): WatchAssetParams {
    return {
      type: "ERC20",
      options: {
        address: CONFIGS.CONTRACT_ADDRESS.ERC20,
        symbol: CONFIGS.CHAIN.TOKEN_NAME,
        decimals: 18,
        image: CONFIGS.CHAIN.ICON_NAKA
      }
    }
  },
  convertAvatar(avatar: string): string {
    if (avatar.search("https") > -1 || avatar.search("/") === 0) {
      return avatar
    }
    return `/${avatar}`
  },
  convertNFTTypeToUrl(_NFTtype: TNFTType): TUrlNFT {
    switch (_NFTtype) {
      case "nft_land":
        return "NFT-Land"
      case "nft_building":
        return "NFT-Building"
      case "nft_naka_punk":
        return "NFT-NakaPunk"
      case "nft_material":
        return "NFT-Material"
      case "game_item":
        return "NFT-Game-Item"
      case "nft_game":
        return "NFT-As-Game"
      case "nft_avatar":
        return "NFT-Avatar"
      default:
        throw new Error(`Invalid NFT type: ${_NFTtype}`)
    }
  },
  convertNFTTypeToTType(
    _nftType: TNFTType,
    sellerTypes?: TSellerType
  ): TType | undefined {
    switch (_nftType) {
      case "game_item":
        return sellerTypes && sellerTypes === "system" ? undefined : "game-item"
      case "nft_material":
        return sellerTypes && sellerTypes === "system" ? undefined : "material"
      case "nft_land":
        return "land"
      case "nft_building":
        return "building"
      case "nft_game":
        return sellerTypes && sellerTypes === "system"
          ? undefined
          : "arcade-game"
      case "nft_naka_punk":
        return "naka-punk"
      case "nft_avatar":
        return "avatar-reef"
      default:
        return undefined
    }
  },
  convertTTypeToNFTType(_nftType: TType): TNFTType {
    switch (_nftType) {
      case "game-item":
        return "game_item"
      case "material":
        return "nft_material"
      case "land":
        return "nft_land"
      case "building":
        return "nft_building"
      case "arcade-game":
        return "nft_game"
      case "naka-punk":
        return "nft_naka_punk"
      case "avatar-reef":
        return "nft_avatar"
      default:
        return "nft_land"
    }
  },
  convertMarketTypeToTType(_marketType?: TNFTType): TType {
    switch (_marketType) {
      case "game_item":
        return "game-item"
      case "nft_building":
        return "building"
      case "nft_naka_punk":
        return "naka-punk"
      case "nft_material":
        return "material"
      case "nft_game":
        return "arcade-game"
      case "nft_avatar":
        return "arcade-game"
      case "nft_land":
        return "land"
      default:
        throw new Error(`Invalid NFT type: ${_marketType}`)
    }
  },
  handleDateTimeFormat(_date: Date, _type: "date" | "time"): string {
    if (_type === "date") {
      return dayjs(_date).format("DD MMM YYYY")
    }
    return dayjs(_date).format("HH:mm A")
  },
  getValueFromTKey(_search: TKey[], _field: string) {
    const _value = _search.find((s) => _field in s)
    if (_value) {
      return _value[_field]
    }
    return undefined
  }
}

export default Helper
