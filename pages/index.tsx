import { Layout } from "@components/templates"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import SignInLayout from "@src/mobile/components/templates/SignInLayout"
import { isMobile } from "react-device-detect"
import useProfileStore from "@stores/profileStore"
import CONFIGS from "@configs/index"

const HomePage = dynamic(() => import("@feature/page/homePage"))
const Home = () => {
  const profile = useProfileStore((state) => state.profile.data)

  return !profile && isMobile && CONFIGS.DISPLAY_MOBILE_MODE === "true" ? (
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
