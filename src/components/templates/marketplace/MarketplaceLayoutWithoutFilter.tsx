import { useRouter } from "next/router"
import React from "react"
import dynamic from "next/dynamic"
import { MarketplaceProvider } from "@providers/MarketplaceProvider"

const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})
const MarketplaceLayoutMobile = dynamic(
  () => import("@feature/page/marketplace/mobilescreen/MarketplaceLayoutMobile")
)

interface IProp {
  isNoFilter?: boolean
}

const MarketplaceLayoutWithoutFilter = ({
  isNoFilter = true,
  children
}: IProp & React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const { asPath } = useRouter()
  const isMapPage = asPath.includes("map")

  return (
    <MarketplaceProvider>
      <div className="main-container mx-auto">
        <div className="hidden sm:block">
          <Header />
        </div>
        <div className="block sm:hidden">
          <MarketplaceLayoutMobile isNoFilter={isNoFilter} />
        </div>
        <div
          className={
            isMapPage
              ? "page-full-map h-[85vh] overflow-x-hidden"
              : "main-container mx-auto"
          }
        >
          {isMapPage ? (
            <div className="map-wrapper h-full w-full">{children}</div>
          ) : (
            <div className="max-w-[1368px]">{children}</div>
          )}
        </div>
        {!isMapPage && <Footer />}
      </div>
    </MarketplaceProvider>
  )
}

export default MarketplaceLayoutWithoutFilter
