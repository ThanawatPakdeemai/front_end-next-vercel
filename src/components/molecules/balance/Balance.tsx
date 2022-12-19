import * as React from "react"
import IconButtonCustom from "@components/atoms/IconButtonCustom/IconButtonCustom"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
import { Card, CardContent } from "@mui/material"
import BalanceVault from "@components/atoms/balanceValut/BalanceVault"
import LogoIcon from "@components/icons/LogoIcon"

interface IProps {
  token: string
  variant: "naka" | "busd" | "vault"
}

const Balance = ({ variant }: IProps) => (
  <CardContent
    className="flex items-center justify-center py-1 px-3"
    // sx={{ maxWidth: 277, width: 277, height: 62 }}
  >
    <Card
      className="flex items-center justify-between rounded-[13px] bg-neutral-800 p-[5px]"
      sx={{ maxWidth: 265, minWidth: 265, height: 50 }}
    >
      <div className="flex h-full flex-1 items-center rounded-[13px] bg-neutral-900 py-2 px-[10px]">
        <LogoIcon />
        <BalanceVault
          variant={variant}
          className="ml-6 text-sm font-bold text-white-primary"
        />
      </div>
      <IconButtonCustom
        className="ml-[5px] h-10 w-10 rotate-90 rounded-[13px] border-[2px] border-neutral-700 bg-secondary-main hover:scale-105 hover:bg-secondary-main"
        aria-label="notification-button"
      >
        <SyncAltIcon className="text-white-primary transition-all duration-300 ease-bounce hover:rotate-[12deg]" />
      </IconButtonCustom>
    </Card>
  </CardContent>
)

export default Balance
