import ButtonLink from "@components/atoms/button/ButtonLink"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"

interface IProp {
  handleButton: () => void
}
const ButtonBuyItem = ({ handleButton }: IProp) => (
  <>
    <ButtonLink
      onClick={() => handleButton()}
      text="Buy Assets"
      href="/"
      icon={<AddIcon />}
      size="small"
      color="error"
      variant="contained"
      className=" !text-neutral-300"
    />
  </>
)

export default memo(ButtonBuyItem)
