import React from "react"

interface IGamePlayTimeProps {
  playTime: number
}
const GamePlayTime = ({ playTime }: IGamePlayTimeProps) => (
  <h2 className="text-neutral-600">
    Play:
    <span className="ml-2 text-info-main">{playTime}</span>
  </h2>
)

export default GamePlayTime
