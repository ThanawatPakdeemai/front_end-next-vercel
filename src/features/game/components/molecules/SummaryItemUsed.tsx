import { ImageCustom } from "@components/atoms/image/Image"
import { Box } from "@mui/material"
import React from "react"

export interface ISummaryItemUsedProps {
  usedAmount?: number
  itemAmount?: number
  itemName: string
  itemImage?: {
    white: string
    red: string
  }
}

const SummaryItemUsed = ({
  usedAmount,
  itemAmount,
  itemName,
  itemImage
}: ISummaryItemUsedProps) => (
  <Box
    component="div"
    className="used-item_wrapper mx-[10px] flex items-center justify-between gap-5 rounded border-[1px] border-neutral-800 bg-neutral-780 uppercase lg:h-[50px]"
  >
    <div className="used-item_wrapper__item flex h-full w-2/4 items-center justify-between gap-2 p-3">
      <div className="used-item_wrapper__item__amount">
        <span className="text-sm text-neutral-500">Used {itemName}:</span>
      </div>
      <div className="used-item_wrapper__item__icon flex items-center">
        <span className="mx-2 text-sm text-error-main">-{usedAmount}</span>
        {itemImage?.red && (
          <ImageCustom
            src={itemImage.red}
            alt={itemName}
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
    <div className="used-item_wrapper__item flex h-full w-2/4 items-center justify-between gap-2 border-l-[1px] border-neutral-800 p-3">
      <div className="used-item_wrapper__item__amount">
        <span className="text-sm text-neutral-500">My {itemName}:</span>
      </div>
      <div className="used-item_wrapper__item__icon flex items-center">
        <span className="mx-2 text-sm text-neutral-500">{itemAmount}</span>
        {itemImage?.white && (
          <ImageCustom
            src={itemImage.white}
            alt={itemName}
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  </Box>
)

export default SummaryItemUsed
