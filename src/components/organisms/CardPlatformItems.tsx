import React from "react"
import { Box, SxProps, Theme } from "@mui/material"
import CardPlatformItem from "@components/molecules/CardPlatformItem"
import { v4 as uuidv4 } from "uuid"
import { IList } from "@feature/become-developer/interfaces/IWebBecome"

interface ICardPlatformItemsProps {
  className?: string
  sxCustomStyled?: SxProps<Theme>
  items: IList[]
}

const CardPlatformItems = ({
  className,
  sxCustomStyled,
  items
}: ICardPlatformItemsProps) => (
  <Box
    component="div"
    sx={sxCustomStyled}
    className={`card-platform-list flex flex-wrap gap-5 ${className}`}
  >
    {items.map((item) => (
      <CardPlatformItem
        key={uuidv4()}
        title={item.title}
        icon={item.image_url}
        link={item.detail}
      />
    ))}
  </Box>
)

export default CardPlatformItems
