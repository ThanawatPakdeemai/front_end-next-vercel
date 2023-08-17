import React from "react"
import _ from "lodash"
import { Box, styled } from "@mui/material"
import dynamic from "next/dynamic"
import { IMAGES } from "@constants/images"

const IcomoonSticker = dynamic(
  () => import("@components/atoms/icomoon/IcomoonSticker"),
  {
    suspense: true,
    ssr: false
  }
)

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})

const KeyFramesClockwise = styled("div")({
  "@keyframes rotation": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(359deg)"
    }
  },
  animation: "rotation 10s infinite linear"
})

const KeyFramesAnticlockwise = styled("div")({
  "@keyframes rotation": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(359deg)"
    }
  },
  animation: "rotation 10s infinite linear"
})

const CircleSphereAnimation = () => (
  <Box
    component="div"
    className="relative flex  h-[100px] justify-end lg:h-auto"
  >
    <div className="absolute">
      <KeyFramesClockwise>
        <Image
          src={IMAGES.ro.src}
          alt={IMAGES.ro.alt}
          className="h-full w-full"
        />
      </KeyFramesClockwise>
    </div>
    <div className="absolute">
      <KeyFramesAnticlockwise>
        <IcomoonSticker className="icon-Circle-sphere-pink" />
      </KeyFramesAnticlockwise>
    </div>
  </Box>
)

export default CircleSphereAnimation
