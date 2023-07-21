import React from "react"
import { ImageCustom } from "@components/atoms/image/Image"
import Jumbotron from "@components/molecules/Jumbotron"
import { IImageProps, IMAGES } from "@constants/images"
import { Box, SxProps, Theme } from "@mui/material"

interface IBecomeDeveloperContentProps {
  id: string
  image?: string
  sxCustomStyled?: SxProps<Theme>
  className?: string
  children?: React.ReactNode
}

const BecomeDeveloperContent = ({
  id,
  sxCustomStyled = {},
  className,
  image,
  children = (
    <Jumbotron
      detail="NAKAMOTO.GAMES"
      text="We take care of the infrastructure and distribution so you can focus on creating games. Publish your Web3 game now ⚡"
      textButton="Subscribe Now"
      className="w-[620px]"
      sxCustomStyled={{
        ".jumbotron-title--text": {
          display: "block"
        }
      }}
    />
  )
}: IBecomeDeveloperContentProps) => (
  <Box
    id={id}
    component="section"
    className={`container mx-auto ${className}`}
    sx={{ ...sxCustomStyled }}
  >
    <div className="become-developer__wrapper flex min-h-[500px] items-center justify-between gap-20">
      {image && (
        <div className="become-developer__image max-w-[50%] flex-1">
          <ImageCustom
            src={image}
            alt={IMAGES.becomeDeveloperSection1.alt}
            width={IMAGES.becomeDeveloperSection1.width}
            height={IMAGES.becomeDeveloperSection1.height}
          />
        </div>
      )}
      <div className="become-developer__content flex-1">{children}</div>
    </div>
  </Box>
)

export default BecomeDeveloperContent
