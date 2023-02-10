import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState
} from "react"

interface ITabContext {
  tabValue: string
  setTabValue: React.Dispatch<React.SetStateAction<string>>
}
export const TabContext = createContext<ITabContext>({
  tabValue: "",
  setTabValue: () => {}
})

TabContext.displayName = "TabContext"

export function TabProvider({ children }: PropsWithChildren) {
  const [tabValue, setTabValue] = useState("1")

  const tabContent = useMemo(
    () => ({
      tabValue,
      setTabValue
    }),
    [tabValue]
  )

  return (
    <TabContext.Provider value={tabContent}>{children}</TabContext.Provider>
  )
}
