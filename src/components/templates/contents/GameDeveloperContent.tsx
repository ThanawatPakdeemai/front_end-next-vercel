import React from "react"
import { Box, SxProps, Theme } from "@mui/material"
import dynamic from "next/dynamic"
import { IMAGES } from "@constants/images"

const ImageCustom = dynamic(
  () => import("@components/atoms/image/Image").then((mod) => mod.ImageCustom),
  {
    suspense: true,
    ssr: false
  }
)
const Jumbotron = dynamic(() => import("@components/molecules/Jumbotron"), {
  suspense: true,
  ssr: false
})

interface IGameDeveloperContentProps {
  id: string
  image?: string
  sxCustomStyled?: SxProps<Theme>
  className?: string
  children?: React.ReactNode
}

const GameDeveloperContent = ({
  id,
  sxCustomStyled = {},
  className,
  image,
  children = (
    <Jumbotron
      detail="NAKAMOTO.GAMES"
      text="We take care of the infrastructure and distribution so you can focus on creating games. Publish your Web3 game now ⚡"
      textButton="Submit Game"
      className="w-[620px]"
      sxCustomStyled={{
        ".jumbotron-title--text": {
          display: "block"
        }
      }}
    />
  )
}: IGameDeveloperContentProps) => (
  <Box
    id={id}
    component="section"
    className={`container mx-auto ${className}`}
    sx={{ ...sxCustomStyled }}
  >
    <div className="game-developer__wrapper flex min-h-[500px] items-center justify-between gap-20">
      {image && (
        <div className="game-developer__image max-w-[50%] flex-1">
          <ImageCustom
            src={image}
            alt={IMAGES.gameDeveloperSection1.alt}
            width={IMAGES.gameDeveloperSection1.width}
            height={IMAGES.gameDeveloperSection1.height}
          />
        </div>
      )}
      <div className="game-developer__content flex-1">{children}</div>
    </div>
  </Box>
)

export default GameDeveloperContent
