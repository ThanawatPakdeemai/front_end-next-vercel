import React from "react"

interface IProp {
  currentPlayer: number
  maxPlayer?: number
}

const PlayersAmount = ({ currentPlayer, maxPlayer }: IProp) => (
  <div className="relative top-[2px] flex items-center gap-3 font-normal text-neutral-300">
    <p
      className={
        currentPlayer !== maxPlayer ? "text-neutral-500" : "text-neutral-300"
      }
    >
      {currentPlayer}
    </p>
    <p>{` |`}</p>
    <p>{maxPlayer || 8}</p>
  </div>
)

export default PlayersAmount
