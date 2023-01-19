import React from "react"

interface IProp {
  currentPlayer: number
  maxPlayer?: number
}

const PlayersAmount = ({ currentPlayer, maxPlayer }: IProp) => (
  <span className="relative top-[2px] font-normal text-neutral-300">
    <span
      className={
        currentPlayer !== maxPlayer ? "text-neutral-500" : "text-neutral-300"
      }
    >
      {currentPlayer}
    </span>
    {` |`} {maxPlayer || 8}
  </span>
)

export default PlayersAmount
