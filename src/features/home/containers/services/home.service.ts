import services from "@configs/axiosGlobalConfig"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IRoomAvaliableResponse } from "@feature/home/interfaces/IHomeService"

const getHomeSlide = () =>
  new Promise<IGame[]>((resolve, reject) => {
    services
      // .get(`/game/banner/all`)
      .get(`/game/banner/all/new`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getGameRoomAvailable = () =>
  new Promise<IRoomAvaliableResponse>((resolve, reject) => {
    services
      .get(`/gameroom/get-available-room`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export { getHomeSlide, getGameRoomAvailable }
