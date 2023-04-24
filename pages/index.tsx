import { Layout } from "@components/templates"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"

const HomePage = dynamic(() => import("@feature/page/homePage"))
const Home = () => (
  <article className="h-full w-full">
    <HomePage />
  </article>
)

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getStaticProps({ locale }) {
  // const _seo = await getSeoByPath(`/` as string)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // meta:
      //   _seo && (_seo as ISeoResponse)?.data?.length > 0
      //     ? (_seo as ISeoResponse)?.data?.[0]
      //     : metaData,
    }
  }
}

export default Home
