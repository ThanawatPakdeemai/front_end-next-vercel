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
  const isShowSyncTelegram = useCallback(
    () =>
      // TODO: display when ready
      // if (profile && profile.telegram_id) return false
      // return true
      false,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile]
  )

  /**
   * @description Variable to hide sync facebook button
   */
  const isShowSyncFacebook = useCallback(
    () =>
      // TODO: display when ready
      // if (profile && profile.facebook_id) return false
      // return true
      false,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile]
  )

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
