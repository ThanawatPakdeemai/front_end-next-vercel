import React from "react"
import { IPlatformList } from "@configs/platform"
import { Box, SxProps, Theme } from "@mui/material"
import CardPlatformItem from "@components/molecules/CardPlatformItem"
import { v4 as uuidv4 } from "uuid"

interface ICardPlatformItemsProps {
  className?: string
  sxCustomStyled?: SxProps<Theme>
  items: IPlatformList[]
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
        icon={item.icon}
        link={item.link}
      />
    ))}
  </Box>
)

export default CardPlatformItems
