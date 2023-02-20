import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { TOURNAMENT_BANNER } from "@constants/servicesBanner"
import TournamentLayout from "@components/templates/TournamentLayout"

export default function Tournament() {
  return (
    <>
      <article className="h-full w-full">Comming soon</article>
    </>
  )
}

Tournament.getLayout = function getLayout(page: ReactElement) {
  return <TournamentLayout banner={TOURNAMENT_BANNER}>{page}</TournamentLayout>
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}