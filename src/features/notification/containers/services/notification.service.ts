import services from "@configs/axiosGlobalConfig"
import { INotification } from "@feature/notification/interfaces/INotificationService"

export const getNotificationById = (_limit: number, _skip: number) =>
  new Promise<INotification[]>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _skip
    }
    services
      .post<INotification[]>(`/notification`, { ...data })
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

// return true
export const updateNotiStatusById = (_notiId: string) =>
  new Promise((resolve, reject) => {
    const data = {
      noti_id: _notiId
    }
    services
      .put(`/notification/updateStatus`, { ...data })
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

// return true
export const updateAllNotiStatus = (_playerId: string) =>
  new Promise((resolve, reject) => {
    const data = {
      player_id: _playerId
    }
    services
      .put(`/notification/update-status-all`, { ...data })
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })
