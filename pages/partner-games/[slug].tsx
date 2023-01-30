import { ReactElement, useEffect, useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useGameStore from "@stores/game"
import GamePageDefault from "@components/template/GamePageDefault"
import SkeletonGamePartner from "@components/atoms/skeleton/SkeletonGamePartner"
import Overview from "@components/organisms/Overview"
import OverviewIcon from "@components/icons/OverviewIcon"
import { IGameTag } from "@feature/slider/interfaces/IGameTags"
import TagMultiple from "@components/molecules/TagMultiple"
import TagSingular from "@components/molecules/TagSingular"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGlobal from "@hooks/useGlobal"

export default function GamePartnerDetails() {
  const { gamePartnerData } = useGlobal()
  const { onSetGamePartnersData } = useGameStore()

  useEffect(() => {
    if (gamePartnerData) {
      onSetGamePartnersData(gamePartnerData)
    }
  }, [gamePartnerData, onSetGamePartnersData])

  return <>{gamePartnerData ? <>Test</> : <SkeletonGamePartner />}</>
}

const OverviewContent = () => {
  const { dataGamePartner } = useGameStore()
  const [gameData, setGameData] = useState<IPartnerGameData>()
  const gameTags: IGameTag[] = []

  useEffect(() => {
    if (dataGamePartner) {
      setGameData(dataGamePartner)
    }
  }, [dataGamePartner])

  gameData &&
    gameData.genres.length > 0 &&
    gameData.genres.map((category) =>
      gameTags.push({
        name: category.name,
        link: `category/${category.slug}`
      })
    )

  return (
    <div className="flex flex-col justify-start">
      <Overview
        icon={<OverviewIcon />}
        title="Game overview"
      >
        <div className="px-6 text-start text-sm text-neutral-500">
          <TagMultiple
            title="genre"
            tags={gameTags}
          />
          {gameData &&
            gameData.short_detail &&
            gameData.short_detail.developer && (
              <TagSingular
                title="developer"
                label={gameData.short_detail.developer}
                link={gameData.short_detail.developer}
              />
            )}
          {gameData &&
            gameData.short_detail &&
            gameData.short_detail.publisher && (
              <TagSingular
                title="publisher"
                label={gameData.short_detail.publisher}
                link={gameData.short_detail.publisher}
              />
            )}
          <p
            dangerouslySetInnerHTML={{
              __html:
                gameData && "description" in gameData
                  ? gameData.description
                  : ""
            }}
          />
        </div>
      </Overview>
    </div>
  )
}

GamePartnerDetails.getLayout = function getLayout(page: ReactElement) {
  return <GamePageDefault component={OverviewContent()}>{page}</GamePageDefault>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
