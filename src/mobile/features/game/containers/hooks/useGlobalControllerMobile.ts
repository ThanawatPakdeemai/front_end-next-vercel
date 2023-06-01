import { IGetType } from "@feature/game/interfaces/IGameService"
import { useState } from "react"

const useGlobalControllerMobile = () => {
  // State
  const [activeMenu, setActiveMenu] = useState<IGetType>("play-to-earn")

  return {
    setActiveMenu,
    activeMenu
  }
}

export default useGlobalControllerMobile
