import Head from "next/head"
import _ from "lodash"

interface IProp {
  meta_title: string
  meta_keyword: string
  meta_description: string
  meta_url: string
  og_image: string
}
const MetaDataTag = ({
  meta_title,
  meta_keyword,
  meta_description,
  meta_url,
  og_image
}: IProp) => (
  <>
    <Head>
      <title>{meta_title}</title>
      <meta
        name="title"
        content={meta_title}
      />
      <meta
        name="description"
        content={meta_description}
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
        content={meta_url}
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:title"
        content={meta_title}
      />
      <meta
        property="og:site_name"
        content="NakamotoGames"
      />
      <meta
        property="og:description"
        content={meta_description}
      />
      <meta
        property="og:image"
        content={og_image}
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
        content={og_image}
      />
      <meta
        property="site"
        content="@NakamotoGames"
      />
      <meta
        property="twitter:title"
        content={meta_title}
      />
      <meta
        property="twitter:description"
        content={meta_description}
      />

      <meta
        name="keywords"
        content={meta_keyword}
      />
    </Head>
  </>
)

export default MetaDataTag
