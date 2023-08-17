import React, { useCallback } from "react"
import { Stack } from "@mui/material"
import dynamic from "next/dynamic"
import useReview from "@feature/review/containers/hook/useReview"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const ModalHeader = dynamic(
  () => import("@components/molecules/Modal/ModalHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const ReviewTextArea = dynamic(
  () => import("@feature/review/components/atoms/ReviewTextArea"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProps {
  gameId: string
  method?: "add" | "edit"
  reviewId?: string
  modalOpen: boolean
  setModalOpen: (_value: boolean) => void
}

const ModalAddReview = ({
  gameId,
  method = "add",
  reviewId,
  modalOpen,
  setModalOpen
}: IProps) => {
  const { onSubmitComment, onSubmitUpdateReview } = useReview()

  const onCloseModal = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const onReviewSubmit = useCallback(
    async ({
      _text,
      _star
    }: {
      _text: string
      _star: number
    }): Promise<{ _status: boolean }> => {
      if (method === "add") await onSubmitComment(gameId, _text, _star)
      else if (reviewId && method === "edit")
        await onSubmitUpdateReview(reviewId, _text, _star)
      else console.error("ModalAddReview method missing")
      onCloseModal()
      return { _status: true }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameId, onSubmitComment]
  )

  return (
    <ModalCustom
      open={modalOpen}
      onClose={onCloseModal}
      className="m-auto w-[354px] rounded-md p-4"
      width={515}
    >
      <Stack className="gap-y-[22px] capitalize">
        <ModalHeader
          handleClose={onCloseModal}
          title="rate your experience"
          bg="bg-neutral-800 h-14 rounded-[8px] pl-[22px] border border-neutral-700 flex-row"
        />
        <ReviewTextArea onSubmit={onReviewSubmit} />
      </Stack>
    </ModalCustom>
  )
}

export default ModalAddReview
