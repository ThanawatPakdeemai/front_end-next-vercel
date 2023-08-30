import { Button, Stack } from "@mui/material"
import React, { useState, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import dynamic from "next/dynamic"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import {
  ReviewProvider,
  useReviewProvider
} from "@feature/review/containers/providers/ReviewProvider"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonLogin = dynamic(
  () => import("@components/molecules/rightMenu/ButtonLogin"),
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
const FormLogin = dynamic(
  () => import("@feature/authentication/components/FormLogin"),
  {
    suspense: true,
    ssr: false
  }
)
const ReviewSection = dynamic(
  () => import("@feature/review/components/templates/ReviewSection"),
  {
    suspense: true,
    ssr: false
  }
)
const ModalAddReview = dynamic(
  () => import("@feature/review/components/molecules/ModalAddReview"),
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
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IGameReviewProps {
  gameType: IGetType
  gameId: string
}
const GameReviewContent = ({ gameId }: { gameId: string }) => {
  const { t } = useTranslation()
  const { stateProfile, hydrated } = useGlobal()
  const { previewList, reviewInfo, limit } = useReviewProvider()
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false)
  const { profile } = useProfileStore()
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  const onOpenAddModalChange = useCallback(() => {
    setOpenAdd(true)
  }, [setOpenAdd])

  return (
    <div className="relative h-full w-full">
      {hydrated && (
        <GoogleReCaptchaProvider
          reCaptchaKey={`${process.env.NEXT_PUBLIC_KEY_RECAPTCHA}`}
          scriptProps={{
            async: true,
            defer: false,
            appendTo: "head",
            nonce: undefined
          }}
        >
          <ReviewSection
            average={reviewInfo ? reviewInfo.avarage.toFixed(2) : "0"}
            gameId={gameId}
          >
            <div className="flex h-full w-full flex-col">
              <div
                className={`${
                  previewList && limit && previewList.length > limit / 2
                    ? "text-shadow-bottom"
                    : undefined
                } flex h-fit max-h-[374px] w-full flex-col gap-y-2 overflow-y-auto pb-12`}
              >
                {previewList && previewList.length > 0 ? (
                  previewList.map((_item) => (
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
              <div className="absolute bottom-[24px] z-10 flex w-full flex-row items-center justify-center">
                {stateProfile ? (
                  <div className="flex w-full flex-row items-center justify-center bg-transparent">
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      className="!h-10 rounded-[20px] text-sm capitalize"
                      onClick={onOpenAddModalChange}
                      startIcon={<Icomoon className="icon-Message-Text" />}
                      aria-label="Add Review Icon"
                    >
                      add review
                    </Button>
                    <ModalAddReview
                      gameId={gameId}
                      method="add"
                      modalOpen={openAdd}
                      setModalOpen={setOpenAdd}
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-fit">
                      <ButtonLogin
                        handleButton={() => {
                          setOpenModalLogin(true)
                        }}
                      />
                    </div>
                    <ModalCustom
                      open={openModalLogin}
                      onClose={() => setOpenModalLogin(false)}
                      className="w-full gap-3 rounded-[34px] p-[10px] md:w-auto"
                      width="auto"
                    >
                      <Stack
                        spacing={3}
                        className="md:p-5"
                      >
                        <ModalHeader
                          handleClose={() => setOpenModalLogin(false)}
                          title="Login"
                        />

                        <FormLogin />
                      </Stack>
                    </ModalCustom>
                  </>
                )}
              </div>
            </div>
          </ReviewSection>
        </GoogleReCaptchaProvider>
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
