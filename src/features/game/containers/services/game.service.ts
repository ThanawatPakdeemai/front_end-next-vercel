import services from "@configs/axiosGlobalConfig"
import {
  IGameClaimEarnedRewardService,
  IGamePlayToEarnService,
  IGameReportService,
  IGameRoomDetail,
  IGameRoomDetailService,
  IGameSummary,
  IGameService,
  IGameRoomService,
  IGameCategoryService
} from "@feature/game/interfaces/IGameService"

export const getAllGames = () =>
  new Promise<IGameService>((resolve, reject) => {
    services
      .get<IGameService>(`/game/all`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getGameById = (_gameId: string) =>
  new Promise<IGameService>((resolve, reject) => {
    services
      .get<IGameService>(`/game/data/${_gameId}`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getAllGameRooms = (
  _gameId: string,
  _email: string,
  _itemId: string
) =>
  new Promise<IGameRoomDetailService>((resolve, reject) => {
    services
      .post<IGameRoomDetailService>(`/gameroom/${_gameId}/${_email}/${_itemId}`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getGameRoomById = (_roomId: string) =>
  new Promise<IGameRoomService>((resolve, reject) => {
    services
      .get<IGameRoomService>(`/gameroom/detail/${_roomId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

// why use put method?
export const getPlayerInRoom = (
  _roomId: string,
  _playerId: string,
  _type: string
) =>
  new Promise<IGameRoomDetail>((resolve, reject) => {
    const data = {
      room_id: _roomId,
      player_id: _playerId,
      type: _type
    }
    services
      .put<IGameRoomDetail>(`/gameroom/currentPlayer`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getSummaryGameByRoomId = (_roomId: string) =>
  new Promise<IGameSummary[]>((resolve, reject) => {
    services
      .get<IGameSummary[]>(`/summary/${_roomId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getHotGames = () =>
  new Promise<IGameService>((resolve, reject) => {
    services
      .get<IGameService>(`/game/hot/all`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getFreeGames = () =>
  new Promise<IGameService>((resolve, reject) => {
    services
      .get<IGameService>(`/game/free/all`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getStatisticsGameById = (_gameId: string) =>
  new Promise<IGameReportService>((resolve, reject) => {
    services
      .get<IGameReportService>(`/game/report/${_gameId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getGamesComingSoon = () =>
  new Promise<IGameService>((resolve, reject) => {
    services
      .get<IGameService>(`/game/get-game-coming-all`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getPlayToEarnRewardByPlayerId = (_playerId: string) =>
  new Promise<IGamePlayToEarnService>((resolve, reject) => {
    const data = {
      player_id: _playerId
    }
    services
      .post<IGamePlayToEarnService>(`/play-to-earn/get-reward-by-player`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const claimEarnedRewardByPlayerId = (
  _playerId: string,
  _rewardId: string
) =>
  new Promise<IGameClaimEarnedRewardService>((resolve, reject) => {
    const data = {
      player_id: _playerId,
      reward_id: _rewardId
    }
    services
      .post<IGameClaimEarnedRewardService>(
        `/play-to-earn/send-reward-to-player`,
        { ...data }
      )
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getAllCategory = () =>
  new Promise<IGameCategoryService>((resolve, reject) => {
    services
      .get<IGameCategoryService>(`/game-category/all`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getGameRoomWithoutEmail = (_gameId: string) =>
  new Promise<IGameRoomDetailService>((resolve, reject) => {
    services
      .get<IGameRoomDetailService>(`/gameroom/without-email/${_gameId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
