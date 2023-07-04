import React, { useEffect, useState } from "react"
import { Image } from "@components/atoms/image/index"
import useReview from "@feature/review/containers/hook/useReview"
import { Rating, Box, TextField, Typography } from "@mui/material"
import Helper from "@utils/helper"
import { iconmotion } from "@components/organisms/Footer"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import SendIcon from "@components/icons/SendIcon"
import EditIcon from "@mui/icons-material/Edit"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

interface IReviewFormProps {
  gameId: string
  avatar: string
  username: string
  haveReview?: boolean
  reviewId?: string
  reviewMessage?: string
  reviewRating?: number
}

const ReviewForm = ({
  gameId,
  avatar,
  username,
  haveReview = false,
  reviewId,
  reviewMessage = "",
  reviewRating = 0
}: IReviewFormProps) => {
  const { onSubmitComment, onSubmitUpdateReview, onSubmitDeleteReview } =
    useReview()
  const [hasReview, setHasReview] = useState<boolean>(haveReview)
  const [disMessage, setDisMessage] = useState<boolean>(true)
  const [reviewMess, setReviewMess] = useState<string>(reviewMessage)
  const [reviewRate, setReviewRate] = useState<number>(reviewRating)

  useEffect(() => {
    let load = false
    if (!load) {
      if (haveReview) {
        setHasReview(haveReview)
      }
      if (reviewMessage) setReviewMess(reviewMessage)
      if (reviewRating) setReviewRate(reviewRating)
    }
    return () => {
      load = true
    }
  }, [disMessage, reviewMessage, reviewRating, haveReview])

  const handleSubmit = () => {
    if (hasReview && reviewId) {
      if (reviewMess !== reviewMessage || reviewRate !== reviewRating)
        onSubmitUpdateReview(reviewId, reviewMess, reviewRate)
    } else {
      onSubmitComment(gameId, reviewMess, reviewRate)
    }
    setDisMessage(true)
  }

  return (
    <div className="flex w-full flex-col">
      <div className="review-form flex h-[72px] w-full gap-x-3">
        <div className="review--item__avatar h-[58px] w-[58px] min-w-[58px] rounded-sm">
          <Image
            src={Helper.convertAvatar(avatar)}
            width={58}
            height={58}
            alt={username}
            className="h-[58px] w-[58px] rounded-sm"
          />
        </div>
        <div className="flex w-full flex-col">
          <div className="review--item__content__header flex w-full items-center justify-center lg:justify-between">
            <div className="review--item__content-username">{username}</div>
            <div className="review--item__content-rating flex flex-row items-center gap-x-1">
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
                disabled={!!(hasReview && disMessage)}
                precision={0.5}
                value={reviewRate}
                onChange={(e, newValue) => {
                  setReviewRate(Number(newValue))
                }}
              />
              {hasReview && reviewMessage && reviewId ? (
                <>
                  <button
                    type="button"
                    onClick={() => setDisMessage((prev: boolean) => !prev)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSubmitDeleteReview(reviewId)}
                  >
                    <DeleteForeverIcon />
                  </button>
                </>
              ) : null}
            </div>
          </div>
          {hasReview && reviewMessage && disMessage ? (
            <div className="h-auto w-full">
              <Typography
                className="mb-0 text-sm text-neutral-500 line-clamp-1"
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: reviewMessage
                }}
              />
            </div>
          ) : (
            <Box
              component="div"
              className="message-input relative flex w-full items-center"
            >
              <TextField
                className="w-full"
                required
                type="text"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    width: "100%",
                    padding: "9px 40px 9px 14px"
                  }
                }}
                id="message-input"
                placeholder="Message Here"
                size="medium"
                value={reviewMess}
                // onKeyPress={handleInputMessage}
                onChange={(e) => setReviewMess(e.target.value)}
                autoComplete="off"
              />
              <ButtonIcon
                variants={iconmotion}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 400, damping: 4 }}
                icon={<SendIcon />}
                className={`absolute right-4 flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-lg bg-transparent ${
                  reviewMess.length > 10
                    ? "opacity-100"
                    : "cursor-not-allowed opacity-20"
                }`}
                aria-label="send-button"
                onClick={handleSubmit}
              />
            </Box>
          )}
          {/* {!disMessage ? (
          <div className="flex flex-row">
            <button
              type="button"
              onClick={() => setDisMessage(true)}
            >
              cancel
            </button>
            <button
              type="button"
              onClick={() => {}}
            >
              update
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {}}
          >
            send
          </button>
        )} */}
        </div>
        {/* <MessageFooter onSubmit={() => handleSubmit()} /> */}
      </div>
      <div>
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </div>
    </div>
  )
}

export default ReviewForm
