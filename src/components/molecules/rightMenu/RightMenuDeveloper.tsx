import React, { useEffect, useState } from "react"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import useNotiStore from "@stores/notification"
import Helper from "@utils/helper"
import jwt_decode from "jwt-decode"
import { Box } from "@mui/material"
import ButtonLink from "@components/atoms/button/ButtonLink"
import EastRoundedIcon from "@mui/icons-material/EastRounded"
import RightMenuNotLogInTemplate from "@components/templates/contents/RightMenuNotLogInTemplate"
import CreateProfile from "@feature/profile/components/createProfile/CreateProfile"
import RightMenuLogIn from "./RightMenuLogIn"

const RightMenuDeveloper = () => {
  const { onReset, profile } = useProfileStore()
  const { onResetNotification } = useNotiStore()
  const { hydrated } = useGlobal()
  const [isTokenValid, setIsTokenValid] = useState(false)
  const token = Helper.getTokenFromLocal()
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    // Retrieve the token from local storage
    let load = false

    if (!load) {
      if (token) {
        // Decode the token to obtain the expiration time
        const { exp }: any = jwt_decode(token)
        // Compare the expiration time with the current time
        if (Date.now() < exp * 1000) {
          setIsTokenValid(true)
        } else {
          // If the token has expired, remove it from local storage
          setIsTokenValid(false)
          onResetNotification() // remove notification zustand
          onReset() // remove profile zustand
        }
      }

      if (profile.data) {
        handleClose()
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, profile])

  return hydrated ? (
    <RightMenuNotLogInTemplate
      open={open}
      handleClose={handleClose}
    >
      <Box
        component="div"
        className="right-menu-developer flex items-center justify-end gap-4"
      >
        <ButtonLink
          href="/joinus"
          text="Submit Game"
          icon={<></>}
          size="large"
          color="success"
          variant="outlined"
          className="button-link--success group !h-10 w-auto !min-w-0 !border-green-lemon !p-[15px_25px_13px] text-sm !text-green-lemon"
          sxCustomStyled={{
            ".MuiSvgIcon-root": {
              fontSize: "20px!important"
            }
          }}
        />
        {!profile.data || !isTokenValid ? (
          <ButtonLink
            onClick={handleOpen}
            text="Log in"
            icon={<EastRoundedIcon />}
            size="large"
            color="success"
            variant="contained"
            className="button-link--success group !h-10 w-auto !min-w-0 !bg-green-lemon !p-[15px_25px_13px] text-sm text-neutral-780"
            sxCustomStyled={{
              ".MuiSvgIcon-root": {
                fontSize: "20px!important"
              }
            }}
          />
        ) : (
          <>
            <CreateProfile />
            <RightMenuLogIn />
          </>
        )}
      </Box>
    </RightMenuNotLogInTemplate>
  ) : (
    <></>
  )
}

export default RightMenuDeveloper
