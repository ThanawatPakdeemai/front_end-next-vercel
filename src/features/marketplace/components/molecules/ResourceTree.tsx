import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import DropdownIcon from "@components/icons/DropdownIcon"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import useMarketFilterStore from "@stores/marketFilter"
import React, { useState } from "react"

interface IProps {
  _main: IGameItemListData
  _data: Array<IGameItemListData>
}

const ResourceTree = ({ _main, _data }: IProps) => {
  const { filterType, onSetFilterType } = useMarketFilterStore()
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <div className="relative w-full cursor-pointer">
      <div className="flex h-10 h-full w-full cursor-pointer flex-row items-center justify-between">
        <button
          type="button"
          className="flex h-full w-full flex-row items-center gap-x-2"
          onClick={() => {}}
        >
          <CheckBoxNaka
            value={
              !!_data.find((d) => filterType.game_item.find((f) => f === d._id))
            }
            text={_main.name}
            img={_main.image}
            onHandle={() => {
              const _status = !!_data.find((d) =>
                filterType.game_item.find((f) => f === d._id)
              )
              let updatedFilter
              if (_status) {
                updatedFilter = _data
                  .filter((d) => filterType.game_item.find((f) => f === d._id))
                  .map((d) => ({
                    value: d._id,
                    checked: _status
                  }))
              } else {
                updatedFilter = _data.map((d) => ({
                  value: d._id,
                  checked: _status
                }))
              }
              onSetFilterType("game_item", updatedFilter)
            }}
            fontStyle="w-full flex flex-row justify-start font-neue-machina text-sm"
            className="flex w-full flex-row items-center gap-x-2"
          />
        </button>
        <button
          type="button"
          onClick={() => setExpanded((prev: boolean) => !prev)}
        >
          <div
            className={`${
              expanded
                ? "rotate-180 transition-all duration-300"
                : "rotate-0 transition-all duration-300"
            }`}
          >
            <DropdownIcon />
          </div>
        </button>
      </div>
      <div
        className={`${expanded ? "visible" : "hidden"} w-full bg-neutral-800`}
      >
        {_data
          .filter((f) => f.name === _main.name)
          .map((g) => (
            <CheckBoxNaka
              key={g._id}
              value={!!filterType.game_item.find((f) => f === g._id)}
              text={`${g.name} ${g.item_size}`}
              img={_main.image}
              onHandle={() => {
                const updatedFilter = {
                  value: g._id,
                  checked: !!filterType.game_item.find((f) => f === g._id)
                }
                onSetFilterType("game_item", [updatedFilter])
              }}
              className="flex flex-row items-center gap-x-2 border-b border-neutral-680 pl-4"
            />
          ))}
      </div>
    </div>
  )
}

export default ResourceTree
