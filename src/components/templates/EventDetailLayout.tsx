import React from "react"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"

const EventDetailLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <div className="main-container mx-auto px-2 lg:px-0">
    <Header />
    <div className="">{children}</div>
    <Footer />
  </div>
)

export default EventDetailLayout
