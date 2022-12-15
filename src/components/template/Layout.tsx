import React from "react"
import FooterBar from "@components/organisms/FooterBar"
import HeaderBar from "@components/organisms/HeaderBar"

export default function Layout({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) {
  return (
    <div className="main-container mx-auto">
      <HeaderBar />
      {children}
      <FooterBar />
    </div>
  )
}
