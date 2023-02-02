import MessageFooter from "@feature/chat/components/molecules/MessageFooter"
import React from "react"
import Image from "next/image"
import { ReviewRatingStyle } from "@feature/game/partnerGames/components/molecules/PartnerGameReviews"

interface IReviewFormProps {
  avatar: string
  username: string
}

const ReviewForm = ({ avatar, username }: IReviewFormProps) => (
  /**
   * TODO: Implement review comment function
   */
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
      <div className="review--item__content-rating flex items-center gap-2">
        <ReviewRatingStyle
          size="small"
          max={5}
          precision={0.5}
        />
        {/* <Chip
              label={_item.review_rate}
              color="success"
              variant="filled"
              size="small"
              className="!h-[20px] !w-[38px] !bg-green-lemon !p-0"
            /> */}
      </div>
    </div>
    <MessageFooter />
  </div>
)

export default ReviewForm
