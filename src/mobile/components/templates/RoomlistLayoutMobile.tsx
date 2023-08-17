import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { IGame } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"
import useCreateRoomController from "@feature/rooms/hooks/useCreateRoomController"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import useLoadingStore from "@stores/loading"

const ButtonFilledTemplate = dynamic(() => import("./ButtonFilledTemplate"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const LogoNakaBigIcon = dynamic(
  () => import("@components/atoms/svg/LogoNakaBigIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: false
})
const PleaseLogin = dynamic(() => import("@components/atoms/PleaseLogin"), {
  suspense: true,
  ssr: false
})
const MultiRoom = dynamic(
  () => import("@mobile/features/game/components/templates/multi/MultiRoom"),
  {
    suspense: true,
    ssr: false
  }
)
const SingleRoom = dynamic(
  () => import("@mobile/features/game/components/templates/single/SingleRoom"),
  {
    suspense: true,
    ssr: false
  }
)
const ModalCreateRoomMobile = dynamic(
  () =>
    import("@mobile/features/rooms/components/molecules/ModalCreateRoomMobile"),
  {
    suspense: true,
    ssr: false
  }
)

export interface IRoomlistLayoutMobileProps {
  gameData: IGame
}

const RoomlistLayoutMobile = ({ gameData }: IRoomlistLayoutMobileProps) => {
  const router = useRouter()
  const { openCreateRoom, setOpenCreateRoom } = useDrawerControllerMobile()
  const profile = useProfileStore((state) => state.profile.data)
  const {
    map,
    maps,
    setMap,
    handleSetIsCurrent,
    isPublicRoom,
    setIsPublicRoom,
    isLoading,
    handleSubmit
  } = useCreateRoomController({
    gameData
  })
  const { setClose } = useLoadingStore()

  /**
   * @description State for close loading
   */
  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData) {
        setClose()
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData, setClose])

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
      sx={{
        "h2": {
          lineHeight: "1",
          alignItems: "flex-start"
        }
      }}
    >
      <h2 className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary">
        <i
          onClick={() => router.push(`/${gameData.game_mode}/${gameData.path}`)}
          aria-hidden="true"
        >
          <Icomoon className="icon-Full-Arrow-Left" />
        </i>
        Room List
      </h2>

      <Box
        component="section"
        sx={{
          ".logo-naka": {
            top: "5px",
            position: "relative"
          }
        }}
        className="game-section flex flex-col gap-6 font-urbanist text-white-primary"
      >
        <h3
          className="flex gap-4 font-urbanist font-semibold text-white-primary"
          aria-hidden="true"
        >
          <LogoNakaBigIcon
            width={30}
            height={14}
            className="logo-naka"
          />
          Room List: {gameData.name}
          {gameData && gameData.game_type === "multiplayer" && (
            <div className="ml-auto">
              <ButtonFilledTemplate
                onClick={() => setOpenCreateRoom(true)}
                color="#F32429"
              >
                Create Room
              </ButtonFilledTemplate>
              <ModalCreateRoomMobile
                gameData={gameData}
                openCreateRoom={openCreateRoom}
                setOpenCreateRoom={setOpenCreateRoom}
                isPublicRoom={isPublicRoom}
                setIsPublicRoom={setIsPublicRoom}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                map={map}
                maps={maps}
                setMap={setMap}
                handleSetIsCurrent={handleSetIsCurrent}
              />
            </div>
          )}
        </h3>
        {getTemplateGame()}
      </Box>
    </Box>
  )
}

export default RoomlistLayoutMobile
