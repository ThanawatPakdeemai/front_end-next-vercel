import Triangle from "../../../../components/atoms/Triangle"

export interface IMessageTextProps {
  message: string
  isMe: boolean
}
const MessageText = ({ message, isMe }: IMessageTextProps) => (
  <div
    className={`border-opacity-80rounded-2xl relative rounded-lg p-3 ${
      isMe
        ? "bg-neutral-300 text-neutral-900"
        : "border-[1px] border-neutral-700 bg-neutral-800"
    }`}
  >
    <div
      className={`absolute ${
        isMe ? "right-[15px]" : "left-[15px]"
      } top-[-15px] h-6 w-4`}
    >
      <Triangle
        position={`${isMe ? "left" : "right"}`}
        color={`${isMe ? "bg-neutral-300" : "bg-neutral-800"}`}
      />
    </div>
    {message}
  </div>
)

export default MessageText
