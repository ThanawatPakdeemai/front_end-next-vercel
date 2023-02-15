import { useToast } from "@feature/toast/containers"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import React, { useState } from "react"
import useReviewContext from "../contexts/useReviewContext"
import useAddReview from "./useAddReview"

const useReview = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setRate, setMessage } = useReviewContext()
  const { gamePartnerData } = useGlobal()
  const { mutateAddReview } = useAddReview()
  const { errorToast, successToast } = useToast()

  const profile = useProfileStore((state) => state.profile.data)

  /**
   * @description Handle submit comment
   */
  const onSubmitComment = (_message: string, _rating: number) => {
    setLoading(true)

    mutateAddReview({
      user_id: profile && profile.id ? profile.id : "",
      review_comment: _message,
      review_rate: _rating,
      game_content_id:
        gamePartnerData && gamePartnerData.id ? gamePartnerData.id : ""
    })
      .then((res) => {
        if (res) {
          setTimeout(() => {
            successToast("Review has been added")
            setMessage("")
            setRate(0)
            setLoading(false)
          }, 3000)
        }
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }

  /**
   * @description Handle input text
   */
  const handleInputMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      // onSubmitComment(message, rate)
    }
  }

  return {
    handleInputMessage,
    onSubmitComment,
    setLoading,
    loading,
    setRate,
    setMessage
  }
}

export default useReview
