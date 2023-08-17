import React, { useState } from "react"
import { CardContent, SxProps, Theme } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import { useTranslation } from "react-i18next"
import { useWeb3Provider } from "@providers/index"
import useGlobal from "@hooks/useGlobal"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import { CHAIN_SUPPORT, IChainList } from "@configs/chain"
import useChainSupportStore from "@stores/chainSupport"
import dynamic from "next/dynamic"

const AccountBalanceWalletIcon = dynamic(
  () => import("@mui/icons-material/AccountBalanceWallet"),
  {
    suspense: true,
    ssr: false
  }
)
const ModalConnectWallet = dynamic(
  () => import("@components/atoms/ModalConnectWallet"),
  {
    suspense: true,
    ssr: false
  }
)
const TokenList = dynamic(() => import("@components/molecules/TokenList"), {
  suspense: true,
  ssr: false
})
const TokenListItem = dynamic(
  () => import("@components/molecules/TokenListItem"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps {
  token?: string | undefined
  variant?: "naka" | "busd" | "vault" | string | undefined
  tokenUnit?: "naka" | "busd" | "vault" | string | undefined
  className?: string | undefined
  sx?: SxProps<Theme> | undefined
  buyItemCoinSeleced?: ITokenContract
  widthBalance?: string
}

const Balance = ({
  className,
  buyItemCoinSeleced,
  widthBalance = "w-[40px]"
}: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { address, isConnected } = useWeb3Provider()
  const { t } = useTranslation()
  const { chainSupport, currentTokenSelected, currentChainSelected } =
    useChainSupportStore()
  const { hydrated } = useGlobal()
  // const { handleConnectWallet } = useWalletContoller()
  const [open, setOpen] = useState<boolean>(false)

  // const handleClickConnectWallet = async () => {
  //   if (setDisabledConnectButton && handleConnectWithMetamask) {
  //     setDisabledConnectButton(true)
  //     handleConnectWithMetamask()
  //     await fetchChainData()
  //   }
  // }

  /**
   * @description Handle display balances from balance vault
   * @returns
   */
  const handleDisplayBalance = () => {
    if (buyItemCoinSeleced) {
      const selectedCoin = chainSupport.find(
        (coin) => coin.symbol === buyItemCoinSeleced.symbol
      )

      if (selectedCoin) {
        return (
          <TokenListItem
            icon={
              (selectedCoin as ITokenContract).symbol === "NAKA" ? (
                <Icomoon className="icon-Naka text-error-main" />
              ) : (
                <Icomoon className="icon-busd" />
              )
            }
            text={(selectedCoin as ITokenContract).balanceVault.text}
            disabledClick
            widthBalance={widthBalance}
            shadow
          />
        )
      }
      return <></>
    }
    return (
      <TokenList
        dataList={chainSupport}
        currentTabChainSelected={
          CHAIN_SUPPORT.find(
            (item) => item.chainId === currentChainSelected
          ) as IChainList
        }
        currentTokenSelected={
          currentTokenSelected?.symbol || chainSupport[0]?.symbol
        }
        displayBalance
        widthBalance={widthBalance}
      />
    )
  }

  return hydrated ? (
    <div>
      {isConnected && address && profile ? (
        <CardContent
          className={`!my-2 min-w-[200px] items-center justify-center !p-0 ${className}`}
        >
          {handleDisplayBalance()}
        </CardContent>
      ) : (
        <div className="my-4">
          <>
            <ButtonLink
              onClick={() => setOpen(true)}
              href="/"
              text={t("Connect Wallet")}
              icon={<AccountBalanceWalletIcon />}
              color="secondary"
              variant="contained"
              // size="small"
              size="medium"
              className="m-auto h-[54px] rounded-xl"
            />
            <ModalConnectWallet
              open={open}
              setOpen={setOpen}
            />
          </>
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}

export default Balance
