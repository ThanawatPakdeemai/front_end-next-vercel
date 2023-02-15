import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GamePageLayout from "@components/templates/GamePageLayout"
import PartnerGamesPage from "@feature/page/games/partnerGamesPage"

export default function PartnerGames() {
  return (
    <>
      <article className="h-full w-full">
        <PartnerGamesPage />
      </article>
    </>
  )
}

PartnerGames.getLayout = function getLayout(page: ReactElement) {
  return <GamePageLayout>{page}</GamePageLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
