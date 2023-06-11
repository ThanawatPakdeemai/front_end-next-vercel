import { IGetType } from "@feature/game/interfaces/IGameService"
import { useState } from "react"

const useGlobalControllerMobile = () => {
  // State
  const [activeMenu, setActiveMenu] = useState<IGetType>("play-to-earn")
  const [limit, setLimit] = useState<number>(10)

  return {
    setActiveMenu,
    activeMenu,
    limit,
    setLimit
  }
}

export default useGlobalControllerMobile
