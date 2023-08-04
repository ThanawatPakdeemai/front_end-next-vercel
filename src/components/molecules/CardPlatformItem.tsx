import { ImageCustom } from "@components/atoms/image/Image"
import React from "react"
import { IPlatformList } from "@configs/platform"
import { Box, SxProps, Theme } from "@mui/material"
import Link from "next/link"

export interface ICardPlatformItemProps extends IPlatformList {
  className?: string
  sxCustomStyled?: SxProps<Theme>
}

const CardPlatformItem = ({
  sxCustomStyled = {},
  className,
  ...props
}: ICardPlatformItemProps) => {
  const cardChain = (
    <Box
      component="div"
      sx={sxCustomStyled}
      className={`card-chain flex min-w-[270px] flex-1 items-center gap-5 rounded-2xl border-[1px] border-neutral-700 bg-neutral-780 p-[20px_15px_15px] ${className}`}
    >
      <div className="card-chain__image">
        <ImageCustom
          src={props.icon as string}
          alt={props.title}
          width={60}
          height={60}
        />
      </div>
      <div className="card-chain__content">
        <h3 className="card-chain__content__title uppercase text-neutral-300">
          {props.title}
        </h3>
      </div>
    </Box>
  )

  return props.link ? <Link href={props.link}>{cardChain}</Link> : cardChain
}

export default CardPlatformItem
