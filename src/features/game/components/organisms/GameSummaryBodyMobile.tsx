/* eslint-disable no-unused-vars */
import React from "react"
import dayjs from "dayjs"
import { ISummaryItemUsedProps } from "@feature/game/containers/components/molecules/SummaryItemUsed"
import CardSummaryMain from "@feature/game/containers/components/molecules/CardSummaryMain"
import { Box } from "@mui/material"
import { ImageCustom } from "@components/atoms/image/Image"
import { IGame } from "@feature/game/interfaces/IGameService"

interface IProp extends ISummaryItemUsedProps {
  date: string | Date
  gameRaward: number
  gameImage: string
  gameName: string
  gameURLtoShare: string
  value: number
  hash: string
  title: string
  gameData: IGame
}

const GameSummaryBodyMobile = ({
  date,
  gameRaward,
  gameImage,
  gameName,
  gameURLtoShare,
  value,
  hash,
  title,
  gameData,
  ...props
}: IProp) => {
  const classesItem =
    "game-summary-body__item h-[54px] rounded-[20px] bg-[#18181C] p-[15px] font-urbanist flex justify-between items-center"
  const classesGameItemSummary = "game-summary-gameItem flex gap-4 items-center"
  const classesGameItemSummaryTitle =
    "font-urbanist text-[#919191] uppercase text-[10px] font-bold"
  const classesGameItemSummaryText =
    "flex items-center text-[#F2C94C] font-bold"

  const renderGameItem = () => {
    switch (gameData.game_mode) {
      case "free-to-earn":
      case "free-to-play":
      case "story-mode":
        return null
      default:
        return (
          <Box
            component="div"
            className={`${classesItem} flex-col items-stretch !justify-center`}
          >
            <div className="grid grid-cols-2">
              <div
                className={`${classesGameItemSummary} game-summary-gameItem__used`}
              >
                <span className={classesGameItemSummaryTitle}>Used Ticket</span>
                <div className={classesGameItemSummaryText}>
                  <span className="text-error-main">{props.usedAmount}</span>
                  {props.itemImage && props.itemImage.red && (
                    <Box
                      component="span"
                      className="relative h-8 w-8 p-[6px]"
                      sx={{
                        "picture": {
                          width: "100%",
                          height: "100%",
                          display: "block",
                          position: "relative"
                        }
                      }}
                    >
                      <ImageCustom
                        src={props.itemImage.red}
                        alt={props.itemName}
                        width={24}
                        height={24}
                        className="absolute h-full w-full object-contain object-center"
                      />
                    </Box>
                  )}
                </div>
              </div>
              <div
                className={`${classesGameItemSummary} game-summary-gameItem__balance`}
              >
                <span className={classesGameItemSummaryTitle}>My Items</span>
                <div className={classesGameItemSummaryText}>
                  <span className="font-semibold">{props.itemAmount}</span>
                  {props.itemImage && props.itemImage.white && (
                    <Box
                      component="span"
                      className="relative h-8 w-8 p-[6px]"
                      sx={{
                        "picture": {
                          width: "100%",
                          height: "100%",
                          display: "block",
                          position: "relative"
                        }
                      }}
                    >
                      <ImageCustom
                        src={props.itemImage.white}
                        alt={props.itemName}
                        width={24}
                        height={24}
                        className="absolute h-full w-full object-contain object-center"
                      />
                    </Box>
                  )}
                </div>
              </div>
            </div>
          </Box>
        )
    }
  }

  const renderGameReward = () => {
    switch (gameData.game_mode) {
      case "free-to-earn":
      case "free-to-play":
      case "story-mode":
        return null
      default:
        return (
          <Box
            id="game-summary-body__reward"
            component="div"
            className={classesItem}
          >
            <span className={classesGameItemSummaryTitle}>Game Reward</span>
            <span className={classesGameItemSummaryText}>{gameRaward}</span>
          </Box>
        )
    }
  }

  return (
    <div className="game-summary-body__mobile flex w-full flex-col items-center gap-6 px-2">
      <CardSummaryMain
        value={value}
        date={dayjs(date).format("DD MMM YYYY")}
        gameName={gameName}
        gameURLtoShare={gameURLtoShare}
        title={title}
      />
      <Box
        component="div"
        className="game-summary-body__list flex w-full flex-col gap-6"
      >
        {/* Game Item */}
        {renderGameItem()}

        {/* Game Reward */}
        {renderGameReward()}

        {/* My Reward */}
        <Box
          component="div"
          className={classesItem}
        >
          <span className={classesGameItemSummaryTitle}>{title}</span>
          <span className={classesGameItemSummaryText}>{value}</span>
        </Box>
      </Box>
    </div>
  )
}

export default GameSummaryBodyMobile
