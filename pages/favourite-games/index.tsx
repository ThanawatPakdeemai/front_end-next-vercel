import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GamePageLayout from "@components/template/GamePageLayout"
import FavouriteGamesPage from "@feature/page/games/FavouriteGamesPage"

export default function FavouriteGames() {
  return (
    <>
      <article className="h-full w-full">
        <FavouriteGamesPage />
      </article>
    </>
  )
}

FavouriteGames.getLayout = function getLayout(page: ReactElement) {
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
