/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-curly-brace-presence */
import CONFIGS from "@configs/index"
import { getBlogDetail } from "@feature/blog/containers/services/blog.service"
import { IBlogDetailResponse } from "@feature/blog/interfaces/IBlogService"
import { getSeoByPath } from "@feature/metaData/containers/services/seoMetaData.service"
import { ISeoResponse } from "@feature/metaData/interfaces/ISeoData"
import { metaData } from "@src/meta/meta"
import Document, { Html, Head, Main, NextScript } from "next/document"
import dynamic from "next/dynamic"

const GoogleTag = dynamic(() => import("@components/atoms/tags/GoogleTag"), {
  suspense: true,
  ssr: false
})
const LiveSessionTag = dynamic(
  () => import("@components/atoms/tags/LiveSessionTag"),
  {
    suspense: true,
    ssr: false
  }
)
const TiktokTag = dynamic(() => import("@components/atoms/tags/TiktokTag"), {
  suspense: true,
  ssr: false
})
const MetaPixel = dynamic(() => import("@components/atoms/tags/MetaPixel"), {
  suspense: true,
  ssr: false
})

interface IMetaData {
  meta_title: string
  meta_description: string
  og_image: string
  meta_keyword?: string
}
interface IMeta {
  meta: IMetaData
  url: string
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage
    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    let _meta: IMetaData | null = null
    if (ctx.pathname.includes("/[typeGame]/[GameHome]")) {
      const link = `/${ctx.query.GameHome}`
      const _seo = await getSeoByPath(`${link}` as string)
      const meta =
        _seo && (_seo as ISeoResponse)?.data?.length > 0
          ? (_seo as ISeoResponse)?.data?.[0]
          : metaData
      _meta = {
        meta_title: meta?.meta_title,
        meta_description: meta?.meta_description,
        og_image: meta?.og_image,
        meta_keyword: meta?.meta_keyword
      }
    } else if (ctx.pathname.includes("/blog/[id]")) {
      const blog = await getBlogDetail(`${ctx?.query?.id}`)
      if ((blog as IBlogDetailResponse)?.data) {
        const _blog = (blog as IBlogDetailResponse)?.data
        _meta = {
          meta_title: _blog?.title || "",
          meta_description: _blog?.description || "",
          og_image: _blog?.image_list || "",
          meta_keyword: metaData.meta_keyword
        }
      }
    } else {
      const link = ctx.asPath
      const _seo = await getSeoByPath(`${link}` as string)
      const meta =
        _seo && (_seo as ISeoResponse)?.data?.length > 0
          ? (_seo as ISeoResponse)?.data?.[0]
          : metaData
      _meta = {
        meta_title: meta?.meta_title,
        meta_description: meta?.meta_description,
        og_image: meta?.og_image,
        meta_keyword: meta?.meta_keyword
      }
    }
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      meta: _meta,
      url: ctx.asPath
    }
  }

  render() {
    const data = this.props
    const meta = (data as unknown as IMeta)?.meta
    const url = (data as unknown as IMeta)?.url
    const { meta_title, meta_description, og_image, meta_keyword } = meta

    return (
      <Html>
        <title>{meta_title}</title>

        <Head>
          <meta
            name="description"
            content={meta_description}
          />
          <link
            rel="icon"
            href="/favicon.png"
          />
          <link
            rel="shortcut icon"
            href="/favicon.png"
          />
          <link
            rel="icon"
            type="image/x-icon"
            href="/favicon.png"
          />
          <link
            rel="manifest"
            href="/manifest.json"
          />
          {/* facebook */}
          <meta
            property="fb:app_id"
            content={`${CONFIGS.FACEBOOK_APP_ID}`}
          />
          <meta
            property="og:locale"
            content="en_US"
          />
          <meta
            property="og:url"
            content={CONFIGS.BASE_URL.FRONTEND + url}
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
            content="NAKAMOTO Games"
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
            content="1200"
          />
          <meta
            property="og:height"
            content="630"
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
          {/* Tags for tracking */}
          <GoogleTag />
          <LiveSessionTag />
          <TiktokTag />
          <MetaPixel />
        </Head>

        <body>
          {/* Google Tag Manager noscript code */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=GTM-PGN7G2V`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
