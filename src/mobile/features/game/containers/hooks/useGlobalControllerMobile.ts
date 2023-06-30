import { IGetType } from "@feature/game/interfaces/IGameService"
// import { useBaseProvider } from "@providers/BaseProvider"
import useProfileStore from "@stores/profileStore"
import { useCallback, useState } from "react"

const useGlobalControllerMobile = () => {
  const profile = useProfileStore((state) => state.profile.data)
  // const { paramFromTelegram } = useBaseProvider()

  // State
  const [activeMenu, setActiveMenu] = useState<IGetType>("free-to-play")
  const [limit, setLimit] = useState<number>(10)
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  /**
   * @description Variable to hide sync telegram button
   *
   */
  const isShowSyncTelegram = useCallback(
    () =>
      // Hide to re-test
      // if (profile && profile.telegram_id) return false
      // if (paramFromTelegram.user_id) {
      //   return true
      // }
      false,
    []
  )

  /**
   * @description Variable to hide sync facebook button
   */
  const isShowSyncFacebook = useCallback(() => {
    if (profile && profile.facebook_id) return false
    return true
  }, [profile])

  const handleClickOpenLoading = useCallback(() => {
    // do something
    // setOpen("")
  }, [])

  return {
    setActiveMenu,
    activeMenu,
    limit,
    setLimit,
    iOS,
    handleClickOpenLoading,
    isShowSyncTelegram,
    isShowSyncFacebook
  }
}

export default useGlobalControllerMobile
