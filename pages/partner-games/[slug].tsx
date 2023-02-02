import { useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useGameStore from "@stores/game"
import GamePageDefault from "@components/template/GamePageDefault"
import SkeletonGamePartner from "@components/atoms/skeleton/SkeletonGamePartner"
import useGlobal from "@hooks/useGlobal"
import OverviewGamePartners from "@components/organisms/OverviewGamePartners"
import PartnerGameLobby from "@feature/game/components/templates/lobby/PartnerGameLobby"
import RightSidebarContent from "@components/template/RightSidebarContent"
import PartnerGameContent from "@feature/game/partnerGames/components/organisms/PartnerGameContent"
import PartnerGameReviews from "@feature/game/partnerGames/components/molecules/PartnerGameReviews"

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
        <RightSidebarContent
          content={<PartnerGameLobby />}
          aside={<OverviewGamePartners />}
        />
      }
      component2={
        <RightSidebarContent
          content={<PartnerGameContent />}
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
