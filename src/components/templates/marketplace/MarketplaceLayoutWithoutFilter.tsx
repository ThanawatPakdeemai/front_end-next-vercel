import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { useRouter } from "next/router"
import React from "react"

const MarketplaceLayoutWithoutFilter = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const { asPath } = useRouter()
  const isMapPage = asPath.includes("map")

  return (
    <>
      <Header />
      <div
        className={
          isMapPage
            ? "page-full-map overflow-x-hidden"
            : "main-container mx-auto"
        }
      >
        {isMapPage ? (
          <div className="map-wrapper h-full w-full md:pt-[110px]">
            {children}
          </div>
        ) : (
          <>{children}</>
        )}
      </div>
      {!isMapPage && <Footer />}
    </>
  )
}

export default MarketplaceLayoutWithoutFilter
