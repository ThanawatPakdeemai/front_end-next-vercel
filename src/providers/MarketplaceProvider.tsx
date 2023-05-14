import useMarketContext from "@feature/marketplace/containers/hooks/useMarketContext"
import { createContext, ReactNode, useContext } from "react"

const MarketplaceContext = createContext<
  ReturnType<typeof useMarketContext> | undefined
>(undefined)

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const context = useMarketContext()
  return (
    <MarketplaceContext.Provider value={context}>
      {children}
    </MarketplaceContext.Provider>
  )
}

export function useMarketplaceProvider() {
  const context = useContext(MarketplaceContext)

  return { ...context }
}
