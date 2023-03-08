import { CardContent, SxProps, Theme } from "@mui/material"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import useProfileStore from "@stores/profileStore"
import Metamask from "@components/atoms/metamask"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { useTranslation } from "react-i18next"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import { useWeb3Provider } from "@providers/index"

import useGlobal from "@hooks/useGlobal"
import useChainSupport from "@stores/chainSupport"
import CONFIGS from "@configs/index"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import PleaseCheckWallet from "@components/atoms/PleaseCheckWallet"
import AmountBalance from "./AmountBalance"

interface IProps {
  token?: string | undefined
  variant?: "naka" | "busd" | "vault" | string | undefined
  tokenUnit?: "naka" | "busd" | "vault" | string | undefined
  className?: string | undefined
  sx?: SxProps<Theme> | undefined
  buyItemCoinSeleced?: ITokenContract
}

const Balance = ({ className, buyItemCoinSeleced }: IProps) => {
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
   * @description Handle display balances from balance vault BSC Only
   * @returns
   */
  const getBSCBalance = () => {
    if (buyItemCoinSeleced) {
      const selectedCoin = chainSupport.find(
        (coin) => coin.symbol === buyItemCoinSeleced.symbol
      )
      return (
        <AmountBalance
          balance={selectedCoin?.balanceVault ?? "N/A"}
          icon={
            <IBusd
              width={30}
              height={30}
            />
          }
          link="BNB"
        />
      )
    }

    // Display all coin assets
    return (
      <>
        {chainSupport &&
          chainSupport.length > 0 &&
          chainSupport.map((coin) => (
            <AmountBalance
              key={coin.address}
              balance={coin.balanceVault}
              icon={<IBusd width={21} />}
              link="BNB"
            />
          ))}
      </>
    )
  }

  /**
   * @description Handle display balances from balance vault
   * @returns
   */
  const handleDisplayBalance = () => {
    if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX) {
      return (
        <>
          {chainSupport.map((coin) => (
            <AmountBalance
              key={coin.address}
              balance={coin.balanceVault}
              icon={<INaka />}
              link="NAKA"
            />
          ))}
        </>
      )
    }
    return getBSCBalance()
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
