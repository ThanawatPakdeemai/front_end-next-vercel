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
  // username?: string
  // firstname?: string
}

interface IContext {
  paramFromTelegram: IParamFromTelegram
  setParamFromTelegram: React.Dispatch<React.SetStateAction<IParamFromTelegram>>
}
interface IProp {
  children: React.ReactNode
}

const BaseContext = createContext<IContext>({
  paramFromTelegram: {
    user_id: "",
    score: 0
  },
  setParamFromTelegram: () => {}
})
BaseContext.displayName = "BaseContext"

function BaseProvider({ children }: IProp) {
  const [paramFromTelegram, setParamFromTelegram] =
    useState<IParamFromTelegram>({} as IParamFromTelegram)
  const router = useRouter()
  const { redirect } = router.query

  /**
   * @description Check redirect from telegram
   */
  const checkRedirectFromTelegram = useCallback(() => {
    // username=kakunin_kuda&user_id=2089459423&firstname=Uranus
    if (redirect === undefined) return
    const decodedText = Helper.decryptWithBuffer(redirect.toString())

    // Split the query string by '&'
    const queryParams = decodedText.split("&")

    // Initialize variables to store the values
    let score: number = 0
    let user_id: string = ""
    // let username: string = ""
    // let firstname: string = ""

    // Iterate over the query parameters and extract the values
    queryParams.forEach((param) => {
      const [key, value] = param.split("=")

      if (key === "score") {
        score = Number(value)
      } else if (key === "user_id") {
        user_id = value
      } /* else if (key === "username") {
        username = value
      } else if (key === "firstname") {
        firstname = value
      } */
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
      setParamFromTelegram
    }),
    [paramFromTelegram, setParamFromTelegram]
  )

  return (
    <BaseContext.Provider value={contextBase}>{children}</BaseContext.Provider>
  )
}

export const useBaseProvider = () => useContext(BaseContext)
export default BaseProvider
