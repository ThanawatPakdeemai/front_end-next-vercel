import { useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useGameStore from "@stores/game"
import GamePageDefault from "@components/templates/GamePageDefault"
import SkeletonGamePartner from "@components/atoms/skeleton/SkeletonGamePartner"
import useGlobal from "@hooks/useGlobal"
import OverviewGamePartners from "@components/organisms/OverviewGamePartners"
import PartnerGameLobby from "@feature/game/components/templates/lobby/PartnerGameLobby"
import PartnerGameContent from "@feature/game/partnerGames/components/organisms/PartnerGameContent"
import PartnerGameReviews from "@feature/game/partnerGames/components/molecules/PartnerGameReviews"
import { TabProvider } from "@feature/tab/contexts/TabProvider"
import RightSidebarContentEffect from "@components/templates/contents/RightSidebarContentEffect"
import RightSidebarContent from "@components/templates/contents/RightSidebarContent"

export default function GamePartnerDetails() {
  const { gamePartnerData } = useGlobal()
  const { onSetGamePartnersData } = useGameStore()

  useEffect(() => {
    if (gamePartnerData) {
      onSetGamePartnersData(gamePartnerData)
    }
  }, [gamePartnerData, onSetGamePartnersData])

  return <>{!gamePartnerData && <SkeletonGamePartner />}</>
}

GamePartnerDetails.getLayout = function getLayout() {
  // page: ReactElement
  return (
    <GamePageDefault
      component={
        <RightSidebarContentEffect
          className="mb-24"
          content={<PartnerGameLobby />}
          aside={<OverviewGamePartners />}
        />
      }
      component2={
        <RightSidebarContent
          content={
            <TabProvider>
              <PartnerGameContent />
            </TabProvider>
          }
          aside={<PartnerGameReviews />}
        />
      }
    />
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
