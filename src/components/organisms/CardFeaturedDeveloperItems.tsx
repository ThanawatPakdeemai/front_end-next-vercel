import React from "react"
import { IFeatureProps } from "@constants/features"
import CardFeaturedDeveloperItem from "@components/molecules/CardFeaturedDeveloperItem"
import { v4 as uuidv4 } from "uuid"

interface ICardFeaturedDeveloperItemsProps {
  items: IFeatureProps[]
}

const CardFeaturedDeveloperItems = ({
  items
}: ICardFeaturedDeveloperItemsProps) => (
  <div className="card-featured-developer__items flex flex-wrap justify-center gap-5 lg:flex-nowrap">
    {items.map((ele) => (
      <CardFeaturedDeveloperItem
        key={uuidv4()}
        image={ele.image}
        subtitle={ele.subtitle}
        title={ele.title}
        description={ele.description}
      />
    ))}
  </div>
)

export default CardFeaturedDeveloperItems
