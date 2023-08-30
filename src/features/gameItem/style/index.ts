import { IButtonLink } from "@components/atoms/button/ButtonLink"

export interface IButtonBuyItemProps extends IButtonLink {
  handleButton?: () => void
  disabled?: boolean
}
