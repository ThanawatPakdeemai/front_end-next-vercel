import React from "react"

interface IProp {
  currentPlayer: number
  maxPlayer?: number
}

const PlayersAmount = ({ currentPlayer, maxPlayer }: IProp) => (
  <div className="player-amount__wrapper relative flex items-center gap-3 font-normal text-neutral-300 md:top-[2px]">
    <p
      className={`player-amount__text player-amount__current ${
        currentPlayer !== maxPlayer ? "text-neutral-500" : "text-neutral-300"
      }`}
    >
      {currentPlayer}
    </p>
    <p className="player-amount__text player-amount__text--divider">{` |`}</p>
    <p className="player-amount__text player-amount__text--max">
      {maxPlayer || 8}
    </p>
  </div>
)

export default PlayersAmount
