import { Card, CardContent, SxProps, Theme } from "@mui/material"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import useProfileStore from "@stores/profileStore"
import Metamask from "@components/atoms/metamask"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { useTranslation } from "react-i18next"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import { useWeb3Provider } from "@providers/index"
import useAllBalances from "@hooks/useAllBalances"

import useGlobal from "@hooks/useGlobal"
import useChainSupport from "@stores/chainSupport"
import CONFIGS from "@configs/index"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import AmountBalance from "./AmountBalance"

interface IProps {
  token?: string | undefined
  variant?: "naka" | "busd" | "vault" | string | undefined
  tokenUnit?: "naka" | "busd" | "vault" | string | undefined
  className?: string | undefined
  sx?: SxProps<Theme> | undefined
  buyItemCoinSeleced?: ITokenContract
}

const Balance = ({ className, sx, buyItemCoinSeleced }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  // const [nakaBalanceVault, SetNakaBalanceVault] = useState<string>("N/A")
  const { address, handleConnectWithMetamask, hasMetamask } = useWeb3Provider()
  const { t } = useTranslation()
  const { nakaVaultBalance } = useAllBalances()
  const { chainSupport } = useChainSupport()
  const { hydrated } = useGlobal()
  const { chainId } = useWeb3Provider()

  const handleDisplayBalance = () => {
    if (chainId === CONFIGS.CHAIN.CHAIN_ID) {
      return (
        <AmountBalance
          balance={nakaVaultBalance.text}
          icon={<INaka />}
          link="NAKA"
        />
      )
    }

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
        {chainSupport.map((coin) => (
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

  return hydrated ? (
    <div>
      {address && profile ? (
        <>
          <CardContent
            className={`my-2 min-w-[200px] items-center justify-center p-0 ${className}`}
          >
            <Card
              className=" m-auto flex-row gap-y-3  rounded-[13px] bg-neutral-800  px-[5px] pt-[5px] "
              sx={sx}
            >
              {handleDisplayBalance()}
            </Card>
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
