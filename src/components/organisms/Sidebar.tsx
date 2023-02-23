import React, { memo } from "react"
import { Image } from "@components/atoms/image"

const Sidebar: React.FC = () => {
  const imgSrc = "/images/mocks/sidebar.png"

  return (
    <aside className="sidebar">
      <Image
        src={imgSrc}
        alt="mock"
        fill
      />
    </aside>
  )
}

export default memo(Sidebar)
