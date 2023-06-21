import { IGetType } from "@feature/game/interfaces/IGameService"
import { useCallback, useState } from "react"

const useGlobalControllerMobile = () => {
  // State
  const [activeMenu, setActiveMenu] = useState<IGetType>("free-to-play")
  const [limit, setLimit] = useState<number>(10)
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

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
    handleClickOpenLoading
  }
}

export default useGlobalControllerMobile
