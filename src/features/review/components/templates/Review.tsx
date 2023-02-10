import React from "react"
import AsideLayout from "@components/template/AsideLayout"
import MedalIcon from "@components/icons/MedalIcon"
import { useTranslation } from "react-i18next"
import ButtonLink from "@components/atoms/button/ButtonLink"
import AddIcon from "@mui/icons-material/Add"

interface IReviewProps {
  children: React.ReactNode
  average?: string
}

const Review = ({ children, average }: IReviewProps) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-start">
      <AsideLayout
        icon={<MedalIcon />}
        title={`${t("review_title")}`}
        average={average}
        adornmentButton={
          <ButtonLink
            href="#"
            text="View All"
            icon={<AddIcon />}
            color="secondary"
            size="small"
            className="button-global button-transparent"
          />
        }
      >
        <div className="pt-3 text-start text-sm text-neutral-500">
          {children}
        </div>
      </AsideLayout>
    </div>
  )
}

export default Review
