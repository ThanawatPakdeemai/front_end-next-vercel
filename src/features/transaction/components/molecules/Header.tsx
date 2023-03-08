import React, { memo } from "react"
import DropdownEvent from "./DropdownEvent"

const Header = () => (
  <div className="flex justify-between uppercase">
    <div>
      <div className="text-[18px] text-neutral-400">history tRansactions</div>
      <div className="text-xs">Wallet manager for nakamoto.games world</div>
    </div>
    <DropdownEvent
      defaultValue="All"
      list={["all", "deposit", "withdraw"]}
    />
  </div>
)
export default memo(Header)
