import dayjs from "dayjs"
import { refreshProfileToken } from "@src/features/authentication/container/service/profile.services"
import helper from "@src/utils/helper"
import Axios, { AxiosError } from "axios"
import jwtDecode from "jwt-decode"
import { unstable_batchedUpdates } from "react-dom"
import useProfileStore from "@src/stores/profileStore"
import Config from "."

const baseUrl = Config.NEXT_PUBLIC_API_URL
const isServer = () => typeof window === "undefined"

const resetProfile = () => {
  unstable_batchedUpdates(() => {
    useProfileStore.getState().onReset()
  })
}
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

services.interceptors.request.use(async (config: any) => {
  if (isServer()) return config

  const token = localStorage.getItem("token")
  const time = localStorage.getItem("time")
  if (time) {
    const expire = dayjs(time).add(30, "minutes").unix()

    const now = dayjs().unix()
    if (now >= expire) {
      // disconnectWallet();
    }
  }
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

services.interceptors.response.use(
  (response) => {
    const stringData = response.data.data

    if (typeof stringData === "string") {
      const data = JSON.parse(helper.decryptWithAES(stringData))
      response.data = data
    }

    return response
  },
  async (err: AxiosError) => {
    // const originalConfig = err.config

    if (err.response && err.response.status === 401) {
      if (err?.config?.url === "/auth/revoke-token") {
        // removeAccessToken()
        return Promise.reject(new Error("Revoke token:"))
      }
      // return refreshToken(err)
      // return services(originalConfig)
      // useProfileStore().onReset()
      resetProfile()
      return Promise.reject(
        new Error("authentication has failed, Please connect wallet again.")
      )
    }

    // @ts-ignore
    if (typeof err?.response?.data?.data === "string") {
      // @ts-ignore
      const data = JSON.parse(helper.decryptWithAES(err.response.data.data))
      err.response.data = data
    }

    return Promise.reject(err.response?.data)
  }
)

export default services
