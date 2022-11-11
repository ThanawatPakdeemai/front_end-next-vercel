import {
  IProfile,
  IProfileResponse
} from "@src/features/profile/interfaces/IProfileServices"
import configZustandDevTools from "@src/utils/configDevtools"
import helper from "@src/utils/helper"
import create from "zustand"
import { devtools } from "zustand/middleware"

export interface IUseProfileStore {
  address: string | undefined
  profile: IProfileResponse
  isLogin: boolean
  getProfile: () => IProfileResponse
  getProfileAddress: () => string | undefined
  getProfileJWT: () => string | null
  onReset: () => void
  onSetProfileAddress: (_address: string | undefined) => void
  onSetProfileData: (_profile: IProfile) => void
  onSetProfileJWT: (_token: string) => void
}

const useProfileStore = create<IUseProfileStore>()(
  devtools(
    (set, get) => ({
      address: undefined,
      isLogin: false,
      profile: {
        status: false,
        data: null,
        message: null
      },
      getProfile: () => get().profile,
      getProfileAddress: () => get().address,
      getProfileJWT: () => get().profile.data?.jwtToken || "",
      onReset: () => {
        const resetData = {
          status: false,
          data: null,
          message: null
        }
        set(
          (prev) => ({
            ...prev,
            profile: { ...resetData },
            address: undefined
          }),
          false,
          "ProfileStore/onReset"
        )
      },
      onSetProfileAddress: (_address) => {
        set(
          () => ({ address: _address }),
          false,
          "ProfileStore/onSetProfileAddress"
        )
      },
      onSetProfileData: (_profile) => {
        const dummyProfile = get().profile
        dummyProfile.data = { ..._profile }
        set(
          () => ({
            address: _profile.address,
            profile: { ...dummyProfile }
          }),
          false,
          "ProfileStore/onSetProfileData"
        )
      },
      onSetProfileJWT: (_token: string) => {
        const dummyProfile = get().profile
        // @ts-ignore
        dummyProfile.data.jwtToken = _token
        set(
          (prev) => ({ ...prev, profile: { ...dummyProfile } }),
          false,
          "ProfileStore/onSetProfileToken"
        )
        helper.setTokenToLocal(_token)
      }
    }),
    configZustandDevTools("Profile-Store")
  )
)

export default useProfileStore
