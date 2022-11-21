import axios from "axios"
import Config from "@src/configs"
import { IRefreshToken } from "@src/interfaces/IAuth"
import useProfileStore from "@src/stores/profileStore"
import helper from "@src/utils/helper"

export const signIn = (_address: string, _signature: string) =>
  new Promise<any>((resolve) => {
    resolve(null)
  })

export const signUp = (_address: string, _signature: string) =>
  new Promise<{ data: any }>((resolve) => {
    resolve({ data: [] })
  })

/**
 * @description Function has avariable for user role "ADMIN"
 * @param _token JWT token
 * @returns
 */
export const signOut = async () =>
  new Promise((resolve) => {
    resolve(null)
  })

export const refreshProfileToken = async (
  callBeckWhenError?: () => void
): Promise<any | undefined> => {
  try {
    const response = await axios.post<IRefreshToken>(
      `${Config.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {},
      {
        withCredentials: true
      }
    )
    localStorage.setItem("token", response.data.jwtToken)
    axios.defaults.headers.common = {
      Authorization: `Bearer ${response.data.jwtToken}`
    }

    return response.data.jwtToken
  } catch (error) {
    useProfileStore.getState().onReset()
    helper.resetLocalStorage()
    callBeckWhenError && callBeckWhenError()
    if (error instanceof Error) {
      console.error("Error", error.message)
      throw Error(`refreshToken : ${error}`)
    }
  }
}
