import dayjs from "dayjs"
import { refreshProfileToken } from "@src/features/authentication/container/service/profile.services"
import helper from "@src/utils/helper"
import Axios from "axios"
import { unstable_batchedUpdates } from "react-dom"
import useProfileStore from "@src/stores/profileStore"
import handleDisconnectWallet from "@src/hooks/useWeb3Provider/useCreateWeb3Provider"
import Config from "."

const baseUrl = Config.NEXT_PUBLIC_API_URL
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
    helper.resetLocalStorage()
    removeAxiosToken()
  })
}

services.interceptors.request.use(async (config: any) => {
  if (isServer()) return config

  const token = localStorage.getItem("token")
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

  config.baseURL = `${process.env.REACT_APP_API_URL}`
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
          localStorage.setItem("time", dayjs().format("YYYY-MM-DD HH:mm"))
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
