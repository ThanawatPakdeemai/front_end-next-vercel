import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { useRouter } from "next/router"
import React from "react"

const MarketplaceLayoutWithoutFilter = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const router = useRouter()

  return (
    <div
      className={
        router.asPath.includes("map")
          ? "map-layout overflow-x-hidden"
          : `main-container mx-auto`
      }
    >
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default MarketplaceLayoutWithoutFilter
