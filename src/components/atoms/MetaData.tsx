/* eslint-disable no-nested-ternary */
import CONFIGS from "@configs/index"
import { ISeoData } from "@feature/metaData/interfaces/ISeoData"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import _ from "lodash"
// import { IBlogDetail } from "@feature/blog/interfaces/IBlogService"
import useMetaDataByPath from "@feature/metaData/containers/hooks/useMetaDataByPath"
// eslint-disable-next-line import/no-extraneous-dependencies
import { NextSeo } from "next-seo"
// import MetaDataTag from "./MetaDataTag"

const metaData = {
  meta_description:
    "Get started in minutes with our free-to-play games. The best collection of play-to-earn crypto games featuring action, arcade, and more. Powered by $NAKA.",
  meta_keyword:
    "nakamoto games, play2earn, game crypto platform, Blockchain games, Free to play, NFT game, Crypto games, P2E, Gamefi, Browser Games, Cryptocurrency, Play to Earn, Blockchain Games, Gamefi,  Web3 games, Digital platform, 3D games, Polygon, Games platform, Free nft games, Top NFT Games, best NFT games, top cryoto game, top tier games 2022, the best 2022 games, y8, Free online games, unity, unreal engine, games coin crypto, where to play crypto games, play to earn games crypto, play to earn games crypto list,make money,free time,passive income,bullish project, bullish",
  meta_title:
    "Nakamoto Games - Get Started with the Best Play and Earn Crypto Platform",
  image: "https://files.naka.im/seo/homepage.png",
  url: CONFIGS.BASE_URL.FRONTEND
}
interface IProps {
  path: string
}
const Meta = ({ path }: IProps) => {
  // const [blogDetails] = useState<IBlogDetail>()
  // eslint-disable-next-line no-unused-vars
  const [meta, setMeta] = useState<ISeoData>()
  const { data } = useMetaDataByPath({ _path: path })

  const router = useRouter()
  // const pathActive = router.asPath
  const { id } = router.query

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) setMeta(data[0])
      //   if (router?.route === "/blog/[id]" && id) {
      //     getBlogDetail((id as string) ?? "").then((_result) => {
      //       if (_result) setBlogDetails(_result?.data)
      //     })
      //   } else {
      //   }
    }

    return () => {
      load = true
    }
  }, [data, id, router.route])

  // const metaHome = useMemo(() => _.find(meta, { url: "/" }), [meta])
  // const metaPage = useMemo(
  //   () =>
  //     meta.find(
  //       (_data) => _data.url.replace("/", "") === pathActive.replace("/", "")
  //     ),
  //   [meta, pathActive]
  // )

  // const metaGame = useMemo(
  //   () =>
  //     meta.find(
  //       (_data) => _data.url.replace("/", "") === router.query.GameHome
  //     ),
  //   [meta, router.query.GameHome]
  // )

  return (
    <>
      <NextSeo
        title={metaData.meta_title}
        description={metaData.meta_description}
        openGraph={{
          title: metaData.meta_title,
          url: metaData.url + router.asPath,
          description: metaData.meta_description,
          images: [{ url: metaData.image }]
        }}
        twitter={{
          handle: "@NakamotoGames",
          site: "@NakamotoGames",
          cardType: "summary_large_image"
        }}
      />
      {/* {router.route !== "/blog/[id]" ? ( */}
      <>
        {/* {meta ? (
          <MetaDataTag
            meta_description={meta.meta_description}
            meta_keyword={meta.meta_keyword}
            meta_title={meta.meta_title}
            meta_url={CONFIGS.BASE_URL.FRONTEND + router.asPath}
            og_image={meta.og_image}
          />
        ) : ( */}
        {/* <MetaDataTag
          meta_description={metaData.meta_description}
          meta_keyword={metaData.meta_keyword}
          meta_title={metaData.meta_title}
          meta_url={CONFIGS.BASE_URL.FRONTEND + router.asPath}
          og_image={metaData.image}
        /> */}
        {/* )} */}
      </>
      {/* ) : (
        <>
          {blogDetails && (
            <MetaDataTag
              meta_description={blogDetails?.description}
              meta_keyword=""
              meta_title={blogDetails?.title}
              meta_url=""
              og_image={blogDetails?.image_list}
            />
          )}
        </>
      )} */}
    </>
  )
}

export default Meta
