import { useToast } from "@feature/toast/containers"
import useGameStore from "@stores/game"
// import useProfileStore from "@stores/profileStore"
import React, { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import useReviewContext from "../contexts/useReviewContext"
import useAddReview from "./useAddReview"

const useReview = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setRate, setMessage, message, rate } = useReviewContext()
  const { mutateAddReview } = useAddReview()
  const { errorToast, successToast } = useToast()
  const { data } = useGameStore()
  // const profile = useProfileStore((state) => state.profile.data)
  const { executeRecaptcha } = useGoogleReCaptcha()

  /**
   * @description Handle submit comment
   */
  const onSubmitComment = async (_review: string, _rating: number) => {
    if (!executeRecaptcha) {
      return
    }
    const _captcha = await executeRecaptcha("addReview")
    if (data && _captcha) {
      setLoading(true)
      await mutateAddReview({
        _recaptcha: _captcha,
        _message: _review,
        _rate: _rating,
        _gameId: data?._id
      })
        .then((res) => {
          if (res) {
            setMessage("")
            setRate(0)
            successToast("Review has been added")
          }
        })
        .catch((error) => {
          errorToast(error.message)
          setLoading(false)
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        )
    }
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
