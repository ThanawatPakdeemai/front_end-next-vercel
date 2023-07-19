import { Layout } from "@components/templates"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { isMobile } from "@hooks/useGlobal"

const HomePage = dynamic(() => import("@feature/page/homePage"), {
  suspense: true,
  ssr: true
})
const HomeMobile = dynamic(() => import("@mobile/features/pages/HomeMobile"), {
  suspense: true,
  ssr: true
})

const Home = () => {
  // eslint-disable-next-line no-console
  console.log("test-env", process.env.NEXT_PUBLIC_MODE_TEST)
  // eslint-disable-next-line no-console
  console.log("test-GOOGLE_CLIENT_ID", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
  // eslint-disable-next-line no-console
  console.log(
    "test-GOOGLE_CLIENT_SECRET",
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  )
  // eslint-disable-next-line no-console
  console.log("test-NEXTAUTH_SECRET", process.env.NEXTAUTH_SECRET)

  const renderContent = () => {
    if (isMobile) {
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
