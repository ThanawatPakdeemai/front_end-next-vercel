import ButtonLink from "@components/atoms/button/ButtonLink"
import React, { memo } from "react"
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined"
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined"

interface IProp {
  type?: "buy" | "sell"
  setType?: (_value: "buy" | "sell") => void
}
const HeaderP2P = ({ type = "buy", setType }: IProp) => (
  <>
    <div className=" my-2 flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-780 p-2">
      <p
        className={` text-md font-neue-machina-medium uppercase  ${
          type === "sell" ? " text-error-main" : " text-varidian-default"
        }`}
      >
        {type} naka
      </p>
      <div className="flex items-center gap-2">
        <ButtonLink
          href=""
          onClick={() => setType && setType("buy")}
          text="Buy"
          icon={<ArrowDownwardOutlinedIcon />}
          size="small"
          color="primary"
          variant="contained"
          className={` !rounded-sm ${
            type === "buy"
              ? "!bg-varidian-default !text-neutral-800"
              : "  !bg-primary-main !text-neutral-500"
          }  `}
        />
        <ButtonLink
          href=""
          onClick={() => setType && setType("sell")}
          text="Sell"
          icon={<ArrowUpwardOutlinedIcon />}
          size="small"
          color="primary"
          className={` !rounded-sm  !text-neutral-700
          ${
            type === "sell"
              ? "!bg-error-main !text-neutral-800"
              : "  !bg-primary-main !text-neutral-500"
          }  `}
          variant="contained"
        />
      </div>
    </div>
  </>
)

export default memo(HeaderP2P)
