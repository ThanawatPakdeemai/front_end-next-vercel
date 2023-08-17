import React from "react"
import { v4 as uuid } from "uuid"

const IcomoonWallet = ({ className }: { className: string }) => (
  <span className={`icon-wallet ${className}`}>
    {[...Array(50)].map((_, index) => (
      <span
        key={uuid()}
        className={`path${index + 1}`}
      />
    ))}
  </span>
)

export default IcomoonWallet
