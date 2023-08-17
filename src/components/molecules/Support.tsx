import React from "react"
import { IGameSupport } from "@feature/game/interfaces/IGameService"
import dynamic from "next/dynamic"

const DeviceSupport = dynamic(() => import("@components/atoms/DeviceSupport"), {
  suspense: true,
  ssr: false
})

interface ISupport {
  items: IGameSupport[]
  name: string
}

const Support = ({ items, name }: ISupport) => (
  <div className="game-support flex items-center justify-center gap-2">
    <div className="game-support__title text-sm">
      <span className="uppercase text-neutral-600">{`${name}:`}</span>
    </div>
    <div className="game-support__list flex">
      {items &&
        items.length > 0 &&
        items.map((_item: IGameSupport) => (
          <DeviceSupport
            key={_item.key}
            type={_item.key}
            support={_item.supported}
          />
        ))}
    </div>
  </div>
)

export default Support
