import GameItemSingleCard from "@components/atoms/GameItemSingleCard"
import NoData from "@components/molecules/NoData"
import { IGameItemList } from "@feature/gameItem/interfaces/IGameItemService"
import { Box } from "@mui/material"
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
      <ul className="mx-[6px] mb-[6px] mt-[6px] flex flex-wrap items-center gap-3">
        {typeof gameItems !== "string" &&
          gameItems.map((item, index: number) => (
            <Box
              component="div"
              key={Number(index)}
              className="my-1"
            >
              <GameItemSingleCard
                image={item.image}
                name={`${item.name} ${item.price.toString()}`}
                description={`${item.name} ${item.price.toString()}$`}
                showLink
                itemId={item._id}
              />
              {/* <MenuItemCustom
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
              /> */}
            </Box>
          ))}
      </ul>
    ) : (
      <NoData className="" />
    )}
  </div>
)

export default GameItemsBody
