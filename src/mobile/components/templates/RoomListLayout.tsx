import React, { ReactElement } from "react"

import Header from "@components/organisms/Header"
import RoomListPage from "@src/mobile/features/pages/game/RoomListPage"
import useGameStore from "@stores/game"
// import { MENU } from "@configs/menu"
import { useRouter } from "next/router"
import ModalCreateRoom from "@feature/rooms/components/molecules/ModalCreateRoom"
import HeaderProfile from "../atoms/HeaderProfile"
import BannerGame from "../atoms/BannerGame"
import TitleOutRoom from "../molecules/TitleOutRoom"
// import HeaderMenu from "../atoms/HeaderMenu"

const RoomListLayout = () => {
  const { data } = useGameStore()
  const router = useRouter()

  return (
    <>
      <HeaderProfile title={data?.name || "Game"} />
      <BannerGame imageBanner={data?.image_banner || ""} />

      <div className="flex items-center justify-between">
        <TitleOutRoom
          name={data?.name || "Game"}
          onOutRoom={() =>
            router.push(router?.asPath?.replace("/roomlist", ""))
          }
        />
        {data && (
          <div className="mr-2 w-[162px]">
            <ModalCreateRoom gameData={data} />
          </div>
        )}
      </div>
      {/* <HeaderMenu menu={MENU[1].chide || []} /> */}
      <div className="mb-[80px]">
        {/* content */}
        <RoomListPage />
        {/* footer */}
      </div>
      <Header />
    </>
  )
}

RoomListLayout.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default RoomListLayout
