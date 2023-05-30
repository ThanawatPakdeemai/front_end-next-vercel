import { Box } from "@mui/material"
import React from "react"
import HeadProfileMobile from "../atoms/headerMenu/HeadProfileMobile"
import HeadGameMenuMobile, {
  IHeadGameMenuMobileProps
} from "../atoms/headerMenu/HeadGameMenuMobile"
import FooterMobile from "../organisms/FooterMobile"

interface IMainLayoutMobileProps extends IHeadGameMenuMobileProps {
  children: React.ReactNode
}

const MainLayoutMobile = ({ children, ...props }: IMainLayoutMobileProps) => (
  <Box component="article">
    <HeadProfileMobile />
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
    <FooterMobile />
  </Box>
)

export default MainLayoutMobile
