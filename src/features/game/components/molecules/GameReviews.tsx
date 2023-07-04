import NoAuth from "@components/templates/NoAuth"
import ReviewForm from "@feature/review/components/organisms/ReviewForm"
import Review from "@feature/review/components/templates/Review"
import useGlobal from "@hooks/useGlobal"
import { Chip, Rating, Typography } from "@mui/material"
import { Image } from "@components/atoms/image/index"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { IGetType } from "@feature/game/interfaces/IGameService"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { IReviewList } from "@feature/review/interfaces/IReviewGame"
import {
  ReviewProvider,
  useReviewProvider
} from "@feature/review/containers/providers/ReviewProvider"

interface IGameReviewProps {
  gameType: IGetType
  gameId: string
}
const GameReviewContent = ({ gameId }: { gameId: string }) => {
  const { t } = useTranslation()
  const { stateProfile, hydrated } = useGlobal()
  const { reviewList, reviewInfo, ownerReview } = useReviewProvider()
  const [review, setReview] = useState<Array<IReviewList>>([])
  const [average, setAverage] = useState<number>(0)

  useEffect(() => {
    let load = false

    if (!load) {
      if (reviewList && reviewInfo) {
        setReview(reviewList)
      }
    }

    return () => {
      load = true
    }
  }, [reviewList, reviewInfo])

  /**
   * @description Calculate average rating
   */
  useEffect(() => {
    let load = false

    if (!load) {
      if (review && review.length > 0) {
        const total = review.reduce(
          (acc, cur) => acc + parseFloat(cur.review_rate),
          0
        )
        const _average = total / review.length
        setAverage(_average)
      }
    }

    return () => {
      load = true
    }
  }, [review])

  return (
    <div className="relative h-full w-full">
      {hydrated && (
        <Review average={average.toString()}>
          <div className="flex h-3/4 w-full flex-col gap-y-2">
            <div className="flex h-full w-full flex-col gap-y-2">
              {review && review.length > 0 ? (
                review.map((_item) => (
                  <div
                    key={_item.id}
                    className={`review--item flex h-auto min-h-[68px] w-full flex-row gap-x-2 rounded-default border-2 ${
                      stateProfile && stateProfile.id === _item.player_info.id
                        ? "border-error-main/75"
                        : "border-neutral-800"
                    } bg-primary-main p-1`}
                  >
                    <div className="h-[58px] w-[58px] min-w-[58px] rounded-sm">
                      <Image
                        src={_item.player_info.avatar}
                        width={58}
                        height={58}
                        alt={_item.player_info.username}
                        className="h-[58px] w-[58px] rounded-sm"
                      />
                    </div>
                    <div className="flex h-full w-full flex-col gap-y-2">
                      <div className="flex h-6 min-h-[24px] w-full flex-row justify-between">
                        <div className="review--item__content-username flex h-full items-center">
                          {_item.player_info.username}
                        </div>
                        <div className="review--item__content-rating flex h-full items-center gap-2">
                          <Rating
                            sx={{
                              "& .MuiSvgIcon-root": {
                                color: "#70727B",
                                width: "20px"
                              }
                            }}
                            size="small"
                            name="read-only"
                            value={parseFloat(_item.review_rate)}
                            readOnly
                            precision={0.5}
                          />
                          <Chip
                            label={_item.review_rate}
                            color="success"
                            variant="filled"
                            size="small"
                            className="!h-[20px] !w-[38px] !bg-green-lemon !p-0"
                          />
                        </div>
                      </div>
                      <div className="h-auto w-full">
                        <Typography
                          className="mb-0 text-sm text-neutral-500 line-clamp-1"
                          variant="body1"
                          dangerouslySetInnerHTML={{
                            __html: _item.review_comment
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">{t("no_review")}</div>
              )}
            </div>
            <div className="z-10 h-1/4 w-full">
              {stateProfile ? (
                <GoogleReCaptchaProvider
                  reCaptchaKey={`${process.env.NEXT_PUBLIC_KEY_RECAPTCHA}`}
                  scriptProps={{
                    async: true,
                    defer: false,
                    appendTo: "head",
                    nonce: undefined
                  }}
                >
                  <ReviewForm
                    gameId={gameId}
                    avatar={stateProfile.avatar}
                    username={stateProfile.username}
                    haveReview={!!ownerReview}
                    reviewId={ownerReview?.id}
                    reviewMessage={ownerReview?.review_comment}
                    reviewRating={Number(ownerReview?.review_rate)}
                  />
                </GoogleReCaptchaProvider>
              ) : (
                <NoAuth />
              )}
            </div>
          </div>
        </Review>
      )}
    </div>
  )
}

const GameReviews = ({ gameId }: IGameReviewProps) => (
  <ReviewProvider gameId={gameId}>
    <GameReviewContent gameId={gameId} />
  </ReviewProvider>
)

export default GameReviews
