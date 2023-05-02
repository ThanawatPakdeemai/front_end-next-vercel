import React, { ReactElement } from "react"

import Header from "@components/organisms/Header"
import useGameStore from "@stores/game"
// import { MENU } from "@configs/menu"
import { useRouter } from "next/router"
import WaitingRoomPage from "@src/mobile/features/pages/game/WaitingRoomPage"
import HeaderProfile from "../atoms/HeaderProfile"
import BannerGame from "../atoms/BannerGame"
import TitleOutRoom from "../molecules/TitleOutRoom"
// import HeaderMenu from "../atoms/HeaderMenu"

const WaitingLayout = () => {
  const { data } = useGameStore()
  const router = useRouter()

  return (
    <>
      <HeaderProfile title={data?.name || "Game"} />
      <BannerGame imageBanner={data?.image_banner || ""} />
      <TitleOutRoom
        name={data?.name || "Game"}
        onOutRoom={() => router.push(router?.asPath?.replace("/roomlist", ""))}
      />
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
