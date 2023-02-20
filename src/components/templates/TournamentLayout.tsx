import Banners from "@components/molecules/Banners"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

const TournamentLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto">
    <Header />
    <Banners />
    <div className="flex flex-row gap-3">{children}</div>
    <Footer />
  </div>
)

export default TournamentLayout
