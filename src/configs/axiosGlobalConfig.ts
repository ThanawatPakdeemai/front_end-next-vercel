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

const resetStore = () => {
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

services.interceptors.request.use(async (config) => {
  if (isServer()) return config

  const rawData = config.data
  if (rawData && rawData.data) {
    if (typeof rawData.data === "object") {
      config.data = {
        data: helper.encryptWithAES(JSON.stringify(rawData.data))
      }
    } else if (typeof rawData.data === "string") {
      config.data = { data: rawData.data }
    }
  }
  const token = localStorage.getItem("token")
  if (token) {
    const userToken = jwtDecode<{
      address: string
      iat: number
      exp: number
    }>(token)
    const isExpired = dayjs.unix(userToken.exp).diff(dayjs()) < 1

    if (!isExpired) {
      helper.setTokenToLocal(token)
      config.headers!.Authorization = `Bearer ${token}`
      return config
    }

    try {
      const response = await refreshProfileToken(() => {
        // Callback : for clear profile.
        useProfileStore.getState().onReset()
      })
      if (response) {
        helper.setTokenToLocal(response.jwtToken)
        config.headers!.Authorization = `Bearer ${response.jwtToken}`
        return config
      }
    } catch (error) {
      useProfileStore.getState().onReset()
      helper.removeTokenInLocal()
    }

    return config
  }

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
      resetStore()
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
