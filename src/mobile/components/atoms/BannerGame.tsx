import { Image } from "@components/atoms/image"

interface IProps {
  imageBanner: string
}
const BannerGame = (props: IProps) => {
  const { imageBanner } = props
  return (
    <Image
      src={`${imageBanner}`}
      alt="imageBanner"
      width={500}
      height={51}
      className="h-[51px] w-full object-cover object-center"
    />
  )
}
export default BannerGame
