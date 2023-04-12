import CONFIGS from "@configs/index"
import { getSeoAll } from "@feature/metaData/containers/services/seoMetaData.service"
import { ISeoData, ISeoResponse } from "@feature/metaData/interfaces/ISeoData"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import _ from "lodash"
import { getBlogDetail } from "@feature/blog/containers/services/blog.service"
import { IBlogDetail } from "@feature/blog/interfaces/IBlogService"
import MetaDataTag from "./MetaDataTag"

const Meta = () => {
  const [blogDetails, setBlogDetails] = useState<IBlogDetail>()
  const [meta, setMeta] = useState<ISeoData[]>([])

  const router = useRouter()
  const pathActive = router.asPath
  const { id } = router.query

  useEffect(() => {
    let load = false

    if (!load) {
      if (router?.route === "/blog/[id]" && id) {
        getBlogDetail((id as string) ?? "").then((_result) => {
          if (_result) setBlogDetails(_result?.data)
        })
      } else {
        getSeoAll().then((_result) => {
          const { data } = _result as ISeoResponse
          setMeta(data)
        })
      }
    }

    return () => {
      load = true
    }
  }, [id, router?.route])

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
      {router.route !== "/blog/[id]" ? (
        <>
          {metaPage && (
            <MetaDataTag
              meta_description={metaPage.meta_description}
              meta_keyword={metaPage.meta_keyword}
              meta_title={metaPage.meta_title}
              meta_url={CONFIGS.BASE_URL.FRONTEND + metaPage.url}
              og_image={metaPage.og_image}
            />
          )}
          {metaGame && (
            <MetaDataTag
              meta_description={metaGame.meta_description}
              meta_keyword={metaGame.meta_keyword}
              meta_title={metaGame.meta_title}
              meta_url={CONFIGS.BASE_URL.FRONTEND + metaGame.url}
              og_image={metaGame.og_image}
            />
          )}
          {!metaPage && !metaGame && metaHome && (
            <MetaDataTag
              meta_description={metaHome.meta_description}
              meta_keyword={metaHome.meta_keyword}
              meta_title={metaHome.meta_title}
              meta_url={CONFIGS.BASE_URL.FRONTEND + metaHome.url}
              og_image={metaHome.og_image}
            />
          )}
        </>
      ) : (
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
      )}
    </>
  )
}

export default Meta
