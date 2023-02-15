import { useContext } from "react"
import { ReviewContext } from "./ReviewProvider"

function useReviewContext() {
  const context = useContext(ReviewContext)

  return context
}

export default useReviewContext
