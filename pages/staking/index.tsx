import ServicesPageLayout from "@components/template/ServicesPageLayout"
import useGamesById from "@feature/game/containers/hooks/useGamesById"
import { IGame } from "@feature/game/interfaces/IGameService"
import FixedAPR from "@feature/staking/components/templates/FixedApr"
import useGameStore from "@stores/game"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ReactElement, useEffect, useState } from "react"

export default function StakingPage() {
  // eslint-disable-next-line no-unused-vars
  const [gameData, setGameData] = useState<IGame>()
  const { data } = useGameStore()
  const { dataGame, isLoading } = useGamesById({ _gameId: data ? data.id : "" })

  useEffect(() => {
    if (!isLoading && dataGame) setGameData(dataGame.data[0])
  }, [dataGame, isLoading])

  // return <>{gameData ? <GameSlide /> : <SkeletonBanner />}</>
  return <FixedAPR />
}

StakingPage.getLayout = function getLayout(page: ReactElement) {
  return <ServicesPageLayout>{page}</ServicesPageLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
