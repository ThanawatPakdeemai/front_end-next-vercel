import axios from "axios"
import {
  getAllGames,
  getGameById
} from "@src/features/game/containers/services/game.service"
import {
  getCurrentNaka,
  getCurrentNakaExternal
} from "@src/features/inventory/containers/services/inventory.service"
import { IGame, IGameAllResponse } from "@src/types/games"
import { IPriceCurrentResponse } from "@src/types/transaction"
import { encrypt } from "@src/helpers/encrypt"
import toast from "react-hot-toast"

// {
//   "usd": 0.064429
// }
export const calItemToNaka = async (qty: number, bulletPerUSD: number) => {
  const response: IPriceCurrentResponse = await getCurrentNaka()
  const bulletPrice = bulletPerUSD / parseFloat(response.last)
  const bulletToFixed = bulletPrice.toFixed(5)
  const bulletPerNaka = parseFloat(
    bulletToFixed.substring(0, bulletToFixed.length - 1)
  )
  const total: number = qty * bulletPerNaka

  return total
}

export const calculateItemPerPrice = async (price: number) => {
  const itemPrice = await calItemToNaka(1, price)
  const itemToFixed = itemPrice.toFixed(5)
  const itemPerNaka = parseFloat(
    itemToFixed.substring(0, itemToFixed.length - 1)
  )
  return itemPerNaka
}

/**
 * This function for make number 4 digit
 * 00.0000 (ไม่ปัดเศษ)
 */
export const number4digit = (value: number) => {
  const _number = parseFloat(
    value.toFixed(5).substring(0, value.toFixed(5).length - 1)
  )
  return _number
}

/**
 * This function for lazy loading images
 */
export const lazyLoad = () => {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"))
  const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target as HTMLImageElement
        if (lazyImage.dataset.src) {
          lazyImage.src = lazyImage.dataset.src
          lazyImageObserver.unobserve(lazyImage)
          lazyImage.onload = function () {
            lazyImage.classList.remove("lazy")
          }
        }
      }
    })
  })

  lazyImages.forEach((lazyImage) => {
    lazyImageObserver.observe(lazyImage)
  })
}

/**
 * This function to separate number with comma.
 * 1000 to be 1,000
 */

export const numberWithCommas = (_number: number) => {
  // check if number is float, return as same number without comma
  // check if number has 3 digit or less than 3, return number without comma
  const parts = _number.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

/**
 * This function mix string with dots
 * 0x0000...000000
 */

export const textWithDots = (_string: string, length: number) =>
  /**
   * TO DO
   */
  // Check _string length
  // Check _string indexOf
  // Check if x is the position 2 of string
  // Check number length is not negative
  // Check number length is not zero
  // Check if address contain with space
  `${_string.substring(0, length)}...${_string.substring(
    _string.length - length,
    _string.length
  )}`

/**
 * This function to create unreadable link
 */
export const createEncryptLink = (length: number) => {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * This function to create unreadable link
 */
export const encodeURILink = (email: string, token: string) =>
  `?m=${encodeURIComponent(encrypt(email))}&refer=${encodeURIComponent(
    encrypt(token)
  )}`

/**
 * Click and copy the text
 */
export const copyClipboard = (value: string) => {
  // Copy the text inside the text field
  navigator.clipboard.writeText(value)
  toast.success("Copied!")
}

/* Create Id */
export const makeID = (length: number) => {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/* Get IP Address */
export async function getIP() {
  const response = await fetch("https://api.ipify.org/?format=json")
  const data = await response.json()
  return data
}

export async function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export async function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
  }
}

export const displayUsername = (_username: string) => {
  const _countWord = 10
  if (_username.length > _countWord) {
    return `${_username.substring(0, _countWord)}...`
  }
  return _username
}
