import React from "react"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"

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
