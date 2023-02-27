/* eslint-disable no-new */
import services from "@configs/axiosGlobalConfig"
import {
  IDataPlayerInfoResponse,
  IGetDataPlayerInfo,
  IGetPlayerInfoByPlayerId,
  IGetProfileResponse,
  IPlayerInfoResponse,
  IProfile,
  IUpdateProfile,
  IUpdateWalletAddress
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

export const updateProfile = ({
  _email,
  _username,
  _avatar,
  _subscription,
  _country,
  _user_ip_address
}: IUpdateProfile) =>
  new Promise<IProfile>((resolve, reject) => {
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
      .put<IProfile>(`/profile/update`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const updateWalletAddress = ({
  _email,
  _address
}: IUpdateWalletAddress) =>
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

export const getDataPlayerInfo = ({
  _playerId,
  _gameId,
  _limit,
  _page,
  _sort
}: IGetDataPlayerInfo) =>
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

export const getPlayerInfoByPlayerId = ({
  _playerId,
  _limit,
  _page,
  _sort,
  _cheat,
  _rewards_send_status
}: IGetPlayerInfoByPlayerId) =>
  new Promise<IPlayerInfoResponse>((resolve, reject) => {
    const data = {
      player_id: _playerId,
      limit: _limit,
      skip: _page,
      sort: _sort,
      cheat: _cheat,
      rewards_send_status: _rewards_send_status
    }
    services
      .post<IPlayerInfoResponse>(`/profile/player-info`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getGeoInfo = () => {
  const promise = new Promise((resolve, reject) => {
    const urlGetCountry = "https://ipapi.co/json/"
    fetch(urlGetCountry)
      .then((response) => {
        resolve(response.json())
      })
      .catch((error) => reject(error))
  })

  return Promise.resolve(promise)
}
