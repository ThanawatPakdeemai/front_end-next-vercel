import { Box } from "@mui/material"
import React from "react"
import { useRouter } from "next/router"
import ArrowBackIcon from "../atoms/icons/ArrowBackIcon"

interface IGamePageDefaultMobileProps {
  component: React.ReactNode
}

const GamePageDefaultMobile = ({ component }: IGamePageDefaultMobileProps) => {
  const router = useRouter()

  return (
    <Box
      component="div"
      className="flex flex-col bg-[#121212] p-[0_24px_24px]"
    >
      <h2
        className="flex items-center justify-between gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
        onClick={() => router.back()}
        aria-hidden="true"
      >
        <ArrowBackIcon />
      </h2>
      {component}
    </Box>
  )
}
export default GamePageDefaultMobile
