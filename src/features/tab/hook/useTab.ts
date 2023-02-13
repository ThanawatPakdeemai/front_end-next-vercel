import useTabContext from "../contexts/useTabContext"

const useTab = () => {
  const { tabValue, setTabValue } = useTabContext()
  /**
   * @description Handle change tab
   * @param newValue
   */
  const handleChangeTab = (newValue: string) => {
    setTabValue(newValue)
  }

  return {
    tabValue,
    setTabValue,
    handleChangeTab
  }
}

export default useTab
