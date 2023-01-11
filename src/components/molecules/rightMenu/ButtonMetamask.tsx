import ButtonLink from "@components/atoms/button/ButtonLink"
import { IMAGES } from "@constants/images"
import { memo } from "react"
import { Image } from "@components/atoms/image"

interface IProp {
  handleButton: () => void
}
const ButtonMetamask = ({ handleButton }: IProp) => (
  <>
    <ButtonLink
      onClick={() => handleButton()}
      href="/"
      text="Login with matamask"
      icon={
        <Image
          src={IMAGES.metamask.src}
          width={IMAGES.metamask.width}
          height={IMAGES.metamask.height}
          alt={IMAGES.metamask.alt}
        />
      }
      color="secondary"
      variant="contained"
      // size="small"
      size="medium"
      className=" m-auto rounded-xl"
    />
  </>
)

export default memo(ButtonMetamask)
