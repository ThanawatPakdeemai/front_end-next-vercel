/* eslint-disable prettier/prettier */
import React from "react"
import { Image } from "@components/atoms/image"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { Card, CardContent, styled } from "@mui/material"
import IOpenNew from "@components/icons/OpenNew"

interface ICardNakaverse {
  title?: string
  image?: string
  href?: string
  btnText?: string
}

const KeyFramesRotate = styled("div")({
  "@keyframes rotation": {
    from: {
      transform: "rotate(359deg)"
    },
    to: {
      transform: "rotate(0deg)"
    }
  },
  animation: "rotation 10s infinite linear"
})

const CardNakaverse = ({
  title = "NAKAVERSE",
  image = IMAGES.nakaVerse.src,
  href = "/",
  btnText = "Visit Now"
}: ICardNakaverse) => (
  <>
    <Card
      variant="outlined"
      className=" relative flex h-[218px] w-[678px] max-w-full overflow-hidden  max-[480px]:w-auto"
    >
      <Image
        src={image}
        width={IMAGES.nakaVerse.width}
        height={IMAGES.nakaVerse.height}
        alt={IMAGES.nakaBand.alt}
        className="absolute h-full w-full"
        loading="eager"
        priority
      />

      <CardContent className="py-[30px] pr-0 pl-[45px] max-[480px]:p-[30px]">
        <h6 className="relative m-0 py-[35px] px-0 font-neue-machina text-[22px] font-bold not-italic tracking-[1px] text-white-default">
          {title}
        </h6>
        <ButtonLink
          href={href}
          text={btnText}
          icon={<IOpenNew />}
          size="medium"
          color="secondary"
          variant="contained"
          className="h-9"
        />
      </CardContent>
      <CardContent className="relative w-full max-[480px]:hidden">
        <div className="absolute left-[10%] top-[10.5%] h-[239.32px] w-[238.62px] max-[480px]:hidden max-[226px]:hidden">
          <Image
            src={IMAGES.nakaVerseMascot.src}
            alt={IMAGES.nakaVerseMascot.alt}
            className="h-full w-full"
          />
        </div>
        <div className="absolute right-[12%] top-[15%] max-[480px]:top-[20%] max-[480px]:w-[70%] max-[226px]:hidden">
          <KeyFramesRotate>
            <Image
              src={IMAGES.worldNakaverse.src}
              alt={IMAGES.worldNakaverse.alt}
              className="relative h-full w-full"
            />
          </KeyFramesRotate>
        </div>
        <div className="absolute right-[10%] top-[13%] max-[480px]:top-[17%] max-[480px]:right-[6%] max-[480px]:w-[80%] max-[226px]:hidden">
          <Image
            src={IMAGES.ringNakaverse.src}
            alt={IMAGES.ringNakaverse.alt}
            className="h-full w-full"
          />
        </div>
      </CardContent>
    </Card>
  </>
)

export default CardNakaverse
