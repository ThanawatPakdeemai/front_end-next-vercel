import React from "react"
import { IList } from "@feature/become-developer/interfaces/IWebBecome"
import dynamic from "next/dynamic"

const CardFeaturedDeveloperItem = dynamic(
  () => import("@components/molecules/CardFeaturedDeveloperItem")
)

interface ICardFeaturedDeveloperItemsProps {
  items: IList[] | undefined
}

const CardFeaturedDeveloperItems = ({
  items
}: ICardFeaturedDeveloperItemsProps) => (
  <div className="card-featured-developer__items flex flex-wrap justify-center gap-5 lg:flex-nowrap">
    {items?.map((_elm) => (
      <CardFeaturedDeveloperItem
        key={_elm._id}
        image={_elm.image_url}
        subtitle={_elm.sub_title}
        title={_elm.title}
        description={_elm.detail}
      />
    ))}
  </div>
)

export default CardFeaturedDeveloperItems
