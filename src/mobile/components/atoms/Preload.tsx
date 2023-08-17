import React, { memo } from "react"
import { Box, keyframes } from "@mui/material"
import dynamic from "next/dynamic"

const NakaPreload = dynamic(() => import("@components/atoms/svg/NakaPreload"), {
  suspense: true,
  ssr: false
})

interface IPreloadProps {
  open: boolean
}

const fadeIn = keyframes`
  0% {
    fill: #F32429;
  }
  50% {
    fill: #ffffff;
  }
  100% {
    fill: #F32429;
  }
`

const Preload = ({ open }: IPreloadProps) => (
  <Box
    component="div"
    className={`duration-300" fixed flex h-[100vh] w-full flex-col items-center justify-center bg-[#121212] pb-[10%] transition-all ${
      open ? "z-[100] opacity-100" : "z-[-1] opacity-0"
    } `}
    sx={{
      ".logo-naka path": {
        animation: `${fadeIn} 1.75s linear infinite`
      }
    }}
  >
    <div className="flex w-[200px] items-center">
      <NakaPreload className="logo-naka" />
    </div>
  </Box>
)
export default memo(Preload)
