import { IMessageTextProps } from "../components/atoms/MessageText"

export interface IChat extends IMessageTextProps {
  username: string
  avatar: string
  player_id: string
  time: string
}
