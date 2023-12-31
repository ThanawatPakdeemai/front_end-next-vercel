import Chip from "@mui/material/Chip"
import Rating from "@mui/material/Rating"
import Typography from "@mui/material/Typography"
import React from "react"
import dynamic from "next/dynamic"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps {
  reviewId: string
  reviewUserId: string
  playerId?: string
  reviewRate: string
  reviewText: string
  reviewAvatar: string
  reviewUsername: string
  onEdit?: (_value: boolean) => void
  onDel?: (_value: boolean) => void
}

const ReviewCard = ({
  reviewId,
  reviewUserId,
  playerId,
  reviewRate,
  reviewText,
  reviewAvatar,
  reviewUsername,
  onEdit,
  onDel
}: IProps) => {
  const [isMore, setIsMore] = React.useState<boolean>(false)

  const handleEdit = React.useCallback(() => {
    if (onEdit) onEdit(true)
    setIsMore(false)
  }, [onEdit])

  const handleDel = React.useCallback(() => {
    if (onDel) onDel(true)
    setIsMore(false)
  }, [onDel])

  return (
    <div
      key={reviewId}
      className={`review--item flex w-full flex-row gap-x-1 rounded-default border-2 ${
        playerId && playerId === reviewUserId
          ? "border-neutral-600"
          : "border-neutral-700"
      } relative ${isMore ? "bg-neutral-600" : "bg-primary-main"} p-1`}
    >
      <div className="relative flex w-full flex-row items-center">
        <div
          className={`${
            isMore ? "opacity-20" : ""
          } relative flex w-full flex-row gap-x-2`}
        >
          <div className="h-[58px] w-[58px] min-w-[58px] overflow-hidden rounded-sm">
            <Image
              src={reviewAvatar}
              width={58}
              height={58}
              alt={reviewUsername}
              className="h-[58px] w-[58px] scale-125 rounded-sm"
            />
          </div>
          <div className="flex h-full w-full flex-col">
            <div className="flex h-6 min-h-[24px] w-full flex-row justify-between">
              <div className="flex h-full max-w-[150px] items-center font-neue-machina font-bold uppercase">
                <span className="truncate text-white-primary">
                  {reviewUsername}
                </span>
              </div>
              <div className="review--item__content-rating mr-[5px] flex h-full items-center gap-2">
                <Rating
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#A0ED61!important",
                      width: "20px"
                    }
                  }}
                  size="small"
                  name="read-only"
                  value={parseFloat(reviewRate)}
                  readOnly
                  precision={0.5}
                />
                <Chip
                  label={reviewRate}
                  color="success"
                  variant="filled"
                  size="small"
                  className="!h-[20px] !w-[38px] !bg-green-lemon !p-0"
                />
              </div>
            </div>
            <div className="h-auto w-full">
              <Typography
                className="mb-0 text-sm text-neutral-500"
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: reviewText || "-"
                }}
              />
            </div>
          </div>
        </div>
        {isMore ? (
          <div className="absolute right-0 flex h-10 w-fit flex-row items-center gap-x-1">
            {onEdit ? (
              <button
                type="button"
                aria-label="Edit review"
                className="flex h-10 w-10 flex-row items-center justify-center rounded-[4px] border border-neutral-700 bg-neutral-800 hover:opacity-80"
                onClick={handleEdit}
              >
                <Icomoon className="icon-Pen-02" />
              </button>
            ) : undefined}
            {onDel ? (
              <button
                type="button"
                aria-label="Delete review"
                className="flex h-10 w-10 flex-row items-center justify-center rounded-[4px] border border-neutral-700 bg-neutral-800 hover:opacity-80"
                onClick={handleDel}
              >
                <Icomoon className="icon-Delete" />
              </button>
            ) : undefined}
          </div>
        ) : undefined}
      </div>
      {playerId && playerId === reviewUserId ? (
        <div className="relative flex w-6 flex-row items-center">
          <button
            type="button"
            aria-label="More"
            className="h-6 w-6"
            onClick={() => setIsMore((prev: boolean) => !prev)}
          >
            <Icomoon className="icon-Verified" />
          </button>
        </div>
      ) : undefined}
    </div>
  )
}

export default ReviewCard
