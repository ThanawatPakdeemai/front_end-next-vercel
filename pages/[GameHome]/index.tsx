import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GameRoomLayout from "@components/template/GameRoomLayout"
import { Button } from "@mui/material"
import { useRouter } from "next/router"
import useGameStore from "@stores/game"
import GameSlide from "@feature/slider/components/templates/GameSlide"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import { IGame } from "@feature/game/interfaces/IGameService"
import { getAllGames } from "@feature/game/containers/services/game.service"

export default function GameLobby() {
  const router = useRouter()
  const Path = router.asPath.split("/")
  const [gameData, setGameData] = useState<IGame>()
  const { onSetGameData } = useGameStore()

  const fetchGameAll = async () => {
    // eslint-disable-next-line no-async-promise-executor
    const { data }: any = await getAllGames()
    const gamefilter = data.filter((data) => data.game_url.includes(Path[1]))
    onSetGameData(gamefilter[0])
    setGameData(gamefilter[0])
  }

  useEffect(() => {
    fetchGameAll()
  }, [])

  return <>{gameData ? <GameSlide /> : <SkeletonBanner />}</>
}

GameLobby.getLayout = function getLayout(page: ReactElement) {
  return <GameRoomLayout>{page}</GameRoomLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
