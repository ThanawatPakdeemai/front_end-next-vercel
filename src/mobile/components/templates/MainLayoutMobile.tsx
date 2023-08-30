import { Box } from "@mui/material"
import React from "react"
import useProfileStore from "@stores/profileStore"
import dynamic from "next/dynamic"

interface IMainLayoutMobileProps {
  children: React.ReactNode
}

const FooterMobile = dynamic(() => import("../organisms/FooterMobile"), {
  suspense: true,
  ssr: true
})

const HeadProfileNoLoginMobile = dynamic(
  () => import("../atoms/headerMenu/HeadProfileNoLoginMobile"),
  {
    suspense: true,
    ssr: true
  }
)

const HeadGameMenuMobile = dynamic(
  () => import("../atoms/headerMenu/HeadGameMenuMobile"),
  {
    suspense: true,
    ssr: true
  }
)

const HeadProfileMobile = dynamic(
  () => import("../atoms/headerMenu/HeadProfileMobile"),
  {
    suspense: true,
    ssr: true
  }
)

const OfflineIndicator = dynamic(
  () => import("@components/atoms/worker/OfflineIndicator"),
  {
    suspense: true,
    ssr: true
  }
)

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
      <OfflineIndicator />
    </Box>
  )
}

export default MainLayoutMobile
