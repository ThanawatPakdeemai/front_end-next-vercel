import ButtonLink from "@components/atoms/button/ButtonLink"
// import LoginIcon from "@mui/icons-material/Login"
import { useWeb3Provider } from "@providers/index"
import { memo } from "react"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import { useTranslation } from "react-i18next"

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
