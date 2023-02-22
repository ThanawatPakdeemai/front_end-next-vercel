import { Card, CardContent, SxProps, Theme } from "@mui/material"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import useProfileStore from "@stores/profileStore"
import Metamask from "@components/atoms/metamask"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { useTranslation } from "react-i18next"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import { useWeb3Provider } from "@providers/index"
import useGlobal from "@hooks/useGlobal"
import useAllBalances from "@hooks/useAllBalances"
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
  const { address, handleConnectWithMetamask, hasMetamask } = useWeb3Provider()
  const { t } = useTranslation()
  const { busdVaultBalance, nakaVaultBalance } = useAllBalances()
  const { hydrated } = useGlobal()

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
              <AmountBalance
                balance={nakaVaultBalance.text}
                icon={<INaka />}
                link="NAKA"
              />
              <AmountBalance
                balance={busdVaultBalance.text}
                icon={<IBusd width={21} />}
                link="BNB"
              />
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
