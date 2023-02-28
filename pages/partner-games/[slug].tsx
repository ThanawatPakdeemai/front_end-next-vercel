import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { TabProvider } from "@feature/tab/contexts/TabProvider"

const OverviewContent = dynamic(
  () => import("@components/organisms/OverviewContent"),
  {
    suspense: true
  }
)
const GameContent = dynamic(
  () => import("@feature/game/components/templates/lobby/GameContent"),
  {
    suspense: true
  }
)
const GameTabs = dynamic(
  () => import("@feature/game/components/templates/lobby/GameTabs"),
  {
    suspense: true
  }
)
const GameReviews = dynamic(
  () => import("@feature/game/components/molecules/GameReviews"),
  {
    suspense: true
  }
)
const GamePageDefault = dynamic(
  () => import("@components/templates/GamePageDefault"),
  {
    suspense: true
  }
)
const RightSidebarContentEffect = dynamic(
  () => import("@components/templates/contents/RightSidebarContentEffect"),
  {
    suspense: true
  }
)
const RightSidebarContent = dynamic(
  () => import("@components/templates/contents/RightSidebarContent"),
  {
    suspense: true
  }
)

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
