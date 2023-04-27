import React, { ReactElement } from "react"

import Header from "@components/organisms/Header"
import RoomListPage from "@src/mobile/features/pages/game/RoomListPage"

const RoomListLayout = () => (
  <>
    <div className="mb-[80px]">
      {/* content */}
      <RoomListPage />
      {/* footer */}
    </div>
    <Header />
  </>
)

RoomListLayout.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default RoomListLayout
