import useTopPlayFreeToEarn from "@feature/ranking/containers/hook/useTopPlayFreeToEarn"
import { IPlayerPlayToEarnRanking } from "@feature/ranking/interfaces/IRanking"
import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import CardTitle from "@components/organisms/CardTitle"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import SkeletonTopPlayer from "@components/atoms/skeleton/SkeletonTopPlayer"
import { v4 as uuid } from "uuid"
import NoData from "@components/molecules/NoData"
import CardRankFreeToEarn from "@components/organisms/CardRankFreeToEarn"
import { IGameItemList } from "@feature/gameItem/interfaces/IGameItemService"
import { IPlayer } from "./TopPlayer"

interface ITopPlayerFreeToEarn extends IPlayer {
  gameId: string
  gameItem: IGameItemList
  total: number
}

const TopPlayerFreeToEarn = ({
  gameId,
  total,
  gameItem,
  ...props
}: ITopPlayerFreeToEarn) => {
  const { topPlayerFreeToEarnData, isLoadingTopPlayerFreeToEarn } =
    useTopPlayFreeToEarn(gameId, total)

  const [topPlayer, setTopPlayer] = useState<IPlayerPlayToEarnRanking[]>([])

  const renderRankContent = () => {
    if (!topPlayer.length) {
      return <NoData />
    }

    if (topPlayerFreeToEarnData && topPlayerFreeToEarnData.length > 0) {
      return (
        <div className="top-player__content h-[calc(100%-136px)] w-[calc(100%)] p-[14px_10px_20px_10px]">
          <div className="top-player__header grid grid-cols-4 gap-2 font-neue-machina-semi text-xs uppercase text-white-primary">
            <div>No</div>
            <div className="top-player__header-item">Avatar</div>
            <div className="top-player__header-item ml-auto">Item</div>
            <div className="top-player__header-item ml-auto pr-2">Score</div>
          </div>
          <div className="custom-scroll h-[340px] overflow-y-scroll">
            {topPlayer.map((item, index) => (
              <CardRankFreeToEarn
                key={uuid()}
                index={index}
                player={item}
                itemSrc={gameItem.image_icon || ""}
                itemName={gameItem.name || ""}
                itemPrice={gameItem.price}
              />
            ))}
          </div>
        </div>
      )
    }
  }

  useEffect(() => {
    let load = false
    if (!load) {
      if (topPlayerFreeToEarnData && topPlayerFreeToEarnData.length > 0) {
        setTopPlayer(topPlayerFreeToEarnData)
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topPlayerFreeToEarnData])

  return (
    <Box
      component="div"
      className="top-player__wrapper relative rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780"
      sx={{
        ".top-player__wrapper-inner": {
          position: "relative",
          width: "100%",
          "&:before": {
            content: '""',
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "74px",
            width: "100%",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)"
          }
        }
      }}
    >
      <CardTitle
        width="534px"
        icon={<TrackChangesIcon className="mr-2" />}
        subtitle={props.subtitle}
        background={props.background}
        elevation={props.elevation}
        sumTotal={10}
        rightContent={props.rightContent}
        title="Top player reward"
      />

      {isLoadingTopPlayerFreeToEarn ? (
        <div className="custom-scroll mx-[30px] my-3 h-[270px] w-full overflow-y-scroll">
          {[...Array(10)].map((index) => (
            <SkeletonTopPlayer
              key={uuid()}
              className={index > 2 ? "!bg-neutral-700" : "!bg-neutral-900"}
            />
          ))}
        </div>
      ) : (
        renderRankContent()
      )}
    </Box>
  )
}

export default TopPlayerFreeToEarn
