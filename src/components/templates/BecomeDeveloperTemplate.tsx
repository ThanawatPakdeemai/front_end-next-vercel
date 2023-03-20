import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

const BecomeDeveloperTemplate = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => (
  <>
    <div className="fixed left-0 top-0 z-10 w-full">
      <div className="container mx-auto">
        <Header />
      </div>
    </div>
    {children}
    <div className="container mx-auto">
      <Footer />
    </div>
  </>
)

export default BecomeDeveloperTemplate
