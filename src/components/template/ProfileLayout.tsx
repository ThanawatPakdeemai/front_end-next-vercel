import Breadcrumb from "@components/molecules/Breadcrumb"
import SidebarProfile from "@components/molecules/SidebarProfile"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { PROFILE_CRUMB } from "@configs/crumb"
import React from "react"

const ProfileLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />
    <div className="mb-10 flex">
      <Breadcrumb
        isCustom
        _breadcrumbs={PROFILE_CRUMB}
      />
    </div>
    <div className="flex flex-row gap-3">
      <SidebarProfile />
      {children}
    </div>
    <Footer />
  </div>
)

export default ProfileLayout
