import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"
import {
  ITournamentCheckStatusService,
  ITournamentData,
  ITournamentPlayerList,
  ITournamentRound
} from "@feature/tournament/interfaces/ITournament"

export interface ITourStore {
  data: ITournamentData | null
  currentLive: ITournamentCheckStatusService | null
  playersData: ITournamentPlayerList[]
  currentRound: ITournamentRound | null
  getTournamentData: () => ITournamentData | null
  getTournamentCurrentLive: () => ITournamentCheckStatusService | null
  getTournamentPlayersData: () => ITournamentPlayerList[]
  getTournamentCurrentRound: () => ITournamentRound | null
  setTournamentData: (_tour: ITournamentData) => void
  setTournamentCurrentLive: (_curLive: ITournamentCheckStatusService) => void
  setTournamentPlayer: (_player: ITournamentPlayerList[]) => void
  setTournamentCurrentRound: (_curRound: ITournamentRound) => void
  clearTournamentData: () => void
  clearTournamentCurrentLive: () => void
  clearTournamentPlayer: () => void
  clearTournamentCurrentRound: () => void
}

const useTournamentStore = create<ITourStore>()(
  devtools(
    (set, get) => ({
      data: null,
      currentLive: null,
      playersData: [],
      currentRound: null,
      getTournamentData: () => get().data,
      getTournamentCurrentLive: () => get().currentLive,
      getTournamentPlayersData: () => get().playersData,
      getTournamentCurrentRound: () => get().currentRound,
      setTournamentData: (_tour) => {
        set(() => ({ data: _tour }), false, "TournamentStore/setTournamentData")
      },
      setTournamentCurrentLive: (_curLive) => {
        set(
          () => ({ currentLive: _curLive }),
          false,
          "TournamentStore/setTournamentCurrentLive"
        )
      },
      setTournamentPlayer: (_player) => {
        set(
          () => ({ playersData: _player }),
          false,
          "TournamentStore/setTournamentPlayer"
        )
      },
      setTournamentCurrentRound: (_curRound) => {
        set(
          () => ({ currentRound: _curRound }),
          false,
          "TournamentStore/setTournamentCurrentRound"
        )
      },
      clearTournamentData: () => {
        set(
          () => ({ data: null }),
          false,
          "TournamentStore/clearTournamentData"
        )
      },
      clearTournamentCurrentLive: () => {
        set(
          () => ({ currentLive: null }),
          false,
          "TournamentStore/clearTournamentCurrentLive"
        )
      },
      clearTournamentPlayer: () => {
        set(
          () => ({ playersData: [] }),
          false,
          "TournamentStore/clearTournamentPlayer"
        )
      },
      clearTournamentCurrentRound: () => {
        set(
          () => ({ currentRound: null }),
          false,
          "TournamentStore/clearTournamentCurrentRound"
        )
      }
    }),
    configZustandDevTools("Tournament-Store")
  )
)

export default useTournamentStore
