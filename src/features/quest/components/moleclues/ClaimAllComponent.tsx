import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import AddIcon from "@mui/icons-material/Add"
import React from "react"

interface IProp {
  count?: number
  handleClaimAll: () => void
}

const ClaimAllComponent = ({ count, handleClaimAll }: IProp) => (
  <div className="flex h-[54px] w-full flex-row items-center justify-center gap-[15px] rounded-lg border border-neutral-700 bg-neutral-780 p-1">
    <div className="flex w-[335px] items-center justify-between rounded-[1px] border border-neutral-800 bg-neutral-900 px-5">
      <span className="text-xs uppercase text-neutral-600">
        total mission complete
      </span>
      <span className="font-digital-7 text-[26px] text-varidian-default">
        {count}
      </span>
    </div>
    <ButtonToggleIcon
      startIcon={<AddIcon className="text-neutral-300" />}
      text="Claim all"
      className="w-[148px] rounded-lg border border-neutral-700 text-neutral-300"
      handleClick={handleClaimAll}
    />
  </div>
)

export default ClaimAllComponent
