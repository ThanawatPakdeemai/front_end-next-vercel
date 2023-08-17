import React from "react"
import dynamic from "next/dynamic"

const Banners = dynamic(() => import("@components/molecules/Banners"), {
  suspense: true,
  ssr: false
})
const SidebarServices = dynamic(
  () => import("@components/molecules/SidebarServices"),
  {
    suspense: true,
    ssr: false
  }
)
const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})

const ServicesPageLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto px-2 lg:px-0">
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
