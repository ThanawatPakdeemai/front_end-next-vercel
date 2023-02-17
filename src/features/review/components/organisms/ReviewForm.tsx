import React, { useEffect } from "react"
import { Image } from "@components/atoms/image/index"
import useReview from "@feature/review/containers/hook/useReview"
import { Rating } from "@mui/material"
import useReviewContext from "@feature/review/containers/contexts/useReviewContext"
import useLoadingStore from "@stores/loading"
import MessageFooter from "../templates/MessageFooter"

interface IReviewFormProps {
  avatar: string
  username: string
}

const ReviewForm = ({ avatar, username }: IReviewFormProps) => {
  const { onSubmitComment, loading } = useReview()
  const { message, setRate, rate } = useReviewContext()
  const { setOpen, setClose } = useLoadingStore()

  useEffect(() => {
    if (loading) {
      setOpen()
    } else {
      setClose()
    }
  }, [loading, setClose, setOpen])

  return (
    <div className="review-form mb-3 grid min-h-[68px] grid-flow-col items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900 p-2">
      <div className="review--item__avatar animation-image row-span-2 flex h-[58px] w-[58px] items-center">
        <Image
          src={avatar}
          width="200"
          height="200"
          alt={username}
          className="h-[58px] w-full rounded-sm object-fill object-center"
        />
      </div>
      <div className="review--item__content__header mb-2 flex min-w-[300px] items-center justify-between">
        <div className="review--item__content-username">{username}</div>
        <div className="review--item__content-rating flex-row">
          <Rating
            className="mx-2"
            name="simple-controlled"
            value={rate}
            sx={{
              "& .MuiSvgIcon-root": {
                color: "#70727B",
                width: "20px"
              }
            }}
            onChange={(_event, _newValue) => {
              const rating = 6 - Number(_newValue)
              setRate(rating)
            }}
          />
        </div>
      </div>
      {loading && (
        <MessageFooter onSubmit={() => onSubmitComment(message, rate)} />
      )}
    </div>
  )
}

export default ReviewForm
