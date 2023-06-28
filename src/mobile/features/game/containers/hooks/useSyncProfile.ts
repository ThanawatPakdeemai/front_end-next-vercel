import { MESSAGES } from "@constants/messages"
import useLinkToTelegram from "@feature/game/containers/hooks/useLinkToTelegram"
import useToast from "@feature/toast/containers/useToast"
import { ELocalKey } from "@interfaces/ILocal"
import useDrawerControllerMobileStore from "@stores/drawerControllerMobile"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { useCallback } from "react"

const useSyncProfile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { mutateLinkToTelegram } = useLinkToTelegram()
  const { successToast, errorToast } = useToast()
  const telegramIdLocal = Helper.getLocalStorage(ELocalKey.telegramId)

  /**
   * @description Handle sync data telegram using authorization data from Telegram
   * Tiger's function
   */
  // const handleSyncTelegramId = async () => {
  //   if (!profile) return
  //   const telegramParams: any = await localStorage.getItem("telegram-params")
  //   const telegramParse: any = JSON.parse(telegramParams)
  //   if (telegramParse) {
  //     const telegramId = String(telegramParse.id)
  //     if (telegramId) {
  //       mutateLinkToTelegram({
  //         player_id: profile.id,
  //         telegram_id: telegramId
  //       })
  //       localStorage.removeItem("telegram-params")
  //     }
  //   }
  // }

  const handleSyncFacebookId = useCallback(() => {
    // get facebook id from local storage
    // if facebook id exist, then sync data facebook
  }, [])

  /**
   * @description Handle check user already exist in website, then sync data telegram
   */
  const handleSyncTelegramId = useCallback(() => {
    // When url is from telegram, pick the telegram id from local storage url
    if (!telegramIdLocal) return
    if (profile && profile.telegram_id) {
      errorToast(MESSAGES.sync_telegram_already)
      return
    }
    if (profile && !profile.telegram_id) {
      // If user not exist in website, then create new user in website
      mutateLinkToTelegram({
        player_id: profile.id,
        telegram_id: telegramIdLocal
      }).then((res) => {
        if (res?.data?.telegram_id) {
          successToast(MESSAGES.sync_telegram_success)
          // Helper.removeLocalStorage(ELocalKey.telegramId)
        }
      })
    }
  }, [profile])

  return {
    handleSyncFacebookId,
    handleSyncTelegramId,
    telegramIdLocal
  }
}

export default useSyncProfile
