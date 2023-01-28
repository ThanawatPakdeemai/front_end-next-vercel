import OverviewIcon from "@components/icons/OverviewIcon"
import Banner from "@components/molecules/Banner"
import Howto from "@components/molecules/HowToPlay"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import Overview from "@components/organisms/Overview"
import { GAME_DETAILS_BANNER } from "@constants/gameBanner"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGameStore from "@stores/game"
import React, { useEffect, useState } from "react"

interface IGamePageDefaultProps {
  children: React.ReactNode
  title: string
  // component: React.ReactNode
}

const GamePageDefault = ({ children, title }: IGamePageDefaultProps) => {
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()

  useEffect(() => {
    if (data) setGameData(data)
  }, [data])

  return (
    <div className="main-container mx-auto">
      <Header />
      <Banner data={GAME_DETAILS_BANNER} />
      {gameData && <Howto data={gameData} />}
      <div className="flex-row gap-3 md:flex">
        <div className="mb-3 min-h-[500px] w-full rounded-md border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-4/6">
          {children}
        </div>
        <div className="mb-3 min-h-[500px] rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 md:w-2/6">
          <Overview
            icon={<OverviewIcon />}
            title={title}
            description={gameData ? gameData.howto.details : ""}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default GamePageDefault
