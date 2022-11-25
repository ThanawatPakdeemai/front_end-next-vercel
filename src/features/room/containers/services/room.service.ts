import services from "@src/configs/axiosGlobalConfig"

const getRoomAtHome = (game_id: string) =>
  new Promise<any>((resolve, reject) => {
    if (game_id) {
      services
        .get(`/gameroom/get-game-id/${game_id}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { getRoomAtHome }
