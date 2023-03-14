import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
import { IBalanceDisplay } from "@hooks/useAllBalances"
import { Box } from "@mui/material"
import { TokenSupport } from "@configs/chain"
import ButtonIcon from "../atoms/button/ButtonIcon"

const iconmotion = {
  hover: {
    scale: 1.2,
    rotate: 17,
    ease: "easeIn",
    transition: {
      duration: 0.4,
      stiffness: 500,
      type: "spring"
    }
  }
}
export interface ITokenListItem {
  icon?: ReactNode
  text?: string | number | ReactNode | IBalanceDisplay
  link?: TokenSupport
  shadow?: boolean
  handleClick?: () => void
  disabledClick?: boolean
}
const TokenListItem = ({
  icon,
  text,
  link,
  shadow = false,
  handleClick,
  disabledClick = false
}: ITokenListItem) => {
  const router = useRouter()

  const renderText = () => {
    if (typeof text === "string") {
      return text
    }
    return (text as IBalanceDisplay).text || "N/A"
  }

  return (
    <div className="token--list-item__wrapper">
      <Box
        sx={{
          boxShadow: shadow
            ? "0px 1px 1px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.05), inset 0px -1px 1px rgba(0, 0, 0, 0.25)"
            : "none"
        }}
        className="token--list-item mb-[5px] flex items-center  justify-between rounded-sm bg-neutral-700 p-[3px]"
      >
        <div className="token--list-item__text flex h-[40px] flex-1 items-center rounded-lg border border-neutral-700 bg-neutral-900 px-3">
          {icon || <></>}
          <p className="ml-6 text-sm font-bold text-white-primary">
            {renderText()}
          </p>
        </div>
        {disabledClick ? (
          <></>
        ) : (
          <ButtonIcon
            variants={iconmotion}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 400, damping: 4 }}
            icon={
              <SyncAltIcon className="h-[20px] w-[20px] rotate-90 text-white-primary" />
            }
            className="token--list-item__button ml-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900"
            onClick={
              handleClick ||
              (() => {
                router.push(
                  link ? `/wallet/?token=${link}` : "/wallet/?token=NAKA"
                )
              })
            }
          />
        )}
      </Box>
    </div>
  )
}
export default TokenListItem
