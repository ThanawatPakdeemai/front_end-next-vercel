import { useMutation } from "@tanstack/react-query"
import { addReview } from "../services/review.services"

const useAddReview = () => {
  const {
    data: addReviewData,
    isLoading: isLoadingAddReview,
    isError: isErrorAddReview,
    error: errorAddReview,
    mutateAsync: mutateAddReview
  } = useMutation(addReview, {
    mutationKey: ["addReview"],
    retry: false
  })

  return {
    addReviewData,
    isLoadingAddReview,
    isErrorAddReview,
    errorAddReview,
    mutateAddReview
  }
}

export default useAddReview
