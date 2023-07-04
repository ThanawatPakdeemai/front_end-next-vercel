import { useMutation } from "@tanstack/react-query"
import {
  addReview,
  deleteReview,
  getCheckedPlayerReview,
  updateReview
} from "@feature/review/containers/services/review.services"

const useMutateReview = () => {
  // check review yet
  const { mutateAsync: mutateCheckOwnerReview } = useMutation(
    getCheckedPlayerReview,
    { mutationKey: ["checkPlayerReview"], retry: false }
  )

  // create new review
  const { mutateAsync: mutateAddReview } = useMutation(addReview, {
    mutationKey: ["addReview"],
    retry: false
  })

  // update review
  const { mutateAsync: mutateUpdateReview } = useMutation(updateReview, {
    mutationKey: ["updateReview"],
    retry: false
  })

  // delete review
  const { mutateAsync: mutateDeleteReview } = useMutation(deleteReview, {
    mutationKey: ["deleteReview"],
    retry: false
  })

  return {
    mutateAddReview,
    mutateUpdateReview,
    mutateDeleteReview,
    mutateCheckOwnerReview
  }
}

export default useMutateReview
