/* eslint-disable no-nested-ternary */
import React, { memo } from "react"
import _ from "lodash"
import dynamic from "next/dynamic"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: true
  }
)
const ArrowDownwardOutlinedIcon = dynamic(
  () => import("@mui/icons-material/ArrowDownwardOutlined")
)
const ArrowUpwardOutlinedIcon = dynamic(
  () => import("@mui/icons-material/ArrowUpwardOutlined")
)

export interface ITypeP2p {
  type: "buy" | "sell"
}
interface IDataButton extends ITypeP2p {
  title: string
}
interface IProp {
  type?: "buy" | "sell"
  setType?: (_value: "buy" | "sell") => void
  dataButton?: IDataButton[]
}
const HeaderP2P = ({ type = "buy", setType, dataButton }: IProp) => (
  <div className=" my-2 flex flex-col items-center justify-between gap-2 rounded-lg border border-neutral-700 bg-neutral-780 p-2 md:flex-row md:gap-0">
    <p
      className={` text-md font-neue-machina-medium uppercase  ${
        type === "sell" ? " text-error-main" : " text-varidian-default"
      }`}
    >
      {_.find(dataButton, { type })?.title} naka
    </p>
    <div className="flex items-center gap-2">
      {dataButton &&
        dataButton.map((ele, index) => (
          <ButtonLink
            key={Number(index)}
            href=""
            onClick={() => setType && setType(ele.type)}
            text={ele.title}
            icon={
              ele.type === "buy" ? (
                <ArrowDownwardOutlinedIcon />
              ) : (
                <ArrowUpwardOutlinedIcon />
              )
            }
            size="small"
            color="primary"
            variant="contained"
            className={`!rounded-sm  ${
              type === ele.type
                ? type === "buy"
                  ? "!bg-varidian-default !text-neutral-800 "
                  : "!bg-error-main !text-neutral-800 "
                : "!bg-primary-main !text-neutral-500"
            }  `}
          />
        ))}
    </div>
  </div>
)

export default memo(HeaderP2P)
