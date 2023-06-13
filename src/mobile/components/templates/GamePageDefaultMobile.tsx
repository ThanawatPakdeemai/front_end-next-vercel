import React from "react"

interface IGamePageDefaultMobileProps {
  component: React.ReactNode
}

const GamePageDefaultMobile = ({ component }: IGamePageDefaultMobileProps) => (
  <div className="game-page-default w-full">{component}</div>
)
export default GamePageDefaultMobile
