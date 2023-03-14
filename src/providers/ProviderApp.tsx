import { ToasterBox } from "@feature/toast/components"
import React, { memo, useEffect } from "react"
import { NakaPriceProvider } from "./NakaPriceProvider"
// import ModalProvider from "./ModalProvider"
// import SocketProvider from "./SocketProvider"

function ProviderApp({ children }: { children: React.ReactNode }) {
  useEffect(() => {}, [])

  return (
    <>
      {/* <SocketProvider> */}
      <ToasterBox />
      {/* <ModalProvider>{children}</ModalProvider> */}
      <NakaPriceProvider>{children}</NakaPriceProvider>
      {/* </SocketProvider> */}
    </>
  )
}

export default memo(ProviderApp)
