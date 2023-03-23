import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const GamePageLayout = dynamic(
  () => import("@components/templates/PartnerPageLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const PartnerGamesPage = dynamic(
  () => import("@feature/page/games/partnerGamesPage"),
  {
    suspense: true,
    ssr: false
  }
)

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
