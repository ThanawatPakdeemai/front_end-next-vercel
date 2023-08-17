import Link from "next/link"
import React from "react"
import dynamic from "next/dynamic"
import useGlobal from "@hooks/useGlobal"
import CONFIGS from "@configs/index"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ArrowForwardIcon = dynamic(
  () => import("@mui/icons-material/ArrowForward"),
  {
    suspense: true,
    ssr: false
  }
)
const Chip = dynamic(() => import("@mui/material/Chip"))

interface IProp {
  id: string
  position?: {
    x: string
    y: string
  }
}

const ChipsLink = ({ id, position }: IProp) => {
  const { getURLWithEmailToken } = useGlobal()

  return (
    <div className="flex flex-col gap-y-3 sm:flex-row sm:gap-x-3 ">
      <div className="flex gap-x-3">
        <Link
          href={`/marketplace/map?x=${position?.x}&y=${position?.y}`}
          target="_blank"
          rel="noreferrer"
        >
          <Chip
            className="cursor-pointer font-neue-machina-bold"
            label="VIEW ON MAP"
            size="small"
            color="info"
            deleteIcon={<ArrowForwardIcon />}
            onDelete={() => null}
          />
        </Link>
        <Link
          href={`${
            CONFIGS.BASE_URL.NAKAVERSE
          }/nft-land/${id}/${getURLWithEmailToken()}`}
          target="_blank"
          rel="noreferrer"
        >
          <Chip
            className="cursor-pointer font-neue-machina-bold"
            label="LAND DETAILS"
            size="small"
            color="info"
            deleteIcon={<ArrowForwardIcon />}
            onDelete={() => null}
          />
        </Link>
      </div>
      <div className="flex gap-1">
        <Chip
          className="!bg-green-lemon font-neue-machina-bold"
          label="NEW"
          size="small"
          color="success"
        />
        <a
          href={`${CONFIGS.BASE_URL.NAKAVERSE}/nft-land/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Chip
            className="cursor-pointer !bg-green-lemon font-neue-machina-bold"
            label="CALCULATE MINING"
            size="small"
            color="success"
            deleteIcon={<Icomoon className="icon-Plus1" />}
            onDelete={() => null}
          />
        </a>
      </div>
    </div>
  )
}

export default ChipsLink
