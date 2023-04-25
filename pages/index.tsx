import { Layout } from "@components/templates"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { isMobile } from "react-device-detect"
import SignInLayout from "@src/mobile/templates/SignInLayout"

const HomePage = dynamic(() => import("@feature/page/homePage"))

export default function Home() {
  return (
    <article className="h-full w-full">
      <HomePage />
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  if (isMobile) {
    return <SignInLayout />
  }
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
