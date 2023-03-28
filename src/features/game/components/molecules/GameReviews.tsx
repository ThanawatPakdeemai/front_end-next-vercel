import { PaginationNaka } from "@components/atoms/pagination"
import NoAuth from "@components/templates/NoAuth"
import ReviewForm from "@feature/review/components/organisms/ReviewForm"
import Review from "@feature/review/components/templates/Review"
import useGlobal from "@hooks/useGlobal"
import { Chip, Rating, Typography } from "@mui/material"
import { Image } from "@components/atoms/image/index"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ReviewProvider } from "@feature/review/containers/contexts/ReviewProvider"
import { IGamePartnerReviewsData } from "@feature/game/partnerGames/interfaces/IGamePartners"
import useGameWhatsNew from "@feature/game/containers/hooks/useGameWhatsNew"
import { IGetType } from "@feature/game/interfaces/IGameService"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

interface IGameReviewProps {
  gameType: IGetType
  gameId: string
}
const GameReviews = ({ gameType, gameId }: IGameReviewProps) => {
  const { t } = useTranslation()
  const { page, setPage, totalCount, setTotalCount, stateProfile, hydrated } =
    useGlobal()
  const { allReviewsData, limit } = useGameWhatsNew(gameType, gameId)
  const [review, setReview] = useState<IGamePartnerReviewsData[]>([])
  const [average, setAverage] = useState<number>(0)

  useEffect(() => {
    if (allReviewsData) {
      setReview(allReviewsData.data)
      setTotalCount(allReviewsData.info.totalCount)
    }
  }, [allReviewsData, setTotalCount])

  /**
   * @description Calculate average rating
   */
  useEffect(() => {
    if (review && review.length > 0) {
      const total = review.reduce(
        (acc, cur) => acc + parseFloat(cur.review_rate),
        0
      )
      const _average = total / review.length
      setAverage(_average)
    }
  }, [review])

  return (
    <>
      {hydrated && (
        <ReviewProvider>
          <Review average={average.toString()}>
            {review && review.length > 0 ? (
              review.map((_item) => (
                <div
                  key={_item.id}
                  className="review--item mb-3 flex min-h-[68px] grid-flow-col flex-wrap items-center justify-between gap-2 rounded-2xl border border-neutral-800 bg-neutral-900 p-2 lg:grid"
                >
                  <div className="review--item__avatar animation-image row-span-2 flex h-[58px] w-[58px] items-center">
                    <Image
                      src={_item.user.avatar}
                      width="200"
                      height="200"
                      alt={_item.user.username}
                      className="h-[58px] w-full rounded-sm object-fill object-center"
                    />
                  </div>
                  <div className="review--item__content__header flex w-full flex-wrap items-center lg:justify-between">
                    <div className="review--item__content-username">
                      {_item.user.username}
                    </div>
                    <div className="review--item__content-rating flex items-center gap-2">
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
                  <div className="review--item__content lg:min-w-[300px]">
                    <Typography
                      className="mb-0 text-sm text-neutral-500 line-clamp-1"
                      variant="body1"
                      dangerouslySetInnerHTML={{
                        __html: _item.review_comment
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">{t("no_review")}</div>
            )}
            <div className="relative z-10 flex justify-end">
              <PaginationNaka
                totalCount={totalCount}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </div>
            <div className="relative z-10 mt-5 mb-7">
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
                    avatar={stateProfile.avatar}
                    username={stateProfile.username}
                  />
                </GoogleReCaptchaProvider>
              ) : (
                <NoAuth />
              )}
            </div>
          </Review>
        </ReviewProvider>
      )}
    </>
  )
}

export default GameReviews
