import { CardContent, SxProps, Theme } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import Metamask from "@components/atoms/metamask"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { useTranslation } from "react-i18next"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import { useWeb3Provider } from "@providers/index"

import useGlobal from "@hooks/useGlobal"
import useChainSupport from "@stores/chainSupport"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import PleaseCheckWallet from "@components/atoms/PleaseCheckWallet"
import { CHAIN_SUPPORT, IChainList } from "@configs/chain"
import { useRouter } from "next/router"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import TokenList from "../TokenList"
import TokenListItem from "../TokenListItem"

interface IProps {
  token?: string | undefined
  variant?: "naka" | "busd" | "vault" | string | undefined
  tokenUnit?: "naka" | "busd" | "vault" | string | undefined
  className?: string | undefined
  sx?: SxProps<Theme> | undefined
  buyItemCoinSeleced?: ITokenContract
}

const Balance = ({ className, buyItemCoinSeleced }: IProps) => {
  const router = useRouter()
  const { token } = router.query
  const profile = useProfileStore((state) => state.profile.data)
  const {
    address,
    handleConnectWithMetamask,
    hasMetamask,
    statusWalletConnected
  } = useWeb3Provider()
  const { t } = useTranslation()
  const { chainSupport } = useChainSupport()
  const { hydrated } = useGlobal()
  const { chainId } = useWeb3Provider()

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
                <INaka />
              ) : (
                <IBusd />
              )
            }
            text={(selectedCoin as ITokenContract).balanceVault.text}
            disabledClick
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
          CHAIN_SUPPORT.find((item) => item.chainId === chainId) as IChainList
        }
        currentTokenSelected={(token as string) || chainSupport[0]?.symbol}
        displayBalance
      />
    )
  }

  return hydrated ? (
    <div>
      {address && profile ? (
        <>
          <CardContent
            className={`my-2 min-w-[200px] items-center justify-center p-0 ${className}`}
          >
            {statusWalletConnected?.responseStatus ? (
              handleDisplayBalance()
            ) : (
              <PleaseCheckWallet size="small" />
            )}
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
