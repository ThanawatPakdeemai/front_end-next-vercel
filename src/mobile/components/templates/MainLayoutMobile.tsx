import { Box } from "@mui/material"
import React from "react"
import useProfileStore from "@stores/profileStore"
import HeadProfileMobile from "../atoms/headerMenu/HeadProfileMobile"
import FooterMobile from "../organisms/FooterMobile"
import HeadGameMenuMobile from "../atoms/headerMenu/HeadGameMenuMobile"
import HeadProfileNoLoginMobile from "../atoms/headerMenu/HeadProfileNoLoginMobile"

interface IMainLayoutMobileProps {
  children: React.ReactNode
}

const MainLayoutMobile = ({ children }: IMainLayoutMobileProps) => {
  const profile = useProfileStore((state) => state.profile.data)

  return (
    <Box component="article">
      {profile ? <HeadProfileMobile /> : <HeadProfileNoLoginMobile />}

      <Box
        component="div"
        className="home-page__mobile relative z-[2] flex flex-col gap-6 pb-28"
        sx={{
          marginTop: "-50px",
          position: "relative",
          width: "100%",
          minHeight: "calc(100vh - 120px)",
          padding: "32px",
          background: "#181A20",
          borderRadius: "30px 30px 0 0"
        }}
      >
        {/* Header */}
        <HeadGameMenuMobile />
        {children}
      </Box>
      {/* Footer */}
      {profile && <FooterMobile />}
    </Box>
  )
}

export default MainLayoutMobile
