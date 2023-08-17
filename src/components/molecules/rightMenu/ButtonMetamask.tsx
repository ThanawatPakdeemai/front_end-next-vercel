import { memo } from "react"
import dynamic from "next/dynamic"
import { IMAGES } from "@constants/images"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: true
  }
)

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProp {
  handleButton: () => void
}
const ButtonMetamask = ({ handleButton }: IProp) => (
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
)

export default memo(ButtonMetamask)
