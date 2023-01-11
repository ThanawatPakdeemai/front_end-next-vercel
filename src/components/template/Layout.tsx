import Banner from "@components/molecules/Banner"
import Howto from "@components/molecules/HowToPlay"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { GAME_DETAILS_BANNER } from "@constants/gameBanner"
import React from "react"

export default function Layout({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) {
  return (
    <div className="main-container mx-auto">
      <Header />
      <Howto
        title=""
        details=""
      />
      <Banner data={GAME_DETAILS_BANNER} />
      {children}
      <Footer />
    </div>
  )
}
