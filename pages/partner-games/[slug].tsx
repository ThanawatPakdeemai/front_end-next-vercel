import { useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import useGameStore from "@stores/game"
import GamePageDefault from "@components/template/GamePageDefault"
import SkeletonGamePartner from "@components/atoms/skeleton/SkeletonGamePartner"
import useGlobal from "@hooks/useGlobal"
import OverviewGamePartners from "@components/organisms/OverviewGamePartners"
import PartnerGameLobby from "@feature/game/components/templates/lobby/PartnerGameLobby"
import RightSidebarContent from "@components/template/RightSidebarContent"
import Review from "@feature/review/components/templates/Review"
import PartnerGameDetails from "@feature/game/components/organisms/PartnerGameDetails"

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
          content={<PartnerGameDetails />}
          aside={<Review />}
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
