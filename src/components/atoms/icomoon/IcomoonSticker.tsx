import React from "react"
import { v4 as uuid } from "uuid"

const IcomoonSticker = ({ className }: { className: string }) => (
  <span className={`icon-sticker ${className}`}>
    {[...Array(50)].map((_, index) => (
      <span
        key={uuid()}
        className={`path${index + 1}`}
      />
    ))}
  </span>
)

export default IcomoonSticker
