import { Box } from "@mui/material"
import React from "react"
import { MobileView } from "react-device-detect"
import dynamic from "next/dynamic"
import { isMobile } from "@hooks/useGlobal"
import { IHeaderWaitingRoomProp } from "@components/organisms/HeaderWaitingRoom"

const HeaderWaitingRoom = dynamic(
  () => import("@components/organisms/HeaderWaitingRoom")
)

export interface IGameSummaryContentProps extends IHeaderWaitingRoomProp {
  children: React.ReactNode
}

const GameSummaryContent = ({
  children,
  ...props
}: IGameSummaryContentProps) => (
  <Box
    component="section"
    className="game-summar--wrapper w-full"
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
    {isMobile ? (
      <MobileView>
        <div className="w-full">{children}</div>
      </MobileView>
    ) : (
      <div className="game-summar--wrapper__content bg-neutral-800 p-4">
        {children}
      </div>
    )}
  </Box>
)

export default GameSummaryContent
