import Triangle from "@components/atoms/Triangle"

export interface IMessageTextProps {
  message: string
  isMe: boolean
}
const MessageText = ({ message, isMe }: IMessageTextProps) => (
  <div className={`relative flex ${isMe ? "justify-end" : "justify-start"}`}>
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
    <div
      className={`w-fit max-w-[277px] break-words rounded-lg border-opacity-80 p-3 text-sm ${
        isMe
          ? "bg-neutral-300 text-neutral-900"
          : "border-[1px] border-neutral-700 bg-neutral-800 text-neutral-400"
      }`}
    >
      {message}
    </div>
  </div>
)

export default MessageText
