import HeaderWaitingRoom, {
  IHeaderWaitingRoomProp
} from "@components/organisms/HeaderWaitingRoom"
import { Box } from "@mui/material"
import React from "react"

export interface IGameSummaryContentProps extends IHeaderWaitingRoomProp {
  children: React.ReactNode
}

const GameSummaryContent = ({
  children,
  ...props
}: IGameSummaryContentProps) => (
  <Box
    component="section"
    className="game-summar--wrapper"
  >
    <HeaderWaitingRoom
      roomTag={props.roomTag}
      roomName={props.roomName}
      timer={{
        time: new Date(props.timer?.time || "")
      }}
      player={{
        currentPlayer: props.player?.currentPlayer || 0,
        maxPlayer: props.player?.maxPlayer || 0
      }}
      className="rounded-t-3xl border"
      onOutRoom={props.onOutRoom}
      isSummaryPage
    />
    <div className="game-summar--wrapper__content bg-neutral-700 p-4">
      {children}
    </div>
  </Box>
)

export default GameSummaryContent
