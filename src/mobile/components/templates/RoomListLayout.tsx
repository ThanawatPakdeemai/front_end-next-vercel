import React, { ReactElement } from "react"

import Header from "@components/organisms/Header"
import RoomListPage from "@src/mobile/features/pages/game/RoomListPage"
import useGameStore from "@stores/game"
import { MENU } from "@configs/menu"
import HeaderProfile from "../atoms/HeaderProfile"
import HeaderMenu from "../atoms/HeaderMenu"

const RoomListLayout = () => {
  const { data } = useGameStore()
  return (
    <>
      <HeaderProfile title={data?.name || "Game"} />
      <HeaderMenu menu={MENU[1].chide || []} />
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
