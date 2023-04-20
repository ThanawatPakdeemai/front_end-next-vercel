import { Layout } from "@components/templates"
import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import MetaDataTag from "@components/atoms/MetaDataTag"
import { metaData } from "@src/meta/meta"

const HomePage = dynamic(() => import("@feature/page/homePage"))

export default function Home() {
  return (
    <article className="h-full w-full">
      <MetaDataTag
        meta_description={metaData.meta_description}
        meta_keyword={metaData.meta_keyword}
        meta_title={metaData.meta_title}
        meta_url={metaData.url}
        og_image={metaData.og_image}
      />
      <HomePage />
    </article>
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
