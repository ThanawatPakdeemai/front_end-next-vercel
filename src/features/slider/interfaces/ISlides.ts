import { TMediaType } from "@feature/game/interfaces/IPartnerGame"

export interface IGameDownloadSlide {
  image: string
  name: string
  description: string
  link: string
}

export interface IVerticalThumbSlide {
  id: string
  type: TMediaType
  src: string
}

export interface IVerticalThumbCardSlideProps {
  item: IVerticalThumbSlide
  index?: number
  activeIndex?: number
}
