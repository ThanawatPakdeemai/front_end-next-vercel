import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GamePageDefault from "@components/template/GamePageDefault"
import RightSidebarContent from "@components/template/RightSidebarContent"
import PartnerGameReviews from "@feature/game/partnerGames/components/molecules/PartnerGameReviews"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import RightSidebarContentEffect from "@components/template/RightSidebarContentEffect"
import { useRouter } from "next/router"
import OverviewContent from "@components/organisms/OverviewContent"
import GameContent from "@feature/game/components/templates/lobby/GameContent"
import GameTabs from "@feature/game/components/templates/lobby/GameTabs"

export default function GamePartnerDetails() {
  const router = useRouter()
  const { id } = router.query

  return (
    <GamePageDefault
      component={
        <RightSidebarContentEffect
          className="mb-24"
          content={
            <GameContent
              gameId={id ? id.toString() : ""}
              gameType="partner-game"
            />
          }
          aside={
            <OverviewContent
              gameId={id ? id.toString() : ""}
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
                gameId={id ? id.toString() : ""}
                gameType="partner-game"
              />
            </TabProvider>
          }
          aside={<PartnerGameReviews />}
        />
      }
    />
  )
}

// const getTemplateOverView = () => {
//   const router = useRouter()
//   const { id } = router.query
//   return (
//     <OverviewContent
//       gameId={id ? id.toString() : ""}
//       gameType="partner-game"
//     />
//   )
// }

// const getTemplateGameContent = () => {
//   const router = useRouter()
//   const { id } = router.query
//   return (
//     <GameContent
//       gameId={id ? id.toString() : ""}
//       gameType="partner-game"
//     />
//   )
// }

// const getTemplateTabs = () => {
//   const router = useRouter()
//   const { id } = router.query
//   return (
//     <TabProvider>
//       <GameTabs
//         gameId={id ? id.toString() : ""}
//         gameType="arcade-emporium"
//         gamePath={""}
//       />
//     </TabProvider>
//   )
// }

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
