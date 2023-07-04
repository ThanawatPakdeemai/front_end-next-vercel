import React from "react"
import MedalIcon from "@components/icons/MedalIcon"
import { useTranslation } from "react-i18next"
import ButtonLink from "@components/atoms/button/ButtonLink"
import AddIcon from "@mui/icons-material/Add"
import AsideLayout from "@components/templates/contents/AsideLayout"

interface IReviewProps {
  children: React.ReactNode
  average?: string
}

const Review = ({ children, average }: IReviewProps) => {
  const { t } = useTranslation()
  return (
    <div className="relative flex flex-col justify-start rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4">
      <AsideLayout
        icon={<MedalIcon />}
        title={`${t("review_title")}`}
        average={average}
        adornmentButton={
          <ButtonLink
            href="#"
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
    </div>
  )
}

export default Review
