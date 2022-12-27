import ButtonLink from "@components/atoms/button/ButtonLink"
import { memo } from "react"
import LoginIcon from "@mui/icons-material/Login"

interface IProp {
  handleButton: () => void
}
const ButtonLogin = ({ handleButton }: IProp) => (
  <>
    <ButtonLink
      onClick={() => handleButton()}
      href="/"
      text="Login with username"
      icon={<LoginIcon />}
      variant="contained"
      // size="small"
      size="medium"
      className=" m-auto rounded-xl"
    />
  </>
)

export default memo(ButtonLogin)
