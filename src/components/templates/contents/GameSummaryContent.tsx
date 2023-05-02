import HeaderWaitingRoom, {
  IHeaderWaitingRoomProp
} from "@components/organisms/HeaderWaitingRoom"
import CONFIGS from "@configs/index"
import { Box } from "@mui/material"
import React from "react"
import { BrowserView, MobileView } from "react-device-detect"

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
    <BrowserView>
      <div className="game-summar--wrapper__content bg-neutral-800 p-4">
        {children}
      </div>
    </BrowserView>
    {CONFIGS.DISPLAY_MOBILE_MODE === "true" && (
      <MobileView>
        <div className="w-full">{children}</div>
      </MobileView>
    )}
  </Box>
)

export default GameSummaryContent
