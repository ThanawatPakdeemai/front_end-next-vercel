import GamePageWithBreadcrumb from "@components/templates/GamePageWithBreadcrumb"
import CatogoriesListPage from "@feature/page/CatogoriesListPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactElement } from "react"

export default function Categories() {
  return (
    <>
      <article className="h-full w-full">
        <CatogoriesListPage />
      </article>
    </>
  )
}

Categories.getLayout = function getLayout(page: ReactElement) {
  return <GamePageWithBreadcrumb>{page}</GamePageWithBreadcrumb>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
