import React, { ReactElement } from "react"

import Header from "@components/organisms/Header"
import useGameStore from "@stores/game"
import WaitingRoomPage from "@src/mobile/features/pages/game/WaitingRoomPage"
import HeaderProfile from "../atoms/HeaderProfile"
import BannerGame from "../atoms/BannerGame"

const WaitingLayout = () => {
  const { data } = useGameStore()
  return (
    <>
      <HeaderProfile title={data?.name || "Game"} />
      <BannerGame imageBanner={data?.image_banner || ""} />
      {/* <HeaderMenu menu={MENU[1].chide || []} /> */}
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
