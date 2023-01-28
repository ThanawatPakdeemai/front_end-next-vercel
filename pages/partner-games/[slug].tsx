import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useGameStore from "@stores/game"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGamesById from "@feature/game/containers/hooks/useGamesById"
import GamePageDefault from "@components/template/GamePageDefault"

export default function GamePartnerDetails() {
  const [gameData, setGameData] = useState<IGame>()
  const { data } = useGameStore()
  const { dataGame, isLoading } = useGamesById({ _gameId: data ? data.id : "" })

  useEffect(() => {
    if (!isLoading && dataGame) setGameData(dataGame.data[0])
  }, [dataGame, isLoading])

  return <>{gameData ? <>Partner Details</> : <SkeletonBanner />}</>
}

GamePartnerDetails.getLayout = function getLayout(page: ReactElement) {
  return <GamePageDefault component={undefined}>{page}</GamePageDefault>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
