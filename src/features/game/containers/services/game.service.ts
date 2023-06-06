import services from "@configs/axiosGlobalConfig"
import CONFIGS from "@configs/index"
import { IGameAllResponse } from "@feature/dropdown/interfaces/IDropdownService"
import {
  IGameClaimEarnedRewardService,
  IGamePlayToEarnService,
  IGameReportService,
  IGameRoomDetail,
  IGameRoomDetailService,
  IGameSummary,
  IGameService,
  IGameRoomService,
  IGameCategoryService,
  IGetAllGameRooms,
  IGetPlayerInRoom,
  IClaimEarnedRewardByPlayerId,
  IGetGameByTypesProps,
  IGetGameByTypes,
  IFilterGamesByKey,
  IResponseGameUpdatedPlaying,
  IOwnerCommission,
  IResponseOwnerCommissionData
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

export const getGameByPath = (_gamePath: string) =>
  new Promise<IGameService>((resolve, reject) => {
    services
      .get<IGameService>(`/game/data-by-path/${_gamePath}`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getAllGameRooms = ({
  _gameId,
  _email,
  _itemId
}: IGetAllGameRooms) =>
  new Promise<IGameRoomDetailService>((resolve, reject) => {
    if (_gameId !== "" && _email !== "" && _itemId !== "") {
      services
        .post<IGameRoomDetailService>(
          `/gameroom/${_gameId}/${_email}/${_itemId}`
        )
        .then((reponse) => resolve(reponse.data))
        .catch((error) => reject(error))
    }
  })

export const getGameRoomById = (_roomId: string) =>
  new Promise<IGameRoomService>((resolve, reject) => {
    services
      .get<IGameRoomService>(`/gameroom/detail/${_roomId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

// why use put method?
export const getPlayerInRoom = ({
  _roomId,
  _playerId,
  _type
}: IGetPlayerInRoom) =>
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

export const claimEarnedRewardByPlayerId = ({
  _playerId,
  _rewardId
}: IClaimEarnedRewardByPlayerId) =>
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
      // .get<IGameCategoryService>(`/game-category/all`)
      .get<IGameCategoryService>(`/game-category/all/new`)
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

export const getGameByTypes = ({
  _type,
  _limit,
  _page,
  _categoryId,
  _deviceSup,
  _itemId,
  _search
}: IGetGameByTypesProps) =>
  new Promise<IGetGameByTypes>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      category_id: _categoryId,
      device_support: _deviceSup,
      item_id: _itemId,
      search: _search
    }
    services
      .post<IGetGameByTypes>(`/game/${_type}`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getGamesByKey = (data: IFilterGamesByKey) =>
  new Promise<IGameAllResponse>((resolve, reject) => {
    services
      .post<IGameAllResponse>(
        `${CONFIGS.BASE_URL.API}/game/filter/game-all-new`,
        data
      )
      // .post<IGameAllResponse>(
      //   `${CONFIGS.BASE_URL.API}/game/filter/game-all`,
      //   data
      // )
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

export const getMyGameNFT = (data: IFilterGamesByKey) =>
  new Promise<IGameService>((resolve, reject) => {
    services
      .post<IGameService>(`${CONFIGS.BASE_URL.API}/game/NFT/my-game`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const updatePlayCounting = (gameId: string) =>
  new Promise<IResponseGameUpdatedPlaying>((resolve, reject) => {
    services
      .put<IResponseGameUpdatedPlaying>(
        `${CONFIGS.BASE_URL.API}/game/stat-play-data/${gameId}`
      )
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const checkGameOwner = (data: IOwnerCommission) =>
  new Promise<IResponseOwnerCommissionData>((resolve, reject) => {
    services
      .post<IResponseOwnerCommissionData>(
        `${CONFIGS.BASE_URL.API}/game/NFT/game-owner/commission`,
        data
      )
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
