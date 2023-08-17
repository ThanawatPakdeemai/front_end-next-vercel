import { memo } from "react"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { useWeb3Provider } from "@providers/index"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)

const ButtonConnectWallet = () => {
  const { accounts, handleConnectWithMetamask } = useWeb3Provider()
  const { t } = useTranslation()

  return (
    <>
      {!accounts && (
        <ButtonLink
          onClick={handleConnectWithMetamask}
          href="/"
          text={t("Connect Wallet")}
          icon={<AccountBalanceWalletIcon />}
          color="secondary"
          variant="contained"
          // size="small"
          size="medium"
          className=" m-auto rounded-xl"
        />
      )}
    </>
  )
}

export default memo(ButtonConnectWallet)
