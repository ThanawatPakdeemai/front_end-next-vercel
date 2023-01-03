import { Layout } from "@components/template"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import GameDetailsPage from "@feature/page/gameDetailsPage"

export default function GameDetails() {
  return (
    <>
      <article className="h-full w-full">
        <GameDetailsPage />
      </article>
    </>
  )
}

GameDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
