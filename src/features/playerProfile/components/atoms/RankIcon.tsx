import React, { useState } from "react"
import { v4 as uuid } from "uuid"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})

interface IProp {
  width: number
  height: number
  icon: string
}

const RankIcon = ({ icon, width, height }: IProp) => {
  const [imgError, setImgError] = useState(true)
  return (
    <div>
      {imgError ? (
        <Image
          src={`/images/gamePage/rank/${icon}.svg`}
          alt={icon}
          width={width}
          height={height}
          onError={() => setImgError(false)}
        />
      ) : (
        <Icomoon
          className="icon-naka"
          key={uuid()}
        />
      )}
    </div>
  )
}

export default RankIcon
