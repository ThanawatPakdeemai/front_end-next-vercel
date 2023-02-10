import { useMutation } from "@tanstack/react-query"
import { claimQuestById } from "../services/quest.service"

const useClaimQuestById = () => {
  const {
    data: claimRespondData,
    error,
    isLoading,
    isError,
    mutateAsync: mutateClaimQuestById
  } = useMutation((_questId: string) => claimQuestById(_questId), {
    retry: false
  })

  return {
    claimRespondData,
    isLoading,
    isError,
    error,
    mutateClaimQuestById
  }
}

export default useClaimQuestById
