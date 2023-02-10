import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import NakaPassPage from "@feature/page/games/NakaPassPage"
import NakaPassLayout from "@components/template/NakaPassLayout"

export default function NakaPass() {
  return (
    <>
      <article className="h-full w-full">
        <NakaPassPage />
      </article>
    </>
  )
}

NakaPass.getLayout = function getLayout(page: ReactElement) {
  return <NakaPassLayout>{page}</NakaPassLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
