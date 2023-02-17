import { useEffect, useState } from "react"
import { CardContent, SxProps, Theme } from "@mui/material"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import useProfileStore from "@stores/profileStore"
import Metamask from "@components/atoms/metamask"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { useTranslation } from "react-i18next"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import { useWeb3Provider } from "@providers/index"
import useGetBalanceVault from "@feature/inventory/containers/hooks/useGetBalanceVault"
import Helper from "@utils/helper"
import useGlobal from "@hooks/useGlobal"
import AmountBalance from "./AmountBalance"

interface IProps {
  token?: string | undefined
  variant?: "naka" | "busd" | "vault" | string | undefined
  tokenUnit?: "naka" | "busd" | "vault" | string | undefined
  className?: string | undefined
  sx?: SxProps<Theme> | undefined
}

const Balance = ({ className, sx }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const [nakaBalanceVault, SetNakaBalanceVault] = useState<string>("N/A")
  const { address, handleConnectWithMetamask, hasMetamask } = useWeb3Provider()
  const { t } = useTranslation()
  const { balanceVaultNaka } = useGetBalanceVault(
    profile?.address ?? "",
    !!profile
  )
  const { hydrated } = useGlobal()
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

  const { WeiToNumber, formatNumber } = Helper

  useEffect(() => {
    if (balanceVaultNaka && address) {
      const tempData = WeiToNumber(balanceVaultNaka.data)
      SetNakaBalanceVault(formatNumber(tempData, { maximumFractionDigits: 1 }))
    } else {
      SetNakaBalanceVault("N/A")
    }
  }, [WeiToNumber, address, balanceVaultNaka, formatNumber])

  // Mock up data
  const Busd = 294345

  // const [haveMetamask, sethaveMetamask] = useState(true)

  // const checkConnection = async () => {
  //   const { ethereum }: any = window
  //   if (ethereum) {
  //     sethaveMetamask(true)
  //     const accounts = await ethereum.request({ method: "eth_accounts" })
  //     if (accounts.length > 0) {
  //       setclient({
  //         isConnected: true,
  //         address: accounts[0]
  //       })
  //     } else {
  //       setclient({
  //         isConnected: false
  //       })
  //     }
  //   } else {
  //     sethaveMetamask(false)
  //   }
  // }

  // const connectWeb3 = async () => {
  //   try {
  //     const { ethereum }: any = window

  //     if (!ethereum) {
  //       // eslint-disable-next-line no-console
  //       console.log("Metamask not detected")
  //       return
  //     }

  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts"
  //     })
  //     onSetWallet()
  //     onSetProfileAddress(accounts)
  //     setclient({
  //       isConnected: true,
  //       address: accounts[0]
  //     })
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.log("Error connecting to metamask", error)
  //   }
  // }

  return hydrated ? (
    <div>
      {address && profile ? (
        <>
          <CardContent
            className={`my-2 min-w-[200px] items-center justify-center p-0 ${className}`}
          >
            <AmountBalance
              sx={sx}
              dataBalance={[
                { icon: <INaka />, balance: nakaBalanceVault },
                { icon: <IBusd width={21} />, balance: Busd }
              ]}
            />
          </CardContent>
        </>
      ) : (
        <div className="my-4">
          {hasMetamask && profile && (
            <ButtonLink
              onClick={handleConnectWithMetamask}
              text={t("Connect Wallet")}
              icon={<AccountBalanceWalletIcon />}
              size="medium"
              color="secondary"
              variant="contained"
              className="w-full"
            />
          )}

          {!hasMetamask && profile && <Metamask />}
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}

export default Balance
