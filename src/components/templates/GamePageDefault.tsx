import ShineIcon from "@components/icons/ShineIcon"
import Banners from "@components/molecules/Banners"
import BannerSingle from "@components/molecules/BannerSingle"
import Howto from "@components/molecules/HowToPlay"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import useTopPlayerByGameId from "@feature/ranking/containers/hook/useTopPlayerByGameId"
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
  const { statsGameById } = useGetStatisticsGameById()
  const { topPlayerGameId } = useTopPlayerByGameId()

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) {
        setGameData(data as IGame)
      } else if (gamePartnerData) {
        setGameData(gamePartnerData as IPartnerGameData)
      }
    }

    return () => {
      load = true
    }
  }, [data, gamePartnerData])

  return (
    <div className="main-container mx-auto w-full  px-2 lg:px-0">
      <Header />
      {gameData && "image_banner" in gameData ? (
        <BannerSingle
          src={gameData.image_banner}
          alt={gameData.name}
        />
      ) : (
        // eslint-disable-next-line react/jsx-no-undef
        <Banners />
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
      <Tagline
        bgColor="bg-neutral-800"
        textColor="text-neutral-500 font-bold"
        text="Don't miss the information analysis about this game"
        // text={`${gameData?.name} : ${
        //   gameData && "story" in gameData ? gameData?.story : ""
        // }`}
        icon={<ShineIcon />}
      />
      <div className="flex flex-wrap gap-3 xl:flex-row xl:flex-nowrap">
        <LikeNoLobby
          imgSrc={
            gameData && "image_category_list" in gameData
              ? gameData.image_category_list
              : ""
          }
          value={78.34}
        />
        <StatisticGameDetail statsGameById={statsGameById} />
        <TopPlayer
          element="select"
          subtitle
          background="neutral"
          note
          elevation={0}
          className="lg:max-w-auto max-w-full border border-neutral-900 border-opacity-80 !bg-warning-contrastText lg:!h-[424px] xl:!w-[550px]"
          rank
          topPlayerGameId={topPlayerGameId && topPlayerGameId}
        />
      </div>
      <Footer />
    </div>
  )
}
export default GamePageDefault
