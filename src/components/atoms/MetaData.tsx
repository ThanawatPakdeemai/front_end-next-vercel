/* eslint-disable no-nested-ternary */
import { ISeoData, ISeoResponse } from "@feature/metaData/interfaces/ISeoData"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import _ from "lodash"
// import { IBlogDetail } from "@feature/blog/interfaces/IBlogService"
// import useMetaDataByPath from "@feature/metaData/containers/hooks/useMetaDataByPath"
import CONFIGS from "@configs/index"
import { metaData } from "@pages/_app"
import { getSeoByPath } from "@feature/metaData/containers/services/seoMetaData.service"
import MetaDataTag from "./MetaDataTag"
// import { NextSeo } from "next-seo"
// import MetaDataTag from "./MetaDataTag"

// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
interface IProps {
  path?: string
}
const Meta = () => {
  // const [blogDetails] = useState<IBlogDetail>()
  // eslint-disable-next-line no-unused-vars
  const [meta, setMeta] = useState<ISeoData>()
  // const { data } = useMetaDataByPath({ _path: path ?? "/" })

  const router = useRouter()
  // const pathActive = router.asPath
  const { id } = router.query

  useEffect(() => {
    let load = false
    if (!load) {
      getSeoByPath("/").then((res) => {
        if (res) setMeta((res as ISeoResponse)?.data?.[0])
      })
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
  }, [id, router.route])

  return (
    <>
      {meta ? (
        <MetaDataTag
          meta_description={meta.meta_description}
          meta_keyword={meta.meta_keyword}
          meta_title={meta.meta_title}
          meta_url={CONFIGS.BASE_URL.FRONTEND + router.asPath}
          og_image={meta.og_image}
        />
      ) : (
        <MetaDataTag
          meta_description={metaData.meta_description}
          meta_keyword={metaData.meta_keyword}
          meta_title={metaData.meta_title}
          meta_url={CONFIGS.BASE_URL.FRONTEND + router.asPath}
          og_image={metaData.image}
        />
      )}
    </>
  )
}

export default Meta
