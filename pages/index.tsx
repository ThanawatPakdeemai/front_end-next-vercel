import { Layout } from "@components/template"
import { ReactElement } from "react"
import HomePage from "@feature/page/homePage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Home() {
  return (
    <>
      <article className="h-full w-full">
        <HomePage />
      </article>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
