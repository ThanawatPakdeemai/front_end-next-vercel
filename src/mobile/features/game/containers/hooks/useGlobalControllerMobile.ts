import { IGetType } from "@feature/game/interfaces/IGameService"
import { useState } from "react"

const useGlobalControllerMobile = () => {
  // State
  const [activeMenu, setActiveMenu] = useState<IGetType>("play-to-earn")
  const [limit, setLimit] = useState<number>(10)
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  return {
    setActiveMenu,
    activeMenu,
    limit,
    setLimit,
    iOS
  }
}

export default useGlobalControllerMobile
