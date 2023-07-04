import useReviewContext from "@feature/review/containers/hook/useReviewContext"
import { createContext, ReactNode, useContext } from "react"

const ReviewContext = createContext<
  ReturnType<typeof useReviewContext> | undefined
>(undefined)

export function ReviewProvider({
  children,
  gameId
}: {
  children: ReactNode
  gameId: string
}) {
  const context = useReviewContext(gameId)
  return (
    <ReviewContext.Provider value={context}>{children}</ReviewContext.Provider>
  )
}

export function useReviewProvider() {
  const context = useContext(ReviewContext)

  return { ...context }
}
