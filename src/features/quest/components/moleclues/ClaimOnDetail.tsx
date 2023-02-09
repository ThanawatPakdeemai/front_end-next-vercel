import useClaimQuestById from "@feature/quest/containers/hook/useClaimQuestById"
import { IQuestData } from "@feature/quest/interfaces/IQuestService"
import { useToast } from "@feature/toast/containers"
import React from "react"

interface IProp {
  data: IQuestData
  isComplete: boolean
}

const ClaimOnDetail = ({ data, isComplete }: IProp) => {
  const { mutateClaimQuestById } = useClaimQuestById()
  const { successToast, errorToast } = useToast()

  const handleClaim = (_questId: string) => {
    mutateClaimQuestById(_questId)
      .then((res) => successToast(res.message))
      .catch((error) => errorToast(error.message))
  }

  return (
    <div className="absolute bottom-0 flex h-[54px] w-full flex-row items-center justify-between gap-2 rounded-lg border border-neutral-700 bg-neutral-780 p-1">
      <div className="flex w-full justify-center rounded-[1px] border border-neutral-800 bg-neutral-900 px-5 py-4 uppercase">
        <span className="text-xs text-neutral-600">mission status :&nbsp;</span>
        {isComplete ? (
          <span className="text-xs text-varidian-default">COMPLETE</span>
        ) : (
          <span className="text-xs text-error-main">ON-GOING</span>
        )}
      </div>
      {!isComplete ? (
        <button
          type="button"
          className="h-full w-1/4 rounded-[20px] border border-neutral-700 bg-neutral-800 py-[8px] px-5 text-xs text-neutral-600"
          disabled
        >
          X&nbsp;&nbsp;&nbsp;&nbsp;Claim
        </button>
      ) : (
        data.claim_reward_progress !== "claimed" && (
          <button
            type="button"
            className="h-full w-1/4  rounded-[20px] border border-neutral-800 bg-varidian-default py-[8px] px-5 text-xs text-neutral-900"
            onClick={() => handleClaim(data.id)}
          >
            Claim
          </button>
        )
      )}
    </div>
  )
}

export default ClaimOnDetail
