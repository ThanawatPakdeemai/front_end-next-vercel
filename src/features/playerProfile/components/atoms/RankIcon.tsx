import React, { useState } from "react"
import Image from "next/image"
import BadgesPlacrhoder from "@components/icons/Banner/BadgesPlacrhoder"
import { v4 as uuid } from "uuid"

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
        <BadgesPlacrhoder key={uuid()} />
      )}
    </div>
  )
}

export default RankIcon
