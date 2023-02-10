import { useContext } from "react"
import { TabContext } from "./TabProvider"

function useTabContext() {
  const context = useContext(TabContext)

  return context
}

export default useTabContext
