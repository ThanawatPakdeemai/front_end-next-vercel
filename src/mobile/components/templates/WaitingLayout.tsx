import React, { ReactElement } from "react"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const WaitingRoomPage = dynamic(
  () => import("@src/mobile/features/pages/game/WaitingRoomPage"),
  {
    suspense: true,
    ssr: false
  }
)

const WaitingLayout = () => {
  const router = useRouter()

  return (
    <Box
      component="div"
      className="flex min-h-[100vh] flex-col bg-[#121212] p-[0_24px_24px]"
      sx={{
        "h2": {
          lineHeight: "1",
          alignItems: "flex-start"
        }
      }}
    >
      <h2 className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary">
        <i
          onClick={() => router.back()}
          aria-hidden="true"
        >
          <Icomoon className="icon-Full-Arrow-Left" />
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
