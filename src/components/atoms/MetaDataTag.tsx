import Head from "next/head"
import _ from "lodash"
import CONFIGS from "@configs/index"
import { metaData } from "@src/meta/meta"
import { ReactElement } from "react"

interface IProp {
  meta_title?: string
  meta_keyword?: string
  meta_description?: string
  meta_url?: string
  og_image?: string
}
const MetaDataTag = (props) => {
  const {
    meta_title,
    meta_keyword,
    meta_description,
    meta_url,
    og_image
  }: IProp = props

  return (
    <Head>
      <title>{meta_title ?? metaData.meta_title}</title>
      <meta
        name="description"
        content={meta_description ?? metaData.meta_description}
      />
      <link
        rel="icon"
        href="/favicon.png"
      />
      {/* facebook */}
      <meta
        property="fb:app_id"
        content="364510622370887"
      />
      <meta
        property="og:locale"
        content="en_US"
      />
      <meta
        property="og:url"
        content={CONFIGS.BASE_URL.FRONTEND + meta_url}
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:title"
        content={meta_title ?? metaData.meta_title}
      />
      <meta
        property="og:site_name"
        content="NAKAMOTO Games"
      />
      <meta
        property="og:description"
        content={meta_description ?? metaData.meta_description}
      />
      <meta
        property="og:image"
        content={og_image ?? metaData.og_image}
      />
      <meta
        property="og:width"
        content="2400"
      />
      <meta
        property="og:height"
        content="1260"
      />

      {/* twitter */}
      <meta
        property="twitter:card"
        content="summary_large_image"
      />
      <meta
        property="twitter:label1"
        content="Est. reading time"
      />
      <meta
        property="twitter:data1"
        content="10 minutes"
      />
      <meta
        property="twitter:image"
        content={og_image ?? metaData.og_image}
      />
      <meta
        property="site"
        content="@NakamotoGames"
      />
      <meta
        property="twitter:title"
        content={meta_title ?? metaData.meta_title}
      />
      <meta
        property="twitter:description"
        content={meta_description ?? metaData.meta_description}
      />

      <meta
        name="keywords"
        content={meta_keyword ?? metaData.meta_keyword}
      />
    </Head>
  )
}
MetaDataTag.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default MetaDataTag
