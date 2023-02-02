import React from "react"
import AsideLayout from "@components/template/AsideLayout"
import MedalIcon from "@components/icons/MedalIcon"
// import { useTranslation } from "react-i18next"

interface IReviewProps {
  children: React.ReactNode
}

const Review = ({ children }: IReviewProps) => (
  // const { t } = useTranslation()
  <div className="flex flex-col justify-start">
    <AsideLayout
      icon={<MedalIcon />}
      // t("review_title")
      title="Review"
      // adornmentButton={
      //   <ButtonLink
      //     href="/"
      //     text="View All"
      //     icon={<AddIcon />}
      //     color="secondary"
      //     size="small"
      //     className="button-global button-transparent"
      //   />
      // }
    >
      <div className="pt-3 text-start text-sm text-neutral-500">{children}</div>
    </AsideLayout>
  </div>
)

export default Review
