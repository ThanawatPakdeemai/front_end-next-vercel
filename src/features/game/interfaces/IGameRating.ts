export interface IGameRatingServ {
  percent: number
  count: {
    like: number
    dislike: number
  }
}
