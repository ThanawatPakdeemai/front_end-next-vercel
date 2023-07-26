import useGetBalanceItem from "@feature/inventory/containers/hooks/useGetBalanceItem"

import { createContext, ReactNode, useContext } from "react"

const BalanceOfContext = createContext<
  ReturnType<typeof useGetBalanceItem> | undefined
>(undefined)

export function BalanceOfProvider({ children }: { children: ReactNode }) {
  const context = useGetBalanceItem()
  return (
    <BalanceOfContext.Provider value={context}>
      {children}
    </BalanceOfContext.Provider>
  )
}

export function useBalanceOfProvider() {
  const context = useContext(BalanceOfContext)

  return { ...context }
}
