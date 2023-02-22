import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import OverviewContent from "@components/organisms/OverviewContent"
import GameContent from "@feature/game/components/templates/lobby/GameContent"
import GameTabs from "@feature/game/components/templates/lobby/GameTabs"
import GameReviews from "@feature/game/components/molecules/GameReviews"
import GamePageDefault from "@components/templates/GamePageDefault"
import RightSidebarContentEffect from "@components/templates/contents/RightSidebarContentEffect"
import RightSidebarContent from "@components/templates/contents/RightSidebarContent"
import { TabProvider } from "@feature/tab/contexts/TabProvider"

export default function GamePartnerDetails() {
  const router = useRouter()
  const { id } = router.query
  const gameId = id ? id.toString() : ""

  return (
    <GamePageDefault
      component={
        <RightSidebarContentEffect
          className="mb-24"
          content={
            <GameContent
              gameId={gameId}
              gameType="partner-game"
            />
          }
          aside={
            <OverviewContent
              gameId={gameId}
              gameType="partner-game"
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
                gameType="partner-game"
              />
            </TabProvider>
          }
          aside={
            <GameReviews
              gameType="partner-game"
              gameId={gameId}
            />
          }
        />
      }
    />
  )
}

GamePartnerDetails.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
