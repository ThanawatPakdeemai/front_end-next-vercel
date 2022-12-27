import ButtonLink from "@components/atoms/button/ButtonLink"
import LoginIcon from "@mui/icons-material/Login"
import { memo } from "react"

interface IProp {
  handleButton: () => void
}
const ButtonConnectWallet = ({ handleButton }: IProp) => (
  <>
    <ButtonLink
      onClick={() => handleButton()}
      href="/"
      text="Connect Wallet"
      icon={<LoginIcon />}
      color="secondary"
      variant="contained"
      // size="small"
      size="medium"
      className=" m-auto rounded-xl"
    />
  </>
)

export default memo(ButtonConnectWallet)
