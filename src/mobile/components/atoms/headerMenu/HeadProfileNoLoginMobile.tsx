import React from "react"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import { Box } from "@mui/material"
import { StyledAvatar } from "@mobile/styles/muiStyleMobile"
import dynamic from "next/dynamic"

const SignInModal = dynamic(
  () => import("@mobile/components/organisms/modal/SignInModal"),
  {
    suspense: true,
    ssr: false
  }
)

const IconTemplate = dynamic(
  () => import("@mobile/components/templates/IconTemplate"),
  {
    suspense: true,
    ssr: false
  }
)

const NakaIconMobile = dynamic(() => import("../icons/NakaIconMobile"), {
  suspense: true,
  ssr: false
})

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
