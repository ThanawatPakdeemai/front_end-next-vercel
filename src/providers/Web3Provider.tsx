import { useCreateWeb3Provider } from "@src/hooks/useWeb3Provider"
import { createContext, ReactNode, useContext } from "react"

const Web3Context = createContext<
  ReturnType<typeof useCreateWeb3Provider> | undefined
>(undefined)

export function Web3Provider({ children }: { children: ReactNode }) {
  const context = useCreateWeb3Provider()
  return <Web3Context.Provider value={context}>{children}</Web3Context.Provider>
}

export function useWeb3Provider() {
  const context = useContext(Web3Context)

  return { ...context }
}
