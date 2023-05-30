import { Layout } from "@components/templates"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import SignInLayout from "@src/mobile/components/templates/SignInLayout"
import useProfileStore from "@stores/profileStore"
import { isMobile } from "@hooks/useGlobal"

const HomePage = dynamic(() => import("@feature/page/homePage"))
const HomeMobile = dynamic(() => import("@mobile/features/pages/HomeMobile"))

const Home = () => {
  const profile = useProfileStore((state) => state.profile.data)

  const renderContent = () => {
    if (!profile && isMobile) {
      return <SignInLayout />
    }
    if (isMobile && profile) {
      return <HomeMobile />
    }
    return (
      <Layout>
        <article className="h-full w-full">
          <HomePage />
        </article>
      </Layout>
    )
  }

  return renderContent()
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
