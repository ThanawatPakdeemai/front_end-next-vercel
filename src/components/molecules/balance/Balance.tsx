import * as React from "react"
import IconButtonCustom from "@components/atoms/IconButtonCustom/IconButtonCustom"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
import { Card, CardContent, SxProps, Theme } from "@mui/material"
import BalanceVault from "@components/atoms/balanceValut/BalanceVault"
import LogoIcon from "@components/icons/LogoIcon"
import ButtonIcon from "@components/atoms/button/ButtonIcon"

interface IProps {
  token: string
  variant: "naka" | "busd" | "vault"
  className?: string
  sx?: SxProps<Theme> | undefined
}

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

const Balance = ({ variant, className, sx }: IProps) => (
  <CardContent
    className={`flex items-center justify-center py-1 px-3 ${className}`}
    // sx={{ maxWidth: 277, width: 277, height: 62 }}
  >
    <Card
      className="flex items-center justify-between rounded-[13px] bg-neutral-800 p-[5px]"
      sx={sx}
    >
      <div className="flex h-full flex-1 items-center rounded-[13px] bg-neutral-900 py-2 px-[10px]">
        <LogoIcon />
        <BalanceVault
          variant={variant}
          className="ml-6 text-sm font-bold text-white-primary"
        />
      </div>
      <ButtonIcon
        variants={iconmotion}
        whileHover="hover"
        transition={{ type: "spring", stiffness: 400, damping: 4 }}
        icon={
          <SyncAltIcon className="h-[20px] w-[20px] rotate-90 text-white-primary" />
        }
        className="ml-1 flex h-[40px] w-[40px] items-center justify-center rounded-[14px] border border-neutral-700 bg-secondary-main"
      />
    </Card>
  </CardContent>
)

export default Balance
