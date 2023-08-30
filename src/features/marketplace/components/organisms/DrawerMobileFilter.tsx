import React from "react"
import { Global } from "@emotion/react"
import { styled } from "@mui/material/styles"
import { grey } from "@mui/material/colors"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"

const FilterBox = dynamic(() => import("../molecules/FilterBox"), {
  suspense: true,
  ssr: false
})

const drawerBleeding = 56

interface IProp {
  open: boolean
  setClose: (_toggle) => void
}

const Puller = styled(Box)(() => ({
  width: 30,
  height: 6,
  backgroundColor: grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  background: grey[900]
}))

export default function SwipeableEdgeDrawer({ open, setClose }: IProp) {
  return (
    <div className="block sm:hidden">
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(70% - ${drawerBleeding}px)`,
            overflow: "visible",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: "#010101",
            background: "#010101"
          }
        }}
      />

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setClose(false)}
        onOpen={() => {}}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className="mt-[33px]	grid w-full	justify-items-center overflow-y-auto">
          <Puller />
          <FilterBox />
        </div>
      </SwipeableDrawer>
    </div>
  )
}
