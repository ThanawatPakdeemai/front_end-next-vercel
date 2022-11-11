// import {
//   IAuthService,
//   IProfileSignUp
// } from "@feature/profile/interfaces/IProfileServices"
// import Config from "@src/configs"
// import services from "@src/configs/axiosGlobalConfig"
// import useProfileStore from "@src/stores/profileStore"
// import helper from "@src/utils/helper"
// import axios from "axios"
// import { IRefreshToken } from "../../interface/IAuth"

export const signIn = (_address: string, _signature: string) =>
  new Promise<any>((resolve, reject) => {
    resolve(null)
  })

export const signUp = (_address: string, _signature: string) =>
  new Promise<{ data: any }>((resolve, reject) => {
    resolve({ data: [] })
  })

/**
 * @description Function has avariable for user role "ADMIN"
 * @param _token JWT token
 * @returns
 */
export const signOut = async () =>
  new Promise((resolve, reject) => {
    resolve(null)
  })

export const refreshProfileToken = async (
  callBeckWhenError?: () => void
): Promise<any | undefined> => {}
// try {
//   const response = await axios.post<{ data: string }>(
//     `${Config.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
//     {},
//     {
//       withCredentials: true
//     }
//   )
//   const result = helper.decryptWithAES(response.data.data)
//   return JSON.parse(result)
// } catch (error) {
//   useProfileStore.getState().onReset()
//   helper.removeTokenInLocal()
//   callBeckWhenError && callBeckWhenError()
//   if (error instanceof Error) {
//     console.error("Error", error.message)
//     throw Error(`refreshToken : ${error}`)
//   }
// }
//   return {}
// }
// end of refreshProfileToken --
