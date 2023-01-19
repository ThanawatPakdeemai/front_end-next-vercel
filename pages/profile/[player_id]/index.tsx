import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import LeftSidebarLayout from "@components/template/LeftSidebarLayout"
import GameStatOverview from "@feature/playerProfile/components/organisms/GameStatOverview"

export default function PlayerProfile() {
  return (
    <>
      <GameStatOverview />
    </>
  )
}

PlayerProfile.getLayout = function getLayout(page: ReactElement) {
  return <LeftSidebarLayout>{page}</LeftSidebarLayout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
