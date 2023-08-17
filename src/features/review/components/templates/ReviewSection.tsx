import React from "react"
import { useTranslation } from "react-i18next"
import AddIcon from "@mui/icons-material/Add"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const AsideLayout = dynamic(
  () => import("@components/templates/contents/AsideLayout"),
  {
    suspense: true,
    ssr: false
  }
)
const ModalAllReview = dynamic(
  () => import("@feature/review/components/molecules/ModalAllReview"),
  {
    suspense: true,
    ssr: false
  }
)

interface IReviewProps {
  children: React.ReactNode
  average?: string
  gameId: string
}

const ReviewSection = ({ children, average, gameId }: IReviewProps) => {
  const { t } = useTranslation()
  const [openViewAll, setOpenViewAll] = React.useState<boolean>(false)
  return (
    <div className="relative flex flex-col justify-start rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4">
      <AsideLayout
        icon={<Icomoon className="icon-Medal" />}
        title={`${t("review_title")}`}
        average={average}
        adornmentButton={
          <ButtonLink
            onClick={() => setOpenViewAll(true)}
            text={t("view_all")}
            icon={<AddIcon />}
            color="secondary"
            size="small"
            className="button-global button-transparent"
          />
        }
      >
        <div className="text-start text-sm text-neutral-500">{children}</div>
      </AsideLayout>
      <ModalAllReview
        gameId={gameId}
        openViewAll={openViewAll}
        setOpenViewAll={setOpenViewAll}
      />
    </div>
  )
}

export default ReviewSection
