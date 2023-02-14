import ButtonLink from "@components/atoms/button/ButtonLink"
import React, { memo } from "react"
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined"
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined"

const HeaderP2P = () => (
  <>
    <div className=" flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-780 p-2">
      <p className=" text-md font-neue-machina-medium uppercase text-varidian-default">
        buy naka
      </p>
      <div className="flex items-center gap-2">
        <ButtonLink
          href="/"
          text="Buy"
          icon={<ArrowDownwardOutlinedIcon />}
          size="small"
          color="secondary"
          variant="contained"
          className=" !rounded-sm"
        />
        <ButtonLink
          href="/"
          text="Sell"
          icon={<ArrowUpwardOutlinedIcon />}
          size="small"
          color="secondary"
          className=" !rounded-sm"
          variant="contained"
        />
      </div>
    </div>
  </>
)

export default memo(HeaderP2P)
