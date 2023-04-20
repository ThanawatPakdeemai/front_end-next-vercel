import { ReactElement } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import dynamic from "next/dynamic"
import { metaData } from "@src/meta/meta"
import { getSeoByPath } from "@feature/metaData/containers/services/seoMetaData.service"
import { ISeoResponse } from "@feature/metaData/interfaces/ISeoData"

const GamePageLayout = dynamic(
  () => import("@components/templates/GamePageLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const PlayToEarnGamesPage = dynamic(
  () => import("@feature/page/games/playToEarnGamesPage"),
  {
    suspense: true,
    ssr: false
  }
)

const MetaDataTag = dynamic(() => import("@components/atoms/MetaDataTag"), {
  suspense: true,
  ssr: false
})
export default function PlayToEarnGames(props) {
  return (
    <article className="h-full w-full">
      <MetaDataTag
        meta_description={props?.meta?.meta_description}
        meta_keyword={props?.meta?.meta_keyword}
        meta_title={props?.meta?.meta_title}
        meta_url={props?.meta?.url}
        og_image={props?.meta?.og_image}
      />
      <PlayToEarnGamesPage />
    </article>
  )
}

PlayToEarnGames.getLayout = function getLayout(page: ReactElement) {
  return <GamePageLayout>{page}</GamePageLayout>
}

// eslint-disable-next-line no-unused-vars
export async function getStaticProps({ locale, params }) {
  const _seo = await getSeoByPath(`/play-to-earn-games` as string)

  return {
    props: {
      meta:
        _seo && (_seo as ISeoResponse)?.data?.length > 0
          ? (_seo as ISeoResponse)?.data?.[0]
          : metaData,
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  }
}
