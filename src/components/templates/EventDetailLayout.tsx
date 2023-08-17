import React from "react"
import dynamic from "next/dynamic"
import { ICrumb } from "@interfaces/IMenu"

const Banners = dynamic(() => import("@components/molecules/Banners"), {
  suspense: true,
  ssr: false
})
const BannerSingle = dynamic(
  () => import("@components/molecules/BannerSingle"),
  {
    suspense: true,
    ssr: false
  }
)
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})
const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})

const Breadcrumb = dynamic(() => import("@components/molecules/Breadcrumb"), {
  suspense: true,
  ssr: false
})

interface IEventDetailLayoutProps {
  bannerImage?: string
  bannerAlt?: string
  breadcrumbs?: ICrumb[]
  component: React.ReactNode
  component2?: React.ReactNode
  component3?: React.ReactNode
  // Add more components here
}

const EventDetailLayout = ({
  bannerImage,
  bannerAlt = "",
  breadcrumbs,
  component,
  component2,
  component3
}: IEventDetailLayoutProps) => (
  <div className="main-container mx-auto w-full px-2 lg:px-0">
    <Header />
    {bannerImage ? (
      <BannerSingle
        src={bannerImage}
        alt={bannerAlt}
      />
    ) : (
      // eslint-disable-next-line react/jsx-no-undef
      <Banners />
    )}

    {breadcrumbs && breadcrumbs.length > 0 && (
      <Breadcrumb
        className="mb-4"
        isCustom
        _breadcrumbs={breadcrumbs}
      />
    )}
    {component}
    {/**
     * @description In case there is a need to add another component
     */}
    {component2 && <div className="mt-12">{component2}</div>}
    {component3 && <div className="mt-12">{component3}</div>}
    <Footer />
  </div>
)
export default EventDetailLayout
