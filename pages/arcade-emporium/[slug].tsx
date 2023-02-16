import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GamePageDefault from "@components/template/GamePageDefault"
import RightSidebarContent from "@components/template/RightSidebarContent"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import { useRouter } from "next/router"
import GameTabs from "@feature/game/components/templates/lobby/GameTabs"
import GameReviews from "@feature/game/components/molecules/GameReviews"
import GameContent from "@feature/game/components/templates/lobby/GameContent"
import OverviewContent from "@components/organisms/OverviewContent"
import { ReactElement } from "react"
import RightSidebarContentEffect from "@components/template/RightSidebarContentEffect"

export default function ArcadeEmporiumGameDetails() {
  const router = useRouter()
  const { id } = router.query
  const gameId = id ? id.toString() : ""
  // const { gameData } = useGlobal()
  // return <>{!gameData && <SkeletonGamePartner />}</>
  return (
    <GamePageDefault
      component={
        <RightSidebarContentEffect
          className="mb-24"
          content={
            <GameContent
              gameId={gameId}
              gameType="arcade-emporium"
            />
          }
          aside={
            <OverviewContent
              gameId={gameId}
              gameType="arcade-emporium"
            />
          }
        />
      }
      component2={
        <RightSidebarContent
          content={
            <TabProvider>
              <GameTabs
                gameId={gameId}
                gameType="arcade-emporium"
              />
            </TabProvider>
          }
          aside={
            <GameReviews
              gameType="arcade-emporium"
              gameId={gameId}
            />
          }
        />
      }
    />
  )
}

ArcadeEmporiumGameDetails.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
