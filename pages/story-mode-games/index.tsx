import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GamePageLayout from "@components/template/GamePageLayout"
// import StoryModeGamesPage from "@feature/page/games/StoryModeGamesPage"

export default function StoryModeGames() {
  return (
    <>
      <article className="h-full w-full">
        {/* <StoryModeGamesPage /> */}
      </article>
    </>
  )
}

StoryModeGames.getLayout = function getLayout(page: ReactElement) {
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
