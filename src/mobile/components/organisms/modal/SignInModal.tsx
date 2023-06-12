import SignInLayout from "@mobile/components/templates/SignInLayout"
import { Box, SwipeableDrawer } from "@mui/material"
import React from "react"

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
