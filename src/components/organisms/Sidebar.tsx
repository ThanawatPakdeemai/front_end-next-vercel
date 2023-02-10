import React, { memo } from "react"
import ImageCustom from "@components/atoms/image/Image"

const Sidebar: React.FC = () => {
  const imgSrc = "/images/mocks/sidebar.png"

  return (
    <aside className="sidebar">
      <ImageCustom
        src={imgSrc}
        alt="mock"
        fill
      />
    </aside>
  )
}

export default memo(Sidebar)
