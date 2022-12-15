import React from "react"
import Header from "@components/organisms/Header"
import Footer from "@components/organisms/Footer"

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
