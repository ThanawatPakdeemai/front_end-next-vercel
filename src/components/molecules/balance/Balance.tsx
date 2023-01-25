import * as React from "react"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
import { Card, CardContent, SxProps, Theme } from "@mui/material"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import useProfileStore from "@stores/profileStore"
import ButtonLink from "@components/atoms/button/ButtonLink"
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined"
// import useWalletModal from "@hooks/useWalletModal"
// import useAuth from "@hooks/useAuth"

interface IProps {
  token?: string | undefined
  variant?: "naka" | "busd" | "vault" | string | undefined
  tokenUnit?: "naka" | "busd" | "vault" | string | undefined
  className?: string | undefined
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

const Balance = ({ variant, className, sx, tokenUnit }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  // const { connectWallet, disconnectWallet, walletConnect } = useAuth()
  // const { onPresentConnectModal } = useWalletModal(
  //   connectWallet,
  //   disconnectWallet
  // )

  // Mock up data
  const Naka = 294345
  const Busd = 294345

  return (
    <div>
      <CardContent
        className={`my-2 min-w-[200px] items-center justify-center p-0 ${className}`}
      >
        <Card
          className=" m-auto gap-[5px] rounded-[13px] bg-neutral-800  px-[5px] pt-[5px] "
          sx={sx}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex h-full flex-1 items-center rounded-lg bg-neutral-900 py-[11px] px-[10px]">
              <INaka />
              <p className="ml-6 text-sm font-bold text-white-primary">
                {Naka}
              </p>
              {/* <BalanceVault
                  variant={variant}
                  className="ml-6 text-sm font-bold text-white-primary"
                /> */}
            </div>
            <ButtonIcon
              variants={iconmotion}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 400, damping: 4 }}
              icon={
                <SyncAltIcon className="h-[20px] w-[20px] rotate-90 text-white-primary" />
              }
              className="ml-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900"
            />
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex h-full flex-1 items-center rounded-lg bg-neutral-900 py-[11px] px-[10px]">
              <IBusd />
              <p className="ml-6 text-sm font-bold text-white-primary">
                {Busd}
              </p>
              {/* <BalanceVault
                  variant={variant}
                  className="ml-6 text-sm font-bold text-white-primary"
                /> */}
            </div>
            <ButtonIcon
              variants={iconmotion}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 400, damping: 4 }}
              icon={
                <SyncAltIcon className="h-[20px] w-[20px] rotate-90 text-white-primary" />
              }
              className="ml-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900"
            />
          </div>
        </Card>
      </CardContent>
    </div>
  )
}

export default Balance
