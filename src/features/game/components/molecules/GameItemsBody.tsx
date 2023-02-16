import { Image } from "@components/atoms/image/index"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import NoData from "@components/molecules/NoData"

import { IGameItemList } from "@feature/gameItem/interfaces/IGameItemService"
import { Box, MenuList } from "@mui/material"
import React from "react"

interface IProps {
  gameItems: IGameItemList[] | string
}

// TODO: Improve this component design

const GameItemsBody = ({ gameItems }: IProps) => (
  <div
    id="game--items"
    className="mb-4 flex gap-10"
  >
    {gameItems && gameItems.length > 0 ? (
      <MenuList className="mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 px-[6px] py-[3px]">
        {typeof gameItems !== "string" &&
          gameItems.map((item, index: number) => (
            <Box
              key={Number(index)}
              className="my-1"
            >
              <MenuItemCustom
                label={`${item.name} ${item.price.toString()}`}
                icon={
                  <Image
                    src={item.image_icon}
                    alt={item.name}
                    width={20}
                    height={20}
                  />
                }
                href={item.image_icon || ""}
                id=""
                external={false}
              />
            </Box>
          ))}
      </MenuList>
    ) : (
      <NoData className="" />
    )}
  </div>
)

export default GameItemsBody
