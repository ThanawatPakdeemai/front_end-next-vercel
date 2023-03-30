import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import React from "react"

export default function Layout({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) {
  return (
    <div className="main-container mx-auto w-full px-2 ">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
