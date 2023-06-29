import React from "react"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import SignInModal from "@mobile/components/organisms/modal/SignInModal"
import { Box } from "@mui/material"
import IconTemplate from "@mobile/components/templates/IconTemplate"
import NakaIconMobile from "../icons/NakaIconMobile"

export const StyledAvatar = {
  color: "#E0E0E0",
  ".head-profile__info--avatar": {
    width: "48px",
    height: "48px",
    borderRadius: "48px",
    overflow: "hidden"
  },
  "p": {
    margin: 0
  }
}

const HeadProfileNoLoginMobile = () => {
  const { openSignIn, setOpenSignIn } = useDrawerControllerMobile()

  return (
    <header className="header bg-[#F32429] pb-[55px]">
      <div className="flex items-center justify-between px-5 py-10">
        <Box
          component="div"
          className="head-profile__info--wrapper flex items-center gap-4"
          sx={StyledAvatar}
        >
          <div className="head-profile__info--welcome flex flex-col">
            <div className="flex items-center gap-2 font-urbanist text-[14px]">
              <div className="flex h-[26px] w-[40px] items-center justify-center rounded-[6px] bg-[#121212] p-[10px]">
                <NakaIconMobile fill="#F32429" />
              </div>
              <span className="text-sm font-bold uppercase text-[#121212]">
                NAKAMOTO.Games
              </span>
            </div>
          </div>
        </Box>
        <div className="head-profile__mobile--right flex items-center gap-4">
          <IconTemplate
            sxCustomStyled={{
              width: "100px",
              height: "40px",
              background: "#20232B",
              boxShadow: "0 0 0 rgba(243, 36, 41, 0.25)",
              borderRadius: "60px",
              fontFamily: "Urbanist, Helvetica, Arial, sans-serif",
              fontWeight: "bold",
              color: "#fff",
              fontSize: "12px"
            }}
            onClick={() => setOpenSignIn(true)}
          >
            Login
          </IconTemplate>
        </div>
      </div>

      <SignInModal
        open={openSignIn}
        setOpenSignIn={setOpenSignIn}
      />
    </header>
  )
}

export default HeadProfileNoLoginMobile
