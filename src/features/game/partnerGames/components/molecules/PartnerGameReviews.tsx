import { PaginationNaka } from "@components/atoms/pagination"
import NoAuth from "@components/templates/NoAuth"
import ReviewForm from "@feature/review/components/organisms/ReviewForm"
import Review from "@feature/review/components/templates/Review"
import useGlobal from "@hooks/useGlobal"
import { Chip, Rating, styled, Typography } from "@mui/material"
import ImageCustom from "@components/atoms/image/Image"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import useGamePartners from "../../containers/hook/useGamePartners"
import { IGamePartnerReviewsData } from "../../interfaces/IGamePartners"

export const ReviewRatingStyle = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#70727B"
  },
  "& .MuiRating-iconHover": {
    color: "#70727B"
  }
})
const PartnerGameReviews = () => {
  const { t } = useTranslation()
  const { page, setPage, totalCount, setTotalCount, stateProfile, hydrated } =
    useGlobal()
  const { allReviewsData, limit } = useGamePartners()
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
        <Review average={average.toString()}>
          {review && review.length > 0 ? (
            review.map((_item) => (
              <div
                key={_item.id}
                className="review--item mb-3 grid min-h-[68px] grid-flow-col justify-between gap-2 rounded-2xl border border-neutral-800 bg-neutral-900 p-2"
              >
                <div className="review--item__avatar animation-image row-span-2 flex h-[58px] w-[58px] items-center">
                  <ImageCustom
                    src={_item.user.avatar}
                    width="200"
                    height="200"
                    alt={_item.user.username}
                    className="h-[58px] w-full rounded-sm object-fill object-center"
                  />
                </div>
                <div className="review--item__content__header flex min-w-[300px] items-center justify-between">
                  <div className="review--item__content-username">
                    {_item.user.username}
                  </div>
                  <div className="review--item__content-rating flex items-center gap-2">
                    <ReviewRatingStyle
                      size="small"
                      name="read-only"
                      value={parseFloat(_item.review_rate)}
                      readOnly
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
                <div className="review--item__content min-w-[300px]">
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
              <ReviewForm
                avatar={stateProfile.avatar}
                username={stateProfile.username}
              />
            ) : (
              <NoAuth />
            )}
          </div>
        </Review>
      )}
    </>
  )
}

export default PartnerGameReviews
