import { ReactElement } from "react"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { TabProvider } from "@feature/tab/contexts/TabProvider"

const GameTabs = dynamic(
  () => import("@feature/game/components/templates/lobby/GameTabs"),
  {
    suspense: true,
    ssr: false
  }
)
const GameReviews = dynamic(
  () => import("@feature/game/components/molecules/GameReviews"),
  {
    suspense: true,
    ssr: false
  }
)
const GameContent = dynamic(
  () => import("@feature/game/components/templates/lobby/GameContent"),
  {
    suspense: true,
    ssr: false
  }
)
const OverviewContent = dynamic(
  () => import("@components/organisms/OverviewContent"),
  {
    suspense: true,
    ssr: false
  }
)
const GamePageDefault = dynamic(
  () => import("@components/templates/GamePageDefault"),
  {
    suspense: true,
    ssr: false
  }
)
const RightSidebarContentEffect = dynamic(
  () => import("@components/templates/contents/RightSidebarContentEffect"),
  {
    suspense: true,
    ssr: false
  }
)
const RightSidebarContent = dynamic(
  () => import("@components/templates/contents/RightSidebarContent"),
  {
    suspense: true,
    ssr: false
  }
)

export default function ArcadeEmporiumGameDetails() {
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
