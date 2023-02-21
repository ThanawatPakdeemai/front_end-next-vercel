import Banners from "@components/molecules/Banners"
import SidebarServices from "@components/molecules/SidebarServices"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

const ServicesPageLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />
    <Banners />
    <div className="flex flex-row gap-3">
      <SidebarServices />
      {children}
    </div>
    <Footer />
  </div>
)

export default ServicesPageLayout
