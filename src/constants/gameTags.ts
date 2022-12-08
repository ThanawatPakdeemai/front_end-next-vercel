// const GAME_TYPES = {
//   storymode: "Story mode",
//   singleplayer: "Single Player",
//   multiplayer: "Muiti player"
// }

export interface IGameTagSlide {
  id: number
  text: string
  link?: string
}

const GAME_TAGS: IGameTagSlide[] = [
  { id: 0, text: "Free", link: "" },
  { id: 1, text: "action", link: "" },
  { id: 2, text: "singleplayer", link: "" },
  { id: 3, text: "Hot", link: "" }
]

export default GAME_TAGS
