import useProfileStore from "@stores/profileStore"
import { useCallback, useState } from "react"

const useGlobalControllerMobile = () => {
  const profile = useProfileStore((state) => state.profile.data)

  // State
  const [limit, setLimit] = useState<number>(10)
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  /**
   * @description Variable to hide sync telegram button
   *
   */
  const isShowSyncTelegram = useCallback(() => {
    if (profile?.telegram_id) return false
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  /**
   * @description Variable to hide sync facebook button
   */
  const isShowSyncFacebook = useCallback(() => {
    if (profile?.facebook_id) return false
    return true
  }, [profile])

  const handleClickOpenLoading = useCallback(() => {
    // do something
    // setOpen("")
  }, [])

  return {
    limit,
    setLimit,
    iOS,
    handleClickOpenLoading,
    isShowSyncTelegram,
    isShowSyncFacebook
  }
}

export default useGlobalControllerMobile
