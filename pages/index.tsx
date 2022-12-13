/* eslint-disable jsx-a11y/alt-text */
import { Layout } from "@components/template"
import { ReactElement } from "react"
import HomePage from "@feature/page/homePage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Toast } from "@components/atoms/toast"

export default function Home() {
  return (
    <article className="h-full w-full">
      <Toast
        status="success"
        text="eeeeeeeee"
      />
      <Toast
        status="warning"
        text="eeeeeeeee"
      />
      <Toast
        status="error"
        text="eeeeeeeee"
      />
      <Toast
        status="info"
        text="eeeeeeeee"
      />
      <Toast
        status="inherit"
        text="eeeeeeeee"
      />
      <HomePage />
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
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
