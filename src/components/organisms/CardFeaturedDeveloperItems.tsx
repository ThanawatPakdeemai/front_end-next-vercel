import React from "react"
import CardFeaturedDeveloperItem from "@components/molecules/CardFeaturedDeveloperItem"
import { IList } from "@feature/become-developer/interfaces/IWebBecome"

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
