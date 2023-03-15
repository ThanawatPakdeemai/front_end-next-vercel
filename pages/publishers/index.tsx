import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const GamePageLayout = dynamic(
  () => import("@components/templates/PartnerPageLayout"),
  {
    suspense: true
  }
)
const PublisherPage = dynamic(
  () => import("@feature/page/games/PublisherPage"),
  {
    suspense: true
  }
)

export default function GameDevelopers() {
  return (
    <>
      <article className="h-full w-full">
        <PublisherPage />
      </article>
    </>
  )
}

GameDevelopers.getLayout = function getLayout(page: ReactElement) {
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
