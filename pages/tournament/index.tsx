import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const TournamentLayout = dynamic(
  () => import("@components/templates/TournamentLayout"),
  {
    suspense: true
  }
)

const CardTournamentSlider = dynamic(
  () => import("@feature/slider/components/molecules/CardTournamentSlider"),
  {
    suspense: true
  }
)

export default function Tournament() {
  return (
    <>
      <CardTournamentSlider />
    </>
  )
}

Tournament.getLayout = function getLayout(page: ReactElement) {
  return <TournamentLayout>{page}</TournamentLayout>
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
