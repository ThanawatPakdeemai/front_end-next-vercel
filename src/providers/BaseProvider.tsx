import { IGameCategory } from "@feature/dropdown/interfaces/IDropdownService"
import { IGetType } from "@feature/game/interfaces/IGameService"
import { ELocalKey } from "@interfaces/ILocal"
import Helper from "@utils/helper"
import { useRouter } from "next/router"
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"

export interface IParamFromTelegram {
  user_id: string
  score?: number
}

export const defaultCategory: IGameCategory = {
  id: "all",
  name: "Categories",
  slug: "all",
  color_code: "#000000",
  image_list: "",
  image_banner: "",
  is_active: true,
  createdAt: "",
  updatedAt: "",
  detail: "",
  _id: "all"
}

interface IContext {
  paramFromTelegram: IParamFromTelegram
  setParamFromTelegram: React.Dispatch<React.SetStateAction<IParamFromTelegram>>
  activeMenu: IGetType
  setActiveMenu: React.Dispatch<React.SetStateAction<IGetType>>
  selectedCategory: IGameCategory
  setSelectedCategory: React.Dispatch<React.SetStateAction<IGameCategory>>
}
interface IProp {
  children: React.ReactNode
}

const BaseContext = createContext<IContext>({
  paramFromTelegram: {
    user_id: "",
    score: 0
  },
  setParamFromTelegram: () => {},
  activeMenu: "free-to-play",
  setActiveMenu: () => {},
  selectedCategory: {} as IGameCategory,
  setSelectedCategory: () => {}
})
BaseContext.displayName = "BaseContext"

function BaseProvider({ children }: IProp) {
  const [activeMenu, setActiveMenu] = useState<IGetType>("free-to-play")
  const [selectedCategory, setSelectedCategory] =
    useState<IGameCategory>(defaultCategory)

  const [paramFromTelegram, setParamFromTelegram] =
    useState<IParamFromTelegram>({} as IParamFromTelegram)
  const router = useRouter()
  const { redirect } = router.query

  /**
   * @description Check redirect from telegram
   */
  const checkRedirectFromTelegram = useCallback(() => {
    if (redirect === undefined) return
    const decodedText = Helper.decryptWithBuffer(redirect.toString())

    // Split the query string by '&'
    const queryParams = decodedText.split("&")

    // Initialize variables to store the values
    let score: number = 0
    let user_id: string = ""

    // Iterate over the query parameters and extract the values
    queryParams.forEach((param) => {
      const [key, value] = param.split("=")

      if (key === "score") {
        score = Number(value)
      } else if (key === "user_id") {
        user_id = value
      }
    })

    // Set param to localStorage
    Helper.setLocalStorage({
      key: ELocalKey.telegramId,
      value: user_id
    })

    setParamFromTelegram({
      user_id,
      score
    } as IParamFromTelegram)
  }, [setParamFromTelegram, redirect])

  useEffect(() => {
    let cancel = false
    if (!cancel) {
      checkRedirectFromTelegram()
    }
    return () => {
      cancel = true
    }
  }, [checkRedirectFromTelegram])

  const contextBase: IContext = useMemo(
    () => ({
      paramFromTelegram,
      setParamFromTelegram,
      activeMenu,
      setActiveMenu,
      selectedCategory,
      setSelectedCategory
    }),
    [
      paramFromTelegram,
      setParamFromTelegram,
      activeMenu,
      setActiveMenu,
      selectedCategory,
      setSelectedCategory
    ]
  )

  return (
    <BaseContext.Provider value={contextBase}>{children}</BaseContext.Provider>
  )
}

export const useBaseProvider = () => useContext(BaseContext)
export default BaseProvider
