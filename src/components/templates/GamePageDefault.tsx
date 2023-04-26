import React, { useEffect, useState } from "react"
import ShineIcon from "@components/icons/ShineIcon"
import Banners from "@components/molecules/Banners"
import BannerSingle from "@components/molecules/BannerSingle"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGlobal from "@hooks/useGlobal"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import useTopPlayerByGameId from "@feature/ranking/containers/hook/useTopPlayerByGameId"
import useGameStore from "@stores/game"
import Howto from "@components/molecules/HowToPlay"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"

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
  const { getTypeGamePathFolder } = useGlobal()
  const { handleTimeExpire, getCodeShareToEarn } = useBuyGameItemController()
  const data = useGameStore((state) => state.data)
  const { stateProfile } = useGlobal()
  const gamePartnerData = useGameStore((state) => state.dataGamePartner)
  const [gameData, setGameData] = useState<IGame | IPartnerGameData>()
  const { statsGameById } = useGetStatisticsGameById()
  const { topPlayerGameId } = useTopPlayerByGameId()
  const { t } = useTranslation()

  const renderStatistic = () => {
    if (!gameData) return null
    switch (getTypeGamePathFolder(gameData as IGame)) {
      case "story-mode-games":
      case "free-to-play-games":
        return null
      default:
        return (
          <Box component="section">
            <Tagline
              bgColor="bg-neutral-800"
              textColor="text-neutral-500 font-bold"
              text={t("game_page_tagline_desc")}
              icon={<ShineIcon />}
              show={false}
            />
            <div className="flex flex-wrap gap-3 xl:flex-row xl:flex-nowrap">
              {/* <LikeNoLobby
                imgSrc={
                  gameData && "image_category_list" in gameData
                    ? gameData.image_category_list
                    : ""
                }
                value={78.34}
              /> */}
              <StatisticGameDetail statsGameById={statsGameById} />
              <TopPlayer
                element="select"
                subtitle
                background="neutral"
                note
                elevation={0}
                className="lg:max-w-auto max-w-full border border-neutral-900 border-opacity-80 !bg-warning-contrastText lg:!h-[424px] xl:!w-[100%]"
                rank
                topPlayerGameId={topPlayerGameId && topPlayerGameId}
              />
            </div>
          </Box>
        )
    }
  }

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

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) {
        handleTimeExpire()
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) {
        getCodeShareToEarn()
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateProfile])

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

      {gameData && <Howto data={gameData as IGame} />}
      {component}
      {renderStatistic()}
      {/**
       * @description In case there is a need to add another component
       */}
      {component2 && <div className="mt-12">{component2}</div>}
      {component3 && <div className="mt-12">{component3}</div>}
      {/* //NOTE - comment ไว้ก่อน ค่อยเปิด feature นี้ทีหลัง */}
      {/* {gameData && (
        <ReleatedGames _gameType={getTypeGamePathFolder(gameData as IGame)} />
      )} */}
      <Footer />
    </div>
  )
}
export default GamePageDefault
