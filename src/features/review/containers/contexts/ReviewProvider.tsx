import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState
} from "react"

interface IReviewContext {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setRate: React.Dispatch<React.SetStateAction<number>>
  rate: number
}
export const ReviewContext = createContext<IReviewContext>({
  message: "",
  setMessage: () => {},
  rate: 0,
  setRate: () => {}
})

ReviewContext.displayName = "ReviewContext"

export function ReviewProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string>("")
  const [rate, setRate] = useState<number>(0)

  const reviewMessage = useMemo(
    () => ({
      rate,
      setRate,
      message,
      setMessage
    }),
    [rate, message]
  )

  return (
    <ReviewContext.Provider value={reviewMessage}>
      {children}
    </ReviewContext.Provider>
  )
}
