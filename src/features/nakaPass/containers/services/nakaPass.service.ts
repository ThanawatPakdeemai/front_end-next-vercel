import services from "@configs/axiosGlobalConfig"

export const getNakaPass = ({ player_id, game_id }) =>
  new Promise((resolve, reject) => {
    services
      .put(`/game/story-mode/season-pass`, {
        player_id,
        game_id
      })
      .then((_res) =>
        resolve({
          status: true
        })
      )
      .catch((_error) => reject(_error))
  })
