import React, { useEffect } from "react"
import { Global } from "@emotion/react"
import { styled } from "@mui/material/styles"
import { grey } from "@mui/material/colors"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import { Box } from "@mui/material"
import FilterBox from "../molecules/FilterBox"

const drawerBleeding = 56

interface IProp {
  open: boolean
  window?: () => Window
}

// const styleButton = {
//   minWidth: "10px !important",
//   borderRadius: "8px !important",
//   "&:hover": {
//     boxShadow: "none !important",
//     "svg rect": {
//       fill: "#E1E2E2 !important"
//     }
//   }
// }

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)"
}))

export default function SwipeableEdgeDrawer({ open }: IProp) {
  const [opened, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(open)
  }, [open])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <div>
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

      {/* <Button
        sx={styleButton}
        onClick={() => {
          setOpen(true)
        }}
        className="!h-[40px] !w-[40px] !rounded-lg border border-neutral-700 bg-neutral-800 p-2"
      >
        <SettingIconFilter />
      </Button> */}
      <SwipeableDrawer
        // container={container}
        anchor="bottom"
        open={opened}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
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
