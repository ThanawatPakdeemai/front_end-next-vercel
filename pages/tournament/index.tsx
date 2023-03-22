import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const TournamentLayout = dynamic(
  () => import("@components/templates/TournamentLayout"),
  {
    suspense: true,
    ssr: false
  }
)

const TournamentPage = dynamic(
  () => import("@feature/page/games/TournamentPage"),
  {
    suspense: true,
    ssr: false
  }
)

export default function Tournament() {
  return (
    <>
      <article className="h-full w-full">
        <TournamentPage />
      </article>
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
