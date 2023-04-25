import ButtonLink from "@components/atoms/button/ButtonLink"
import { memo } from "react"
import AddIcon from "@mui/icons-material/Add"
import { Trans } from "next-i18next"

interface IProp {
  handleButton: () => void
  disabled: boolean
  className?: string
}
const ButtonBuyItem = ({ handleButton, disabled, className }: IProp) => (
  <>
    <ButtonLink
      disabled={disabled}
      onClick={() => handleButton()}
      text={<Trans i18nKey="Buy Assets" />}
      href=""
      icon={<AddIcon />}
      size="small"
      color="error"
      variant="contained"
      className={`!w-[146px] !text-neutral-300 ${className}`}
    />
  </>
)

export default memo(ButtonBuyItem)
