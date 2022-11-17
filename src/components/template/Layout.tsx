import React from "react"

type IProps = {
  hideNavbar?: boolean
  hideSidebar?: boolean
  hideFooter?: boolean
} & React.ComponentPropsWithoutRef<"div">

export default function Layout({
  hideNavbar,
  hideSidebar,
  hideFooter,
  children,
  className,
  ...props
}: React.PropsWithChildren<IProps>) {
  return (
    <div
      className={`${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
