import React, { useEffect } from "react"
import { Image } from "@components/atoms/image/index"
import useReview from "@feature/review/containers/hook/useReview"
import { Rating, Stack } from "@mui/material"
import useReviewContext from "@feature/review/containers/contexts/useReviewContext"
import useLoadingStore from "@stores/loading"
import Helper from "@utils/helper"
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
    let load = false

    if (!load) {
      if (loading) {
        setOpen()
      } else {
        setClose()
      }
    }

    return () => {
      load = true
    }
  }, [loading, setClose, setOpen])

  return (
    <div className="review-form mb-3 flex grid-flow-col flex-wrap items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900 p-2 lg:grid lg:min-h-[68px]">
      <div className="review--item__avatar animation-image row-span-2 flex h-[58px] w-[58px] max-w-[58px] flex-auto items-center sm:mx-auto sm:flex-none lg:mx-0">
        <Image
          src={Helper.convertAvatar(avatar)}
          width="200"
          height="200"
          alt={username}
          className="h-[58px] w-full rounded-sm object-cover object-center"
        />
      </div>
      <div className="review--item__content__header mb-2 flex w-full items-center justify-center lg:justify-between">
        <div className="review--item__content-username">{username}</div>
        <div className="review--item__content-rating flex-row">
          <Stack spacing={1}>
            <Rating
              sx={{
                "& .MuiSvgIcon-root": {
                  width: "20px"
                },
                "& .MuiRating-iconFilled": {
                  color: "#70727B"
                },
                justifyContent: "flex-start",
                justifyItems: "flex-start"
              }}
              name="half-rating"
              className="mx-2"
              defaultValue={0}
              precision={0.5}
              value={rate}
              onChange={(newValue) => {
                setRate(Number(newValue))
              }}
            />
          </Stack>
        </div>
      </div>
      <MessageFooter onSubmit={() => onSubmitComment(message, rate)} />
      {/* {loading && (
      )} */}
    </div>
  )
}

export default ReviewForm
