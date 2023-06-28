import { TelegramUser } from "@components/atoms/button/TelegramWidget"
import { MESSAGES } from "@constants/messages"
import useLinkToTelegram from "@feature/game/containers/hooks/useLinkToTelegram"
import useToast from "@feature/toast/containers/useToast"
import { ELocalKey } from "@interfaces/ILocal"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { useCallback } from "react"

const useSyncProfile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { mutateLinkToTelegram } = useLinkToTelegram()
  const { errorToast, successToast } = useToast()
  // Maybe not neccessary
  // const telegramIdLocal = Helper.getLocalStorage(ELocalKey.telegramId)

  const handleSyncFacebookId = useCallback(() => {
    // get facebook id from local storage
    // if facebook id exist, then sync data facebook
  }, [])

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
          player_id: profile.id,
          telegram_id: response.id
        }).then((res) => {
          if (res?.data?.telegram_id) {
            successToast(MESSAGES.sync_telegram_success)
            Helper.removeLocalStorage(ELocalKey.telegramUser)
            Helper.removeLocalStorage(ELocalKey.telegramId)
          }
        })
      }
    },
    [profile, errorToast, mutateLinkToTelegram, successToast]
  )

  return {
    handleSyncFacebookId,
    handleSyncTelegramId
  }
}

export default useSyncProfile
