import { TGameType } from "@feature/game/interfaces/IGameService"

export interface IFormJoinUsData {
  name: string
  email: string
  gameName: string
  gameType: TGameType
  gameDescription: string
  link: string
}

const useFormJoinUsController = () => {
  const onSubmitRegister = () => {}

  return { onSubmitRegister }
}

export default useFormJoinUsController
