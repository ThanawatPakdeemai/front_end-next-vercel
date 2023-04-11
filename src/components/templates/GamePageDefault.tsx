import React, { useCallback, useEffect, useState } from "react"
import ShineIcon from "@components/icons/ShineIcon"
import Banners from "@components/molecules/Banners"
import BannerSingle from "@components/molecules/BannerSingle"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
// import ReleatedGames from "@feature/game/components/molecules/RelatedGames"
import { MESSAGES } from "@constants/messages"
import useShareToEarnTracking from "@feature/game/containers/hooks/useShareToEarnTracking"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { useToast } from "@feature/toast/containers"
import useGlobal from "@hooks/useGlobal"
import { ELocalKey } from "@interfaces/ILocal"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import useTopPlayerByGameId from "@feature/ranking/containers/hook/useTopPlayerByGameId"
import useGameStore from "@stores/game"
import Helper from "@utils/helper"
import { useRouter } from "next/router"
import Howto from "@components/molecules/HowToPlay"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"

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
  const router = useRouter()
  const { mutateShareToEarnTracking } = useShareToEarnTracking()
  const { successToast, errorToast } = useToast()
  const { getTypeGamePathFolder } = useGlobal()

  const data = useGameStore((state) => state.data)
  const { stateProfile } = useGlobal()
  const gamePartnerData = useGameStore((state) => state.dataGamePartner)
  const [gameData, setGameData] = useState<IGame | IPartnerGameData>()
  const { statsGameById } = useGetStatisticsGameById()
  const { topPlayerGameId } = useTopPlayerByGameId()
  const { t } = useTranslation()

  const getCodeShareToEarn = useCallback(() => {
    const gameId = data?.id
    const codeId = router.asPath.substring(
      router.asPath.indexOf("?af") + 3,
      router.asPath.lastIndexOf("")
    )

    if (
      gameId &&
      stateProfile &&
      stateProfile.id &&
      codeId &&
      router.asPath.includes("?af")
    ) {
      mutateShareToEarnTracking({
        player_id: stateProfile.id,
        game_id: gameId,
        code: codeId
      })
        .then((_res) => {
          if (_res) {
            const expireTime = _res.data.time_expires
            Helper.setLocalStorage({
              key: ELocalKey.shareToEarn,
              value: expireTime
            })
            successToast(MESSAGES.get_link_share_success)
          }
        })
        .catch(() => {
          const str = router.asPath
          const index = str.indexOf("?af")
          const href = index !== -1 ? str.substring(0, index) : str
          Helper.removeLocalStorage(ELocalKey.shareToEarn)
          router.push(href)
          errorToast(MESSAGES.get_link_share_not_success)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, data, router, stateProfile])

  const handleTimeExpire = () => {
    const expireTimeShare = Helper.getLocalStorage(ELocalKey.shareToEarn)
    if (expireTimeShare && expireTimeShare !== "") {
      const timeStampNow = Date.now()
      const timeStampExp = Number(expireTimeShare)
      if (timeStampExp) {
        if (timeStampExp <= timeStampNow) {
          const str = router.asPath
          const index = str.indexOf("?af")
          const href = index !== -1 ? str.substring(0, index) : str
          Helper.removeLocalStorage(ELocalKey.shareToEarn)
          router.push(href)

          errorToast(MESSAGES.commission_expired)
        } else {
          successToast(MESSAGES.commission_not_expired)
        }
      }
    }
  }

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
      {/**
       * @description In case there is a need to add another component
       */}
      {component2 && <div className="mt-12">{component2}</div>}
      {component3 && <div className="mt-12">{component3}</div>}
      {renderStatistic()}
      {/* //NOTE - comment ไว้ก่อน ค่อยเปิด feature นี้ทีหลัง */}
      {/* {gameData && (
        <ReleatedGames _gameType={getTypeGamePathFolder(gameData as IGame)} />
      )} */}
      <Footer />
    </div>
  )
}
export default GamePageDefault
