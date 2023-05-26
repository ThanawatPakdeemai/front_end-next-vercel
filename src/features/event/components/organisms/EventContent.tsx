import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import useEventController from "@feature/event/containers/hooks/useEventController"
import GameCard from "@feature/game/components/molecules/GameCard"
import { Box, Chip } from "@mui/material"
import React from "react"
import { v4 as uuid } from "uuid"

const EventContent = () => {
  const { limit, currentEventData, getTypeGamePathFolder, onSetGameStore } =
    useEventController()
  return (
    <Box component="div">
      <div className="relative z-[1] mb-3 w-full rounded-2xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 uppercase text-neutral-300">
        <div className="flex items-center gap-3">
          <Chip
            label="Events"
            size="small"
            color="success"
          />
          <h2>{currentEventData?.name}</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {!currentEventData
          ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
          : currentEventData &&
            currentEventData.games_to_play &&
            currentEventData.games_to_play.map((game) => (
              <GameCard
                key={game.id}
                menu={P2EHeaderMenu}
                data={game}
                href={`/${getTypeGamePathFolder(game)}/${game.path}`}
                onHandleClick={() => onSetGameStore(game)}
                gameType={getTypeGamePathFolder(game)}
              />
            ))}
      </div>
    </Box>
  )
}

export default EventContent
