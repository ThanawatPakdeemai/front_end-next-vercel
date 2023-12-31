import { TelegramUser } from "@components/atoms/button/TelegramWidget"
import { MESSAGES } from "@constants/messages"
import {
  useLinkToDiscord,
  useLinkToFacebook,
  useLinkToTelegram
} from "@feature/profile/containers/hook/useSyncProfileQuery"
import useToast from "@feature/toast/containers/useToast"
import { ELocalKey } from "@interfaces/ILocal"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { useCallback } from "react"
import { IProfileFaceBook } from "@feature/profile/interfaces/IProfileService"

const useSyncProfile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { mutateLinkToTelegram } = useLinkToTelegram()
  const { mutateLinkToFacebook } = useLinkToFacebook()
  const { mutateLinkToDiscord } = useLinkToDiscord()
  const { errorToast, successToast } = useToast()
  const { onSetProfileData } = useProfileStore()

  /**
   * @description Handle check user already exist in website, then sync data Facebook
   */
  const handleSyncFacebookId = useCallback(
    (response: IProfileFaceBook) => {
      if (!profile) return
      if (profile && profile.facebook_id) {
        errorToast(MESSAGES.sync_facebook_already)
        return
      }
      // If user not exist in website, then create new user in website
      mutateLinkToFacebook({
        email: profile.email,
        facebook_id: response.userID
      }).then((res) => {
        if (res.facebook_id) {
          successToast(MESSAGES.sync_facebook_success)
          // Update profile to store
          onSetProfileData(res)
        }
      })
    },
    [profile, errorToast, mutateLinkToFacebook, successToast, onSetProfileData]
  )

  /**
   * @description Handle check user already exist in website, then sync data telegram
   */
  const handleSyncTelegramId = useCallback(
    (response: TelegramUser) => {
      Helper.setLocalStorage({
        key: ELocalKey.telegramUser,
        value: JSON.stringify(response)
      })

      if (profile && profile.telegram_id) {
        errorToast(MESSAGES.sync_telegram_already)
        return
      }

      if (profile && !profile.telegram_id) {
        // If user not exist in website, then create new user in website
        mutateLinkToTelegram({
          email: profile.email,
          telegram_id: response.id
        }).then(async (res) => {
          if (res?.data?.telegram_id) {
            successToast(MESSAGES.sync_telegram_success)
            Helper.removeLocalStorage(ELocalKey.telegramUser)
            Helper.removeLocalStorage(ELocalKey.telegramId)
            if (res.data) {
              onSetProfileData(res.data)
            }
          }
        })
      }
    },
    [profile, errorToast, mutateLinkToTelegram, successToast, onSetProfileData]
  )

  const handleSyncDiscord = useCallback(
    (response: any) => {
      if (!profile) return
      if (profile && profile.discord_id) {
        errorToast(MESSAGES.sync_discord_error)
        return
      }

      mutateLinkToDiscord({
        email: profile.email,
        discord_id: response.userID
      }).then((res) => {
        if (res.discord_id) {
          successToast(MESSAGES.sync_discord_success)
          // Update profile to store
          onSetProfileData(res)
        }
      })
    },
    [errorToast, mutateLinkToDiscord, onSetProfileData, profile, successToast]
  )

  // const handleSyncGoogle = useCallback(
  //   (response: any) => {
  //     if (!profile) return
  //     if (profile && profile.google_id) {
  //       errorToast(MESSAGES.sync_google_error)
  //       return
  //     }

  //     mutateLinkToDiscord({
  //       player_id: profile.id,
  //       discord_id: response.userID
  //     }).then((res) => {
  //       if (res.google_id) {
  //         successToast(MESSAGES.sync_google_success)
  //         // Update profile to store
  //         onSetProfileData(res)
  //       }
  //     })
  //   },
  //   [errorToast, mutateLinkToDiscord, onSetProfileData, profile, successToast]
  // )

  return {
    handleSyncFacebookId,
    handleSyncTelegramId,
    handleSyncDiscord
    // handleSyncGoogle
  }
}

export default useSyncProfile
