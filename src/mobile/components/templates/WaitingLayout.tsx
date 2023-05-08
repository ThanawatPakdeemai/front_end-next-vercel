import React, { ReactElement } from "react"

import Header from "@components/organisms/Header"
import useGameStore from "@stores/game"
import WaitingRoomPage from "@src/mobile/features/pages/game/WaitingRoomPage"
import { useRouter } from "next/router"
import HeaderProfile from "../atoms/HeaderProfile"
import BannerGame from "../atoms/BannerGame"
import TitleOutRoom from "../molecules/TitleOutRoom"

const WaitingLayout = () => {
  const { data } = useGameStore()
  const router = useRouter()
  return (
    <>
      <HeaderProfile title={data?.name || "Game"} />
      <BannerGame imageBanner={data?.image_banner || ""} />
      {/* <HeaderMenu menu={MENU[1].chide || []} /> */}
      {data && data.game_type === "singleplayer" && (
        <TitleOutRoom
          name={`${data?.name || "Game"} `}
          onOutRoom={() =>
            router.push(router?.asPath?.split("/")?.slice(0, -1).join("/"))
          }
        />
      )}

      <div className="mb-[80px]">
        {/* content */}
        <WaitingRoomPage />
        {/* footer */}
      </div>
      <Header />
    </>
  )
}

WaitingLayout.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default WaitingLayout
