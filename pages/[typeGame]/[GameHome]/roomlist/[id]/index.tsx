import { ReactElement, useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import useGetGameByPath from "@feature/game/containers/hooks/useFindGameByPath"
import useGameStore from "@stores/game"
import { getSeoByPath } from "@feature/metaData/containers/services/seoMetaData.service"
import { ISeoResponse } from "@feature/metaData/interfaces/ISeoData"
import { metaData } from "@src/meta/meta"
import MetaDataTag from "@components/atoms/MetaDataTag"

const GameRoomLayout = dynamic(
  () => import("@components/templates/GameRoomLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const GameRoomWaitingPage = dynamic(
  () => import("@feature/page/games/gameRoomWaitingPage"),
  {
    suspense: true,
    ssr: false
  }
)

export default function GameRoomList(props) {
  const router = useRouter()
  const { id, GameHome } = router.query
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const { onSetGameData } = useGameStore()

  useEffect(() => {
    let load = false

    if (!load) {
      if (gameData) onSetGameData(gameData)
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData])

  return (
    <>
      <MetaDataTag
        meta_description={props?.meta?.meta_description}
        meta_keyword={props?.meta?.meta_keyword}
        meta_title={props?.meta?.meta_title}
        meta_url={props?.meta?.url}
        og_image={props?.meta?.og_image}
      />
      <GameRoomWaitingPage _roomId={id as string} />
    </>
  )
}

GameRoomList.getLayout = function getLayout(page: ReactElement) {
  return <GameRoomLayout>{page}</GameRoomLayout>
}

export async function getServerSideProps({ locale, params }) {
  const _seo = await getSeoByPath(`/${params?.GameHome}` as string)
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
