import { ImageCustom } from "@components/atoms/image/Image"
import Jumbotron from "@components/molecules/Jumbotron"
import { IImageProps } from "@constants/images"
import { Box, SxProps, Theme } from "@mui/material"
import React from "react"

interface IBecomeDeveloperContentProps {
  id: string
  image?: IImageProps
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
      textTitle="Makamoto.games"
      textTitleDark="For Game DEVELOPER_"
      text="We take care about all the distribution infrastructure so you can care about's next. Publish your web3 game in seconds ⚡"
      textButton="Submit Now"
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
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </div>
      )}
      <div className="become-developer__content flex-1">{children}</div>
    </div>
  </Box>
)

export default BecomeDeveloperContent
