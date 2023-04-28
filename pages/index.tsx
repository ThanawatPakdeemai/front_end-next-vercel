import { Layout } from "@components/templates"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import SignInLayout from "@src/mobile/components/templates/SignInLayout"
import { isMobile } from "react-device-detect"
import useGlobal from "@hooks/useGlobal"

const HomePage = dynamic(() => import("@feature/page/homePage"))
const Home = () => {
  const { stateProfile } = useGlobal()

  return !stateProfile && isMobile ? (
    <SignInLayout />
  ) : (
    <Layout>
      <article className="h-full w-full">
        <HomePage />
      </article>
    </Layout>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return page
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
