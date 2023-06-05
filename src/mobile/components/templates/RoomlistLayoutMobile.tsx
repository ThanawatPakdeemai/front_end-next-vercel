import React from "react"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import { IGame } from "@feature/game/interfaces/IGameService"
import LogoNakaBigIcon from "@components/icons/LogoNakaBigIcon"
import useProfileStore from "@stores/profileStore"
import NoData from "@components/molecules/NoData"
import PleaseLogin from "@components/atoms/PleaseLogin"
import MultiRoom from "@mobile/features/game/components/templates/multi/MultiRoom"
import SingleRoom from "@mobile/features/game/components/templates/single/SingleRoom"
import ModalCreateRoom from "@feature/rooms/components/molecules/ModalCreateRoom"
import ArrowBackIcon from "../atoms/icons/ArrowBackIcon"

export interface IRoomlistLayoutMobileProps {
  gameData: IGame
}

const RoomlistLayoutMobile = ({ gameData }: IRoomlistLayoutMobileProps) => {
  const router = useRouter()
  const profile = useProfileStore((state) => state.profile.data)

  const getTemplateGame = () => {
    switch (gameData.game_type) {
      case "singleplayer":
        return <SingleRoom />
      case "multiplayer":
        if (profile) {
          return <MultiRoom />
        }
        return <PleaseLogin />
      default:
        return <NoData />
    }
  }

  return (
    <Box
      component="div"
      className="flex min-h-[100vh] flex-col bg-[#121212] p-[0_24px_24px]"
    >
      <h2 className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary">
        <i
          onClick={() => router.back()}
          aria-hidden="true"
        >
          <ArrowBackIcon />
        </i>
        Room List
      </h2>

      <Box
        component="section"
        className="game-section flex flex-col gap-6 font-urbanist text-white-primary"
      >
        <h3
          className="flex items-center gap-4 font-urbanist text-white-primary"
          aria-hidden="true"
        >
          <LogoNakaBigIcon
            width={30}
            height={14}
          />
          Room List: {gameData.name}
        </h3>
        {gameData && gameData.game_type === "multiplayer" && (
          <div className="mr-2 w-[162px]">
            <ModalCreateRoom gameData={gameData} />
          </div>
        )}
        {getTemplateGame()}
      </Box>
    </Box>
  )
}

export default RoomlistLayoutMobile
