import useGetCurrentPrice from "@feature/inventory/containers/hooks/useGetCurrentPrice"
import { ICurrentNakaData } from "@feature/inventory/interfaces/IInventoryService"
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"

interface NakaPriceContextType {
  price: ICurrentNakaData | undefined
  setPrice: React.Dispatch<React.SetStateAction<ICurrentNakaData | undefined>>
}

const NakaPriceContext = createContext<NakaPriceContextType | undefined>(
  undefined
)

export function NakaPriceProvider({ children }: { children: ReactNode }) {
  const [price, setPrice] = useState<ICurrentNakaData>()
  const { currentPrice, isLoadingCurrentPrice } = useGetCurrentPrice()
  // const isCancelled = React.useRef(false)

  /**
   * @description Set Naka Price to state
   */
  const fetchPrice = useCallback(() => {
    if (isLoadingCurrentPrice) return
    if (!isLoadingCurrentPrice && currentPrice !== undefined) {
      setPrice(currentPrice.data)
    }
  }, [isLoadingCurrentPrice, currentPrice, setPrice])

  useEffect(() => {
    // if (!isCancelled.current)
    let load = false
    if (!load) fetchPrice()

    return () => {
      // isCancelled.current = true
      load = true
    }
  }, [fetchPrice])

  const value = useMemo(
    () => ({
      price,
      setPrice
    }),
    [price]
  )

  return (
    <NakaPriceContext.Provider value={value}>
      {children}
    </NakaPriceContext.Provider>
  )
}

export function useNakaPriceProvider() {
  const context = useContext(NakaPriceContext)

  return { ...context }
}
