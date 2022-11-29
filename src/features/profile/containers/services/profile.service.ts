import services from "@configs/axiosGlobalConfig"
import {
  IDataPlayerInfoResponse,
  IGetProfileResponse,
  IPlayerInfoResponse,
  IProfile
} from "@feature/profile/interfaces/IProfileService"

export const getProfileByEmail = (_email: string) =>
  new Promise<IProfile>((resolve, reject) => {
    services
      .get<IProfile>(`/profile/${_email}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getProfileByPlayerId = (_playerId: string) =>
  new Promise<IGetProfileResponse>((resolve, reject) => {
    services
      .get<IGetProfileResponse>(`/profile/user/${_playerId}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const updateProfile = (
  _email: string,
  _username: string,
  _avatar: string,
  _subscription: boolean,
  _country: string,
  _user_ip_address: string
) =>
  new Promise((resolve, reject) => {
    const data = {
      data: {
        email: _email,
        username: _username,
        avatar: _avatar,
        subscription: _subscription,
        country: _country,
        user_ip_address: _user_ip_address
      }
    }
    services
      .put(`/profile/update`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const updateWalletAddress = (_email: string, _address: string) =>
  new Promise<IProfile>((resolve, reject) => {
    const data = {
      data: {
        email: _email,
        address: _address
      }
    }
    services
      .put<IProfile>(`/profile/wallet`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getDataPlayerInfo = (
  _playerId: string,
  _gameId: string,
  _limit: number,
  _page: number,
  _sort: string
) =>
  new Promise<IDataPlayerInfoResponse>((resolve, reject) => {
    const data = {
      player_id: _playerId,
      limit: _limit,
      skip: _page,
      sort: _sort,
      game_id: _gameId
    }
    services
      .post<IDataPlayerInfoResponse>(`/profile/dataplayerinfo`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getPlayerInfoByPlayerId = (
  _playerId: string,
  _limit: number,
  _page: number,
  _sort: string
) =>
  new Promise<IPlayerInfoResponse>((resolve, reject) => {
    const data = {
      player_id: _playerId,
      limit: _limit,
      skip: _page,
      sort: _sort
    }
    services
      .post<IPlayerInfoResponse>(`/profile/player-info`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
