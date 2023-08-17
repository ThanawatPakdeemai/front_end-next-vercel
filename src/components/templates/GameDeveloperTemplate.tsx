import React from "react"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})

const GameDeveloperTemplate = ({
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

export default GameDeveloperTemplate
