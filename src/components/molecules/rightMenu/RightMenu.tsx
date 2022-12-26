import React from "react"
import { Box } from "@mui/material"
import RightMenuLogIn from "./RightMenuLogIn"
import RightMenuNotLogIn from "./RightMenuNotLogIn"

const RightMenu = () => {
  const profile = false

  return <Box>{profile ? <RightMenuLogIn /> : <RightMenuNotLogIn />}</Box>
}

export default RightMenu
