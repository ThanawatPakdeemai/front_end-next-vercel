import MessageInfo from "../atoms/MessageInfo"
import MessageText, { IMessageTextProps } from "../atoms/MessageText"

export interface IMessageBodyProps extends IMessageTextProps {
  avatar: string
  username: string
  date: string
}

const MessageBody = ({
  avatar,
  username,
  date,
  ...props
}: IMessageBodyProps) => (
  // const { ref: msgElement, inView: msgInView } = useInView({ threshold: 0 })
  // const [selectedProfileAddress, setSelectedProfileAddress] = useState<string>()
  // const onSelectedProfileAddress = (userAddress: string) => {
  //   setSelectedProfileAddress(userAddress)
  //   onVisibleProfileModal()
  // }

  <div className="mb-4 flex flex-col gap-2">
    <MessageInfo
      avatar={avatar}
      username={username}
      date={date}
      isMe={props.isMe}
    />
    <MessageText
      message={props.message}
      isMe={props.isMe}
    />
  </div>
)

export default MessageBody
