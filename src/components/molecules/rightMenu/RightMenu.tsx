import React from "react"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import RightMenuLogIn from "./RightMenuLogIn"
import RightMenuNotLogIn from "./RightMenuNotLogIn"

const RightMenu = () => {
  const profile = useProfileStore((state) => state.profile.data)
  return <Box>{profile ? <RightMenuLogIn /> : <RightMenuNotLogIn />}</Box>
}

export default RightMenu
