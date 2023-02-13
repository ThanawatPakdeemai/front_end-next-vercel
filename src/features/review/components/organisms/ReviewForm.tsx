import React from "react"
import ImageCustom from "@components/atoms/image/Image"
import useReview from "@feature/review/containers/hook/useReview"
import Loading from "@components/atoms/Loading"
import { Rating } from "@mui/material"
import useReviewContext from "@feature/review/containers/contexts/useReviewContext"
import MessageFooter from "../templates/MessageFooter"

interface IReviewFormProps {
  avatar: string
  username: string
}

const ReviewForm = ({ avatar, username }: IReviewFormProps) => {
  const { onSubmitComment, loading } = useReview()
  const { message, setRate, rate } = useReviewContext()

  return (
    <div className="review-form mb-3 grid min-h-[68px] grid-flow-col items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900 p-2">
      <div className="review--item__avatar animation-image row-span-2 flex h-[58px] w-[58px] items-center">
        <ImageCustom
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
            name="no-value"
            value={rate}
            sx={{
              "& .MuiSvgIcon-root": {
                color: "#70727B",
                width: "20px"
              }
            }}
            onChange={(newValue) => {
              setRate(Number(newValue))
            }}
          />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <MessageFooter onSubmit={() => onSubmitComment(message, rate)} />
      )}
    </div>
  )
}

export default ReviewForm
