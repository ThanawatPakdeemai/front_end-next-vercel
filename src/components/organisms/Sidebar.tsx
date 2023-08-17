import React, { memo } from "react"
import dynamic from "next/dynamic"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

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
