import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { P2EHeaderMenu } from "@constants/gameSlide"
import useEventController from "@feature/event/containers/hooks/useEventController"
import GameCard from "@feature/game/components/molecules/GameCard"
import GameCardFullWidth from "@feature/game/components/molecules/GameCardFullWidth"
import { Box, Chip } from "@mui/material"
import React from "react"
import { v4 as uuid } from "uuid"

const EventContent = () => {
  const { limit, currentEventData, getGameMode, onSetGameStore } =
    useEventController()

  const renderEventContent = () => {
    // SKELETON
    if (!currentEventData) {
      return [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
    }

    // MANY GAMES
    if (
      currentEventData &&
      currentEventData.games_to_play &&
      currentEventData.games_to_play.length > 1
    ) {
      return currentEventData.games_to_play.map((game) => (
        <GameCard
          key={game.id}
          menu={P2EHeaderMenu}
          data={game}
          href={`/${getGameMode(game)}/${game.path}`}
          onHandleClick={() => onSetGameStore(game)}
          gameType={getGameMode(game)}
        />
      ))
    }

    // ONLY ONE GAME
    if (
      currentEventData &&
      currentEventData.games_to_play &&
      currentEventData.games_to_play.length === 1
    ) {
      return (
        <GameCardFullWidth
          image={currentEventData.games_to_play[0].image_home_banner}
          name={currentEventData.games_to_play[0].name}
          gameData={currentEventData.games_to_play[0]}
        />
      )
    }
  }

  return (
    <Box
      component="div"
      className="event-content h-full"
    >
      <div className="relative z-[1] mb-3 w-full rounded-2xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 uppercase text-neutral-300">
        <div className="flex items-center gap-3">
          <Chip
            label="Events"
            size="small"
            color="success"
          />
          <h2 className="truncate">{currentEventData?.name}</h2>
        </div>
      </div>
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full flex-wrap gap-4">
          {renderEventContent()}
        </div>
      </div>
    </Box>
  )
}

export default EventContent
