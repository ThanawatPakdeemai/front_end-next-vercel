import React from "react"
import Breadcrumb from "@components/molecules/Breadcrumb"
import SidebarProfile from "@components/molecules/SidebarProfile"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { PROFILE_CRUMB } from "@configs/crumb"
import { ICrumb } from "@interfaces/IMenu"

interface IProp
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">> {
  _breadcrumb?: ICrumb[]
}

const ProfileLayout = ({ _breadcrumb, children }: IProp) => (
  <div className="main-container mx-auto justify-between">
    <Header />
    <div className="mb-10 flex">
      <p />
      <Breadcrumb
        isCustom
        _breadcrumbs={_breadcrumb || PROFILE_CRUMB()}
      />
    </div>
    <div className="flex-row gap-3 md:flex">
      <SidebarProfile />
      {children}
    </div>
    <Footer />
  </div>
)

export default ProfileLayout
