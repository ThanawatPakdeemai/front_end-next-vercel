import { Box, SwipeableDrawer } from "@mui/material"
import dynamic from "next/dynamic"
import React from "react"

const SignInLayout = dynamic(
  () => import("@mobile/components/templates/SignInLayout"),
  {
    suspense: true,
    ssr: false
  }
)

interface ISignInMobileProps {
  open: boolean
  setOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

const SignInModal = ({ open, setOpenSignIn }: ISignInMobileProps) => (
  <SwipeableDrawer
    anchor="right"
    open={open}
    onClose={() => setOpenSignIn(false)}
    onOpen={() => setOpenSignIn(true)}
    disableSwipeToOpen={false}
    ModalProps={{
      keepMounted: true
    }}
    sx={{
      ".MuiDrawer-paper": {
        background: "#121212",
        width: "100%"
      }
    }}
  >
    <Box
      component="div"
      className="setting-list flex flex-col p-[8px_24px_36px]"
    >
      <SignInLayout />
    </Box>
  </SwipeableDrawer>
)
export default SignInModal
