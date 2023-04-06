import Video from "@components/atoms/Video"
import { IVideoProps } from "@constants/video"
import { Box, SxProps, Theme } from "@mui/material"
import React from "react"

interface IHeroSectionProps extends IVideoProps {
  hasVideo?: boolean
  children?: React.ReactNode
  className?: string
  sxCustomStyled?: SxProps<Theme>
}

const HeroSection = ({
  hasVideo,
  children,
  className,
  sxCustomStyled = {},
  ...props
}: IHeroSectionProps) => (
  <Box
    component="section"
    className="hero-section__wrapper relative flex h-screen min-h-[700px] w-full items-center justify-center"
    sx={{
      "&::before": {
        content: "''",
        background:
          "linear-gradient(180deg, rgba(1, 1, 1, 0.1) 0%, rgba(1, 1, 1, 0) 100%)",
        width: "100%",
        height: "50%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1
      },
      "&::after": {
        content: "''",
        background:
          "linear-gradient(180deg, rgba(1, 1, 1, 0.1) 0%, rgba(1, 1, 1, 0) 100%)",
        transform: "rotate(-180deg)",
        width: "100%",
        height: "50%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 1
      },
      ...sxCustomStyled
    }}
  >
    {hasVideo && (
      <Video
        src={props.src}
        poster={props.poster}
        controls={false}
        autoPlay
        className="absolute top-0 h-full w-full object-cover"
      />
    )}
    <div
      className={`absolute left-0 top-0 z-[2] flex h-full w-full items-center justify-center px-6 ${className}`}
    >
      <div className="container mx-auto">
        <Box className="relative">{children}</Box>
      </div>
    </div>
  </Box>
)

export default HeroSection
