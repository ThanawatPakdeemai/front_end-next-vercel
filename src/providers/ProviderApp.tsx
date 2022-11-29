import { ToasterBox } from "@features/toast/components"
import React, { memo, useEffect } from "react"
// import ModalProvider from "./ModalProvider"
import SocketProvider from "./SocketProvider"

function ProviderApp({ children }: { children: React.ReactNode }) {
  useEffect(() => {}, [])

  return (
    <>
      <SocketProvider>
        <ToasterBox />
        {/* <ModalProvider>{children}</ModalProvider> */}
        {children}
      </SocketProvider>
    </>
  )
}

export default memo(ProviderApp)
