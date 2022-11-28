import dayjs from "dayjs"
import Helper from "@utils/helper"
import Axios from "axios"
import { unstable_batchedUpdates } from "react-dom"
import useProfileStore from "@stores/profileStore"
import handleDisconnectWallet from "@hooks/useWeb3Provider/useCreateWeb3Provider"
import { refreshProfileToken } from "@features/authentication/containers/services/auth.service"
import { ELocalKey } from "@interfaces/ILocal"
import CONFIGS from "."

const baseUrl = CONFIGS.BASE_URL.API
const isServer = () => typeof window === "undefined"

const services = Axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
})

export const removeAxiosToken = () => {
  delete services.defaults.headers.common.Authorization
}

const resetProfile = () => {
  unstable_batchedUpdates(() => {
    useProfileStore.getState().onReset()
    Helper.resetLocalStorage()
    removeAxiosToken()
  })
}

services.interceptors.request.use(async (config: any) => {
  if (isServer()) return config

  const token = Helper.getTokenFromLocal()
  // const time = localStorage.getItem("time")
  // if (time) {
  // const expire = dayjs(time).add(30, "minutes").unix()

  // const now = dayjs().unix()
  // if (now >= expire) {
  //   // disconnectWallet();
  // }
  // }
  if (token) {
    if (token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      resetProfile()
    }
  } else {
    resetProfile()
  }

  config.baseURL = baseUrl
  config.withCredentials = true
  return config
})

// 1. Get expire time
// 2. Interact - refresh token
// 3. Not interact - revoke token
services.interceptors.response.use(
  async (res) => res,
  async (err: any) => {
    const originalConfig = err.config

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          if (originalConfig.url === "/auth/revoke-token") {
            resetProfile()

            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject([])
          }
          await refreshProfileToken()
          const now = dayjs().format("YYYY-MM-DD HH:mm")
          Helper.setLocalStorage({ key: ELocalKey.time, value: now })
          return services(originalConfig) // if there is error in this line change service to Axios

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data)
          }

          return Promise.reject(_error)
        }
      } else if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true
        handleDisconnectWallet()
      }

      if (err.response.status === 400 && err.response.data) {
        return Promise.reject(err.response.data)
      }
    }

    return Promise.reject(err)
  }
)

export default services
