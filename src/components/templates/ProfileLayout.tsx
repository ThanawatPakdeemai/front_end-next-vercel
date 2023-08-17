/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import React from "react"
import dynamic from "next/dynamic"
import { PROFILE_CRUMB } from "@configs/crumb"
import { ICrumb } from "@interfaces/IMenu"

const Breadcrumb = dynamic(() => import("@components/molecules/Breadcrumb"))
const SidebarProfile = dynamic(
  () => import("@components/molecules/SidebarProfile")
)
const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})

interface IProp
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">> {
  _breadcrumb?: ICrumb[]
}

const ProfileLayout = ({ _breadcrumb, children }: IProp) => (
  <div className="main-container mx-auto px-2 lg:px-0">
    <Header />
    <div className="mx-auto mb-2 flex max-w-xs md:mx-0 md:mb-10 md:justify-start">
      <p />
      <Breadcrumb
        isCustom
        _breadcrumbs={_breadcrumb || PROFILE_CRUMB()}
      />
    </div>
    <div className="flex-row gap-[30px] md:flex">
      <SidebarProfile />
      {children}
    </div>
    <Footer />
  </div>
)

export default ProfileLayout
