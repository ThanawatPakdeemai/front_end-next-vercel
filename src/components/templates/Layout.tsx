import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

export default function Layout({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) {
  return (
    <div className="main-container mx-auto px-2 lg:px-0">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
