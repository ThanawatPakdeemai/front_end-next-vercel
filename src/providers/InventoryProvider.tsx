import useInventoryContext from "@feature/inventory/containers/hooks/useInventoryContext"
import { createContext, ReactNode, useContext } from "react"

const InventoryContext = createContext<
  ReturnType<typeof useInventoryContext> | undefined
>(undefined)

export function InventoryProvider({ children }: { children: ReactNode }) {
  const context = useInventoryContext()
  return (
    <InventoryContext.Provider value={context}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventoryProvider() {
  const context = useContext(InventoryContext)

  return { ...context }
}
