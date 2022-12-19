import React from "react"

interface IProp {
  icon: React.ReactNode
  textColor: string
  text: string
}

const InsideTagLine = ({ icon, textColor, text }: IProp) => (
  <div className="mr-6 flex w-full items-center">
    <div className="pr-6">{icon}</div>
    <p className={`${textColor} whitespace-nowrap uppercase`}>{text}</p>
  </div>
)

export default InsideTagLine
