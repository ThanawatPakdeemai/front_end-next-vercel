import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import MarketplaceLayoutMobile from "@feature/page/marketplace/mobilescreen/MarketplaceLayoutMobile"
import { MarketplaceProvider } from "@providers/MarketplaceProvider"
import { useRouter } from "next/router"
import React from "react"

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
    </MarketplaceProvider>
  )
}

export default MarketplaceLayoutWithoutFilter
