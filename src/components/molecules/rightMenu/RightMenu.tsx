import React from "react"
import { Box } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import CreateProfile from "@feature/profile/components/createProfile/CreateProfile"
import useGlobal from "@hooks/useGlobal"
import useRefreshProfile from "@hooks/useRefreshProfile"
import RightMenuLogIn from "./RightMenuLogIn"
import RightMenuNotLogIn from "./RightMenuNotLogIn"

const RightMenu = () => {
  const { profile } = useProfileStore()
  const { hydrated } = useGlobal()
  const { isTokenValid } = useRefreshProfile()

  return hydrated ? (
    <Box
      component="div"
      className="static right-2.5 top-2 order-2 mx-auto flex flex-1 justify-center md:mt-2 md:w-[360px] lg:mt-0 lg:justify-end xl:mx-0 xl:flex-none"
    >
      {!profile.data || !isTokenValid ? (
        <RightMenuNotLogIn />
      ) : (
        <>
          <CreateProfile />
          <RightMenuLogIn />
        </>
      )}
    </Box>
  ) : (
    <></>
  )
}

export default RightMenu
