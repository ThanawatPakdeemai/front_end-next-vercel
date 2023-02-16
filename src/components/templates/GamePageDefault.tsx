import Banner from "@components/molecules/Banner"
import BannerSingle from "@components/molecules/BannerSingle"
import Howto from "@components/molecules/HowToPlay"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { GAME_DETAILS_BANNER } from "@constants/gameBanner"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGameStore from "@stores/game"
import React, { useEffect, useState } from "react"

interface IGamePageDefaultProps {
  component: React.ReactNode
  component2?: React.ReactNode
  component3?: React.ReactNode
  // Add more components here
}

const GamePageDefault = ({
  component,
  component2,
  component3
}: IGamePageDefaultProps) => {
  const data = useGameStore((state) => state.data)
  const gamePartnerData = useGameStore((state) => state.dataGamePartner)
  const [gameData, setGameData] = useState<IGame | IPartnerGameData>()

  useEffect(() => {
    if (data) {
      setGameData(data as IGame)
    } else if (gamePartnerData) {
      setGameData(gamePartnerData as IPartnerGameData)
    }
  }, [data, gamePartnerData])

  return (
    <div className="main-container mx-auto">
      <Header />
      {gameData && "image_banner" in gameData ? (
        <BannerSingle
          src={gameData.image_banner}
          alt={gameData.name}
        />
      ) : (
        <Banner data={GAME_DETAILS_BANNER} />
      )}

      {gameData && "device_support" in gameData && (
        <Howto data={gameData as IGame} />
      )}
      {component}
      {/**
       * @description In case there is a need to add another component
       */}
      {component2 && <div className="mt-12">{component2}</div>}
      {component3 && <div className="mt-12">{component3}</div>}
      <Footer />
    </div>
  )
}
export default GamePageDefault
