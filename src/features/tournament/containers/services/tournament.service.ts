import services from "@src/configs/axiosGlobalConfig"
import {
  ITournamentPlayerService,
  ITournamentCheckStatusService,
  ITournamentHistoryService,
  ITournamentLiveService,
  ITournamentMatchRoomService,
  ITournamentMatchService,
  ITournamentPlayerListService,
  ITournamentService
} from "../../interfaces/ITournament"

export const registerTournament = (_tournamentId: string) =>
  new Promise<ITournamentPlayerService>((resolve, reject) => {
    const data = {
      tournament_id: _tournamentId
    }
    services
      .post<ITournamentPlayerService>(
        `/tournament/create-player/${_tournamentId}`,
        { ...data }
      )
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getTournamentPlayerRegister = (
  _limit: number,
  _page: number,
  _sort: string
) =>
  new Promise<ITournamentPlayerListService>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      sort: _sort
    }
    services
      .post<ITournamentPlayerListService>(`/tournament/get-player`, { ...data })
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getTournamentPlayerInfo = () =>
  new Promise<ITournamentHistoryService>((resolve, reject) => {
    services
      .get<ITournamentHistoryService>(`/tournament/getuser`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getTournament = () =>
  new Promise<ITournamentService>((resolve, reject) => {
    services
      .get<ITournamentService>(`/tournament/get-tournament`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getTournamentMatch = () =>
  new Promise<ITournamentMatchService>((resolve, reject) => {
    services
      .get<ITournamentMatchService>(`/tournament/get-match-tournament`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getTournamentCurrentMatch = (_tournamentId: string) =>
  new Promise<ITournamentLiveService>((resolve, reject) => {
    services
      .get<ITournamentLiveService>(
        `/tournament/get-match-playing/${_tournamentId}`
      )
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getTournamentSummary = (_tournamentId: string) =>
  new Promise<ITournamentMatchRoomService>((resolve, reject) => {
    services
      .get<ITournamentMatchRoomService>(
        `/tournament/find-match-by-room/${_tournamentId}`
      )
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

// check

export const checkTournamentTicketPlayerUsed = (_tournamentId: string) =>
  new Promise<ITournamentCheckStatusService>((resolve, reject) => {
    services
      .get<ITournamentCheckStatusService>(
        `/tournament/check-ticket/${_tournamentId}`
      )
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const checkTournamentTimeUserPlayed = (_tournamentId: string) =>
  new Promise<ITournamentCheckStatusService>((resolve, reject) => {
    services
      .get<ITournamentCheckStatusService>(
        `/tournament/check-user-play/${_tournamentId}`
      )
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const checkTournamentPlayerPlayed = (_tournamentId: string) =>
  new Promise<ITournamentPlayerService>((resolve, reject) => {
    services
      .get<ITournamentPlayerService>(
        `/tournament/check-player-tournament/${_tournamentId}`
      )
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })
