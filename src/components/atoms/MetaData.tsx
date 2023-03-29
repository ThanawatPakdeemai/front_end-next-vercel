import CONFIGS from "@configs/index"
import { getSeoAll } from "@feature/metaData/containers/services/seoMetaData.service"
import { ISeoData, ISeoResponse } from "@feature/metaData/interfaces/ISeoData"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import _ from "lodash"

const Meta = () => {
  const [meta, setMeta] = useState<ISeoData[]>([])
  const router = useRouter()
  const pathActive = router.asPath

  useEffect(() => {
    let load = false

    if (!load) {
      getSeoAll().then((_result) => {
        const { data } = _result as ISeoResponse
        setMeta(data)
      })
    }

    return () => {
      load = true
    }
  }, [])

  const contentMeta = (_meta: ISeoData) => (
    <>
      <title>{_meta?.meta_title}</title>
      <meta
        name="keywords"
        content={_meta?.meta_keyword}
      />
      <meta
        name="description"
        content={_meta?.meta_description}
      />
      <meta
        property="og:url"
        content={CONFIGS.BASE_URL.FRONTEND + _meta.url}
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:title"
        content={_meta?.meta_title}
      />
      <meta
        property="og:site_name"
        content={CONFIGS.BASE_URL.FRONTEND + _meta.url}
      />
      <meta
        property="og:description"
        content={_meta?.meta_description}
      />
      <meta
        property="og:image"
        content={_meta?.og_image}
      />
      <meta
        property="og:width"
        content="2400"
      />
      <meta
        property="og:width"
        content="2400"
      />
      <meta
        property="og:height"
        content="1260"
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:label1"
        content="Est. reading time"
      />
      <meta
        name="twitter:data1"
        content="10 minutes"
      />
      <meta
        name="twitter:image"
        content={_meta?.og_image}
      />
      <meta
        name="site"
        content="@NakamotoGames"
      />
      <meta
        name="twitter:title"
        content={_meta?.meta_title}
      />
      <meta
        name="twitter:description"
        content={_meta?.meta_description}
      />
    </>
  )

  const metaHome = useMemo(() => _.find(meta, { url: "/" }), [meta])
  const metaPage = useMemo(
    () =>
      meta.find(
        (_data) => _data.url.replace("/", "") === pathActive.replace("/", "")
      ),
    [meta, pathActive]
  )

  const metaGame = useMemo(
    () =>
      meta.find(
        (_data) => _data.url.replace("/", "") === router.query.GameHome
      ),
    [meta, router.query.GameHome]
  )

  return (
    <>
      <Head>
        {metaPage && contentMeta(metaPage as ISeoData)}
        {metaGame && contentMeta(metaGame as ISeoData)}
        {!metaPage && !metaGame && metaHome && contentMeta(metaHome)}
      </Head>
      {/* {DATA_META_TAG?.map((item) =>
        item.path === "/" ? (
          <Head key={item.path}>
            <title>{item.metaTag?.pageTitle}</title>
            <meta
              name="description"
              content={item.metaTag?.pageDescription}
            />
            {item.metaTag?.ogURL ? (
              <meta
                property="og:url"
                content={item.metaTag?.ogURL}
              />
            ) : null}
            {item.metaTag?.ogType ? (
              <meta
                property="og:type"
                content={item.metaTag?.ogType}
              />
            ) : null}
            {item.metaTag?.ogSiteName ? (
              <meta
                property="og:site_name"
                content={item.metaTag?.ogSiteName}
              />
            ) : null}
            {item.metaTag?.ogTitle ? (
              <meta
                property="og:title"
                content={item.metaTag?.ogTitle}
              />
            ) : null}
            {item.metaTag?.ogDescription ? (
              <meta
                property="og:description"
                content={item.metaTag?.ogDescription}
              />
            ) : null}
            {item.metaTag?.ogImage ? (
              <meta
                property="og:image"
                content={item.metaTag?.ogImage}
              />
            ) : null}
            {item.metaTag?.twitterCard ? (
              <meta
                name="twitter:card"
                content={item.metaTag?.twitterCard}
              />
            ) : null}
            {item.metaTag?.twitterTitle ? (
              <meta
                name="twitter:title"
                content={item.metaTag?.twitterTitle}
              />
            ) : null}
            {item.metaTag?.twitterDescription ? (
              <meta
                name="twitter:description"
                content={item.metaTag?.twitterDescription}
              />
            ) : null}
            {item.metaTag?.twitterImage ? (
              <meta
                name="twitter:image"
                content={item.metaTag?.twitterImage}
              />
            ) : null}
          </Head>
        ) : null
      )} */}
    </>
  )
}

export default Meta
