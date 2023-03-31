import React, { useEffect, useState } from "react"
import Banners from "@components/molecules/Banners"
import BannerSingle from "@components/molecules/BannerSingle"
import Howto from "@components/molecules/HowToPlay"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { MESSAGES } from "@constants/messages"
import useShareToEarnTracking from "@feature/game/containers/hooks/useShareToEarnTracking"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { useToast } from "@feature/toast/containers"
import useGlobal from "@hooks/useGlobal"
import { ELocalKey } from "@interfaces/ILocal"
import useGameStore from "@stores/game"
import Helper from "@utils/helper"
import { useRouter } from "next/router"

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

  const data = useGameStore((state) => state.data)
  const { stateProfile } = useGlobal()
  const gamePartnerData = useGameStore((state) => state.dataGamePartner)
  const [gameData, setGameData] = useState<IGame | IPartnerGameData>()

  const getCodeShareToEarn = () => {
    const gameId = data?.id
    const playerId = stateProfile?.id
    const codeId = router.asPath.substring(
      router.asPath.indexOf("?af") + 3,
      router.asPath.lastIndexOf("")
    )

    if (gameId && playerId && codeId && router.asPath.includes("?af")) {
      mutateShareToEarnTracking({
        player_id: playerId,
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
  }

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
    handleTimeExpire()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getCodeShareToEarn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, stateProfile?.id])

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
      <Footer />
    </div>
  )
}
export default GamePageDefault
