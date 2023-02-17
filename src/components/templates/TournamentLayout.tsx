import Banner from "@components/molecules/Banner"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { IBanner, TOURNAMENT_BANNER } from "@constants/servicesBanner"
import React from "react"

interface IProp
  extends React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">> {
  banner?: IBanner[]
}

const TournamentLayout = ({ banner = TOURNAMENT_BANNER, children }: IProp) => (
  <div className="main-container mx-auto">
    <Header />
    <Banner data={banner} />
    <div className="flex flex-row gap-3">{children}</div>
    <Footer />
  </div>
)

export default TournamentLayout
