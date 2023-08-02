import React, { useCallback } from "react"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import { Button, Stack } from "@mui/material"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import useReview from "@feature/review/containers/hook/useReview"
import ReviewCard from "@feature/review/components/atoms/ReviewCard"
import ModalAddReview from "@feature/review/components/molecules/ModalAddReview"

interface IProps {
  gameId: string
  reviewId: string
  reviewUserId: string
  playerId?: string
  reviewRate: string
  reviewText: string
  reviewAvatar: string
  reviewUsername: string
}

const ReviewCardModal = ({
  gameId,
  reviewId,
  reviewUserId,
  playerId,
  reviewRate,
  reviewText,
  reviewAvatar,
  reviewUsername
}: IProps) => {
  const [openEdit, setOpenEdit] = React.useState<boolean>(false)
  const [openDel, setOpenDel] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { onSubmitDeleteReview } = useReview()

  const onDeleteReview = useCallback(async (_reviewId: string) => {
    setIsLoading(true)
    await onSubmitDeleteReview(_reviewId)
    setOpenDel(false)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ReviewCard
        reviewId={reviewId}
        reviewUserId={reviewUserId}
        playerId={playerId}
        reviewRate={reviewRate}
        reviewText={reviewText}
        reviewAvatar={reviewAvatar}
        reviewUsername={reviewUsername}
        onEdit={setOpenEdit}
        onDel={setOpenDel}
      />
      <ModalAddReview
        gameId={gameId}
        method="edit"
        reviewId={reviewId}
        modalOpen={openEdit}
        setModalOpen={setOpenEdit}
      />
      <ModalCustom
        open={openDel}
        onClose={() => setOpenDel(false)}
        className="m-auto w-[354px] rounded-md p-4"
        width={515}
      >
        <Stack className="gap-y-[22px] capitalize">
          <ModalHeader
            handleClose={() => setOpenDel(false)}
            title="warning"
            bg="bg-neutral-800 h-14 rounded-[8px] pl-[22px] border border-neutral-700 flex-row uppercase"
          />
          <div>are you sure to delete your review?</div>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={() => onDeleteReview(reviewId)}
            disabled={isLoading}
            className="!text-white-primary"
          >
            sure
          </Button>
        </Stack>
      </ModalCustom>
    </>
  )
}

export default ReviewCardModal
