import RightMenu from "@components/molecules/rightMenu/RightMenu"
import React, { memo } from "react"
// import Image from "@components/atoms/image"

const Header = () => (
  <header className="header flex h-36 items-center justify-between overflow-clip">
    <RightMenu />
    <RightMenu />
    <RightMenu />
  </header>
)

export default memo(Header)
