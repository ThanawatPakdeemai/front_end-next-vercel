/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
import { Card, CardContent, SxProps, Theme } from "@mui/material"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
// import useWalletModal from "@hooks/useWalletModal"
// import useAuth from "@hooks/useAuth"
import useProfileStore from "@stores/profileStore"
import Metamask from "@components/atoms/metamask"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { useTranslation } from "react-i18next"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
// import useContractAction from "@hooks/useContract"

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

const Balance = ({ className, sx }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)

  const { onSetProfileAddress, onSetWallet } = useProfileStore()
  const { t } = useTranslation()
  // const { weiToNaka, getFeeGas, getEventLog, calFloat } = TransactionHelper()
  // const {
  //   checkAllowNaka,
  //   allowNaka,
  //   depositNaka,
  //   getNakaBalanceVault,
  //   withdrawNaka
  // } = useContractAction()

  // const { connectWallet, disconnectWallet, walletConnect } = useAuth()
  // const { onPresentConnectModal } = useWalletModal(
  //   connectWallet,
  //   disconnectWallet
  // )

  // Mock up data
  const Naka = 294345
  const Busd = 294345

  const [haveMetamask, sethaveMetamask] = useState(true)

  const [client, setclient] = useState<any>({
    isConnected: false
  })
  const checkConnection = async () => {
    const { ethereum }: any = window
    if (ethereum) {
      sethaveMetamask(true)
      const accounts = await ethereum.request({ method: "eth_accounts" })
      if (accounts.length > 0) {
        setclient({
          isConnected: true,
          address: accounts[0]
        })
      } else {
        setclient({
          isConnected: false
        })
      }
    } else {
      sethaveMetamask(false)
    }
  }

  const connectWeb3 = async () => {
    try {
      const { ethereum }: any = window

      if (!ethereum) {
        // eslint-disable-next-line no-console
        console.log("Metamask not detected")
        return
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      })
      onSetWallet()
      onSetProfileAddress(accounts)
      setclient({
        isConnected: true,
        address: accounts[0]
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Error connecting to metamask", error)
    }
  }

  useEffect(() => {
    checkConnection()
  }, [client])

  return (
    <div>
      {profile && !haveMetamask ? (
        <Metamask />
      ) : client.isConnected ? (
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
      ) : (
        <div className="my-4">
          <ButtonLink
            onClick={connectWeb3}
            text={t("Connect Wallet")}
            icon={<AccountBalanceWalletIcon />}
            size="medium"
            color="secondary"
            variant="contained"
            className="w-full"
          />
        </div>
      )}
    </div>
  )
}

export default Balance
