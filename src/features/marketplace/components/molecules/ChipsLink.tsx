import PlusMinus from "@components/icons/PlusMinus"
import CONFIGS from "@configs/index"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { Chip } from "@mui/material"
import React from "react"

interface IProp {
  id: string
}

const ChipsLink = ({ id }: IProp) => (
  <div className="flex gap-x-3">
    <a
      href={`${CONFIGS.BASE_URL.NAKAVERSE}/nft-land/${id}`}
      target="_blank"
      rel="noreferrer"
    >
      <Chip
        className="cursor-pointer"
        label="LAND DETAILS"
        size="small"
        color="info"
        deleteIcon={<ArrowForwardIcon />}
        onDelete={() => null}
      />
    </a>
    <div className="flex gap-1">
      <Chip
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
          className="cursor-pointer"
          label="CALCULATE MINING"
          size="small"
          color="success"
          deleteIcon={<PlusMinus />}
          onDelete={() => null}
        />
      </a>
    </div>
  </div>
)

export default ChipsLink
