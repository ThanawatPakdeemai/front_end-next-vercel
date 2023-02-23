import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const GamePageLayout = dynamic(
  () => import("@components/templates/GamePageLayout")
)
const ArcadeEmporiumGamesPage = dynamic(
  () => import("@feature/page/games/ArcadeEmporiumGamesPage")
)

export default function NFTGames() {
  return (
    <>
      <article className="h-full w-full">
        <ArcadeEmporiumGamesPage />
      </article>
    </>
  )
}

NFTGames.getLayout = function getLayout(page: ReactElement) {
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
