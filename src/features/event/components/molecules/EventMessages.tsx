import React from "react"

interface IEventMessagesProp {
  messages: string
}
const EventMessages = ({ messages }: IEventMessagesProp) => (
  <div className="rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 md:my-2  md:px-16 md:py-8 md:text-center md:text-base">
    <div
      className="text-green-default font-dogicapixel-bold text-center text-[15px]"
      dangerouslySetInnerHTML={{
        __html: messages
      }}
    />
  </div>
)

export default EventMessages
