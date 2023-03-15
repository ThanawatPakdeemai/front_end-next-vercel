import React, { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const Layout = dynamic(() => import("@components/templates/Layout"), {
  suspense: true
})

const CardTournamentSlider = dynamic(
  () => import("@feature/slider/components/molecules/CardTournamentSlider"),
  {
    suspense: true
  }
)

export default function CardTournament() {
  return (
    <>
      <article className="h-full w-full">
        <Layout>
          <CardTournamentSlider />
        </Layout>
      </article>
    </>
  )
}

CardTournament.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
