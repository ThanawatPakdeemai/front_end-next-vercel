import React from "react"
/* still have import Uppercase&Lowercase problem */
import Footer from "@components/organisms/footer"
import Header from "@components/organisms/header"

export default function Layout({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) {
  return (
    <div className="main-container mx-auto">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
