import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Button, Stack } from "@mui/material"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import { useReviewProvider } from "@feature/review/containers/providers/ReviewProvider"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const ReviewCardModal = dynamic(
  () => import("@feature/review/components/organisms/ReviewCardModal"),
  {
    suspense: true,
    ssr: false
  }
)
const ModalAddReview = dynamic(() => import("./ModalAddReview"), {
  suspense: true,
  ssr: false
})
const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
  {
    ssr: false
  }
) // Added { ssr: false } to disable server-side rendering for pagination
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ModalHeader = dynamic(
  () => import("@components/molecules/Modal/ModalHeader")
)
const ButtonLogin = dynamic(
  () => import("@components/molecules/rightMenu/ButtonLogin")
)
const FormLogin = dynamic(
  () => import("@feature/authentication/components/FormLogin")
)

interface IProps {
  gameId: string
  openViewAll: boolean
  setOpenViewAll: (_value: boolean) => void
}

const ModalAllReview = ({ gameId, openViewAll, setOpenViewAll }: IProps) => {
  const { t } = useTranslation()
  const {
    reviewList,
    reviewInfo,
    limit,
    page,
    setPage,
    ownerReview,
    reviewOwnerStatus
  } = useReviewProvider()
  const { profile } = useProfileStore()
  const [openAdd, setOpenAdd] = React.useState<boolean>(false)
  const [openLogin, setOpenLogin] = React.useState<boolean>(false)

  const onOpenAddModalChange = React.useCallback(() => {
    setOpenAdd(true)
  }, [setOpenAdd])

  const onModalClose = useCallback(() => {
    if (setPage) setPage(1)
    setOpenViewAll(false)
  }, [setOpenViewAll, setPage])

  return (
    <ModalCustom
      open={openViewAll}
      onClose={onModalClose}
    >
      <Stack className="gap-y-[22px] capitalize">
        <ModalHeader
          handleClose={onModalClose}
          title="all review"
          bg="bg-neutral-800 h-14 rounded-[8px] pl-[22px] border border-neutral-700 flex-row"
        />
        <div
          className={`${
            reviewList && limit && reviewList.length > limit / 2
              ? "text-shadow-bottom"
              : undefined
          } flex h-fit max-h-[374px] w-full flex-col gap-y-2 overflow-y-auto pb-12`}
        >
          {reviewList && reviewList.length > 0 ? (
            reviewList.map((_item) => (
              <ReviewCardModal
                key={`prev-${_item.id}`}
                gameId={gameId}
                reviewId={_item.id}
                reviewUserId={_item.player_info.id}
                playerId={profile.data?.id}
                reviewRate={_item.review_rate}
                reviewText={_item.review_comment}
                reviewAvatar={_item.player_info.avatar}
                reviewUsername={_item.player_info.username}
              />
            ))
          ) : (
            <div className="text-center">{t("no_review")}</div>
          )}
        </div>
        {reviewInfo &&
        limit &&
        reviewInfo.totalCount > limit &&
        page &&
        setPage ? (
          <PaginationNaka
            totalCount={reviewInfo.totalCount}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        ) : undefined}
        <div className="flex w-full flex-row items-center justify-center">
          {profile.data ? (
            <Button
              type="button"
              aria-label="add review"
              variant="contained"
              color="secondary"
              className="!h-10 rounded-[20px] text-sm capitalize"
              onClick={onOpenAddModalChange}
              startIcon={
                <Icomoon
                  className="icon-Message-Text
"
                />
              }
            >
              add review
            </Button>
          ) : (
            <>
              <div className="w-fit">
                <ButtonLogin
                  handleButton={() => {
                    setOpenLogin(true)
                  }}
                />
              </div>
              <ModalCustom
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                className="w-full gap-3 rounded-[34px] p-[10px] md:w-auto"
                width="auto"
              >
                <Stack
                  spacing={3}
                  className="md:p-5"
                >
                  <ModalHeader
                    handleClose={() => setOpenLogin(false)}
                    title="Login"
                  />
                  <FormLogin />
                </Stack>
              </ModalCustom>
            </>
          )}
        </div>

        {reviewOwnerStatus ? (
          <ModalAddReview
            gameId={gameId}
            method={ownerReview ? "edit" : "add"}
            modalOpen={openAdd}
            setModalOpen={setOpenAdd}
            reviewId={ownerReview?.id}
          />
        ) : undefined}
      </Stack>
    </ModalCustom>
  )
}

export default ModalAllReview
