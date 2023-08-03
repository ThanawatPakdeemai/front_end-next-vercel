import { useToast } from "@feature/toast/containers"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useReviewProvider } from "@feature/review/containers/providers/ReviewProvider"
import useLoadingStore from "@stores/loading"
import useMutateReview from "./useMutateReview"

const useReview = () => {
  const { updateReviewList } = useReviewProvider()
  const { setOpen, setClose } = useLoadingStore()
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
      setOpen()
      await mutateAddReview({
        _recaptcha: _captcha,
        _message: _review,
        _rate: _rating,
        _gameId: _id
      })
        .then((res) => {
          if (res) {
            // successToast(res.message)
            successToast("Add Game Review Successful.")
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
            setClose()
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
      setOpen()
      await mutateUpdateReview({
        _recaptcha: _captcha,
        _reviewId: _id,
        _message: _comment,
        _rate: _rating
      })
        .then((res) => {
          if (res) {
            // successToast(res.message)
            successToast("Add Game Review Successful.")
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
            setClose()
          }, 1000)
        )
    }
  }

  const onSubmitDeleteReview = async (_id: string) => {
    setOpen()
    await mutateDeleteReview(_id)
      .then((res) => {
        // successToast(res.message)
        successToast("Delete Review Game Review Successful.")
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
          setClose()
        }, 1000)
      )
  }

  return {
    // handleInputMessage,
    onSubmitComment,
    onSubmitUpdateReview,
    onSubmitDeleteReview
  }
}

export default useReview
