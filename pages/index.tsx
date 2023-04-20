import { Layout } from "@components/templates"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { getSeoByPath } from "@feature/metaData/containers/services/seoMetaData.service"
import { ISeoResponse } from "@feature/metaData/interfaces/ISeoData"
import { metaData } from "@src/meta/meta"

const HomePage = dynamic(() => import("@feature/page/homePage"))
const MetaDataTag = dynamic(() => import("@components/atoms/MetaDataTag"), {
  suspense: true,
  ssr: true
})
export default function Home({ meta }) {
  return (
    <article className="h-full w-full">
      <MetaDataTag
        meta_description={meta.meta_description}
        meta_keyword={meta.meta_keyword}
        meta_title={meta.meta_title}
        meta_url={meta.url}
        og_image={meta.og_image}
      />
      <HomePage />
    </article>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ locale }) {
  const _seo = await getSeoByPath(`/` as string)

  return {
    props: {
      meta:
        _seo && (_seo as ISeoResponse)?.data?.length > 0
          ? (_seo as ISeoResponse)?.data?.[0]
          : metaData,
      ...(await serverSideTranslations(locale, ["common"]))
    }
  }
}
