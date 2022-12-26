import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import PlayToEarnGamesPage from "@feature/page/playToEarnGamesPage"
import GamePageLayout from "@components/template/GamePageLayout"

export default function PlayToEarnGames() {
  return (
    <>
      <article className="h-full w-full">
        <PlayToEarnGamesPage />
      </article>
    </>
  )
}

PlayToEarnGames.getLayout = function getLayout(page: ReactElement) {
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