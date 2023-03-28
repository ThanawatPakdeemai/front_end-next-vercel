import { ToasterBox } from "@feature/toast/components"
import useGlobal from "@hooks/useGlobal"
import React, { memo } from "react"
import { NakaPriceProvider } from "./NakaPriceProvider"

function ProviderApp({ children }: { children: React.ReactNode }) {
  const { hydrated } = useGlobal()
  return hydrated ? (
    <>
      <ToasterBox />
      <NakaPriceProvider>{children}</NakaPriceProvider>
    </>
  ) : (
    <></>
  )
}

export default memo(ProviderApp)
