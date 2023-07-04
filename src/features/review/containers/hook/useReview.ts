import { useToast } from "@feature/toast/containers"
import { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useReviewProvider } from "@feature/review/containers/contexts/ReviewProvider"
import useMutateReview from "./useMutateReview"

const useReview = () => {
  const { updateReviewList } = useReviewProvider()
  const [loading, setLoading] = useState<boolean>(false)
  const { mutateAddReview, mutateUpdateReview, mutateDeleteReview } =
    useMutateReview()
  const { errorToast, successToast } = useToast()
  const { executeRecaptcha } = useGoogleReCaptcha()

  /**
   * @description Handle submit comment
   */
  const onSubmitComment = async (
    _id: string,
    _review: string,
    _rating: number
  ) => {
    if (!executeRecaptcha) {
      return
    }
    const _captcha = await executeRecaptcha("addReview")
    if (_id && _captcha) {
      setLoading(true)
      await mutateAddReview({
        _recaptcha: _captcha,
        _message: _review,
        _rate: _rating,
        _gameId: _id
      })
        .then((res) => {
          if (res) {
            successToast(res.message)
            if (updateReviewList && res.data)
              updateReviewList("add", {
                id: res.data.id,
                createdAt: res.data.createdAt,
                review_comment: res.data.review_comment,
                review_rate: res.data.review_rate,
                status: res.data.status,
                player_info: {
                  id: res.data.player_id._id,
                  username: res.data.player_id.username,
                  avatar: res.data.player_id.avatar
                }
              })
          }
        })
        .catch((error) => {
          errorToast(error.message)
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        )
    }
  }

  const onSubmitUpdateReview = async (
    _id: string,
    _comment: string,
    _rating: number
  ) => {
    if (!executeRecaptcha) {
      return
    }
    const _captcha = await executeRecaptcha("addReview")
    if (_captcha) {
      setLoading(true)
      await mutateUpdateReview({
        _recaptcha: _captcha,
        _reviewId: _id,
        _message: _comment,
        _rate: _rating
      })
        .then((res) => {
          if (res) {
            successToast(res.message)
            if (updateReviewList && res.data)
              updateReviewList("update", {
                id: res.data.id,
                createdAt: res.data.createdAt,
                review_comment: res.data.review_comment,
                review_rate: res.data.review_rate,
                status: res.data.status,
                player_info: {
                  id: res.data.player_id._id,
                  username: res.data.player_id.username,
                  avatar: res.data.player_id.avatar
                }
              })
          }
        })
        .catch((error) => {
          errorToast(error.message)
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        )
    }
  }

  const onSubmitDeleteReview = async (_id: string) => {
    setLoading(true)
    await mutateDeleteReview(_id)
      .then((res) => {
        successToast(res.message)
        if (updateReviewList && res.data && res.status)
          updateReviewList("delete", {
            id: res.data.id,
            createdAt: res.data.createdAt,
            review_comment: res.data.review_comment,
            review_rate: res.data.review_rate,
            status: res.data.status,
            player_info: {
              id: res.data.player_id._id,
              username: res.data.player_id.username,
              avatar: res.data.player_id.avatar
            }
          })
      })
      .catch((error) => {
        errorToast(error.message)
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      )
  }

  return {
    // handleInputMessage,
    onSubmitComment,
    onSubmitUpdateReview,
    onSubmitDeleteReview,
    setLoading,
    loading
  }
}

export default useReview
