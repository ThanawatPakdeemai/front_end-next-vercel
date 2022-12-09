import { Typography } from "@mui/material"
import React from "react"

export interface ICardBodySlide {
  title: string
  description: string
}

const CardBody = ({ title, description }: ICardBodySlide) => (
  <div className="content-body">
    <Typography
      variant="h1"
      className="py-6 uppercase"
    >
      {title}
    </Typography>
    <Typography
      className="text-black-default line-clamp-4"
      variant="body1"
      dangerouslySetInnerHTML={{
        __html: description
      }}
    />
  </div>
)

export default CardBody
