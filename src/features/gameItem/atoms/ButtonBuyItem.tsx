import { memo } from "react"
import { Trans } from "next-i18next"
import dynamic from "next/dynamic"
import { IButtonLink } from "@components/atoms/button/ButtonLink"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: true
  }
)
const AddIcon = dynamic(() => import("@mui/icons-material/Add"), {
  suspense: true,
  ssr: false
})

export interface IButtonBuyItemProps extends IButtonLink {
  handleButton?: () => void
  disabled?: boolean
}
const ButtonBuyItem = ({
  handleButton,
  disabled,
  ...props
}: IButtonBuyItemProps) => (
  <ButtonLink
    disabled={disabled}
    onClick={() => (handleButton ? handleButton() : () => {})}
    text={<Trans i18nKey="Buy Assets" />}
    href=""
    icon={<AddIcon />}
    size="small"
    color="error"
    variant="contained"
    {...props}
    className={`${props.className} !text-neutral-300" h-10 !w-full !min-w-[100px]`}
  />
)

export default memo(ButtonBuyItem)
