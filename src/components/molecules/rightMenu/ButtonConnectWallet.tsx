import ButtonLink from "@components/atoms/button/ButtonLink"
// import LoginIcon from "@mui/icons-material/Login"
import { useWeb3Provider } from "@providers/index"
import { memo } from "react"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"

const ButtonConnectWallet = () => {
  const { accounts, handleConnectWithMetamask } = useWeb3Provider()

  return (
    <>
      {!accounts && (
        <ButtonLink
          onClick={handleConnectWithMetamask}
          href="/"
          text="Connect Wallet"
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
