import { Box } from "@mui/material"
import React from "react"
import useProfileStore from "@stores/profileStore"
import HeadProfileMobile from "../atoms/headerMenu/HeadProfileMobile"
import HeadGameMenuMobile, {
  IHeadGameMenuMobileProps
} from "../atoms/headerMenu/HeadGameMenuMobile"
import FooterMobile from "../organisms/FooterMobile"

interface IMainLayoutMobileProps extends IHeadGameMenuMobileProps {
  children: React.ReactNode
}

const MainLayoutMobile = ({ children, ...props }: IMainLayoutMobileProps) => {
  const profile = useProfileStore((state) => state.profile.data)

  return (
    <Box component="article">
      {profile ? (
        <HeadProfileMobile />
      ) : (
        <header className="header bg-[#F32429] pb-[55px]">
          <div className="flex items-center justify-between px-5 py-10" />
        </header>
      )}

      <Box
        component="div"
        className="home-page__mobile flex flex-col gap-6 pb-28"
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
        <HeadGameMenuMobile
          activeMenu={props.activeMenu}
          setActiveMenu={props.setActiveMenu}
        />
        {children}
      </Box>
      {/* Footer */}
      {profile && <FooterMobile />}
    </Box>
  )
}

export default MainLayoutMobile
