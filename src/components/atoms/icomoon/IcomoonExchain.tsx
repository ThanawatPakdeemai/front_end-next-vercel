import React from "react"
import { v4 as uuid } from "uuid"

const IcomoonExchain = ({ className }: { className: string }) => (
  <span className={`icon-exchain ${className}`}>
    {[...Array(10)].map((_, index) => (
      <span
        key={uuid()}
        className={`path${index + 1}`}
      />
    ))}
  </span>
)

export default IcomoonExchain
