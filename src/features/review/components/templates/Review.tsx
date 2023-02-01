import React from "react"
import OverviewIcon from "@components/icons/OverviewIcon"
import AsideLayout from "@components/template/AsideLayout"
import ButtonLink from "@components/atoms/button/ButtonLink"
import AddIcon from "@mui/icons-material/Add"

const Review = () => (
  <div className="flex flex-col justify-start">
    <AsideLayout
      icon={<OverviewIcon />}
      title="Review AVG. 4.5"
      adornmentButton={
        <ButtonLink
          href="/"
          text="View All"
          icon={<AddIcon />}
          color="secondary"
          size="small"
          className="button-global button-transparent"
        />
      }
    >
      <div className="pl-6 pt-3 pr-3 text-start text-sm text-neutral-500" />
    </AsideLayout>
  </div>
)

export default Review
