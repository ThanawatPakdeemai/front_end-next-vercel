import { useToast } from "@feature/toast/containers"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import React, { useState } from "react"
import useReviewContext from "../contexts/useReviewContext"
import useAddReview from "./useAddReview"

const useReview = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setRate, setMessage, message, rate } = useReviewContext()
  const { mutateAddReview } = useAddReview()
  const { errorToast, successToast } = useToast()
  const { dataGamePartner } = useGameStore()
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
        dataGamePartner && dataGamePartner.id ? dataGamePartner.id : ""
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
        setLoading(false)
      })
  }

  /**
   * @description Handle input text
   */
  const handleInputMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && message.length >= 10) {
      onSubmitComment(message, rate)
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
