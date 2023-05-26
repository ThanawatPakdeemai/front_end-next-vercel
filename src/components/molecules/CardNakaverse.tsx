/* eslint-disable prettier/prettier */
import React from "react"
import { Image } from "@components/atoms/image"
import { IMAGES } from "@constants/images"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { Card, CardContent, styled } from "@mui/material"
import IOpenNew from "@components/icons/OpenNew"
import { useTranslation } from "react-i18next"

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
  btnText = "visit_now"
}: ICardNakaverse) => {
  const { t } = useTranslation()
  return (
    <>
      <Card
        variant="outlined"
        className="relative flex h-[218px] w-full overflow-hidden max-[480px]:w-auto xl:w-[678px]"
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

        <CardContent className="py-[30px] pl-[45px] pr-0 max-[480px]:p-[30px]">
          <h6 className="relative m-0 px-0 py-[35px] font-neue-machina text-[22px] font-bold not-italic tracking-[1px] text-white-default">
            {title}
          </h6>
          <ButtonLink
            href={href}
            // eslint-disable-next-line no-return-assign
            onClick={() => (window.location.href = href)}
            text={`${t(btnText)}`}
            icon={<IOpenNew />}
            size="medium"
            color="secondary"
            variant="contained"
            className="h-10 font-neue-machina"
          />
        </CardContent>
        <CardContent className="relative hidden w-full sm:block">
          <div
            className={`h-[${IMAGES.nakaVerseMascot.width}px] absolute bottom-0 left-[10%] top-[20.5%] w-[${IMAGES.nakaVerseMascot.height}px]`}
          >
            <Image
              src={IMAGES.nakaVerseMascot.src}
              alt={IMAGES.nakaVerseMascot.alt}
              width={IMAGES.nakaVerseMascot.width}
              height={IMAGES.nakaVerseMascot.height}
            />
          </div>
          <div className="absolute right-[12%] top-[15%] w-[171px] max-[480px]:top-[20%] max-[480px]:w-[70%]">
            <KeyFramesRotate>
              <Image
                src={IMAGES.worldNakaverse.src}
                alt={IMAGES.worldNakaverse.alt}
                width={IMAGES.worldNakaverse.width}
                height={IMAGES.worldNakaverse.height}
                className="relative h-full w-full"
              />
            </KeyFramesRotate>
          </div>
          <div className="absolute right-[10%] top-[13%] w-[195px] max-[480px]:right-[6%] max-[480px]:top-[17%] max-[480px]:w-[80%]">
            <Image
              src={IMAGES.ringNakaverse.src}
              alt={IMAGES.ringNakaverse.alt}
              width={IMAGES.ringNakaverse.width}
              height={IMAGES.ringNakaverse.height}
              className="h-full w-full"
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default CardNakaverse
