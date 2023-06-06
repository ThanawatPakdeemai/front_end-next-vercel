import React, { ReactElement } from "react"
import WaitingRoomPage from "@src/mobile/features/pages/game/WaitingRoomPage"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import ArrowBackIcon from "../atoms/icons/ArrowBackIcon"

const WaitingLayout = () => {
  const router = useRouter()

  return (
    <Box
      component="div"
      className="flex min-h-[100vh] flex-col bg-[#121212] p-[0_24px_24px]"
    >
      <h2 className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary">
        <i
          onClick={() => router.back()}
          aria-hidden="true"
        >
          <ArrowBackIcon />
        </i>
        Waiting Room
      </h2>
      <Box
        component="section"
        className="game-section flex flex-col gap-6 font-urbanist text-white-primary"
      >
        <WaitingRoomPage />
      </Box>
    </Box>
  )
}

WaitingLayout.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default WaitingLayout
