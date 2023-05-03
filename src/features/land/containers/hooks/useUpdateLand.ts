import { useMutation } from "@tanstack/react-query"
import { updateLandBanner } from "../services/land.service"

const useUpdateLand = () => {
  const { mutateAsync: mutateUpdateLandBanner, isLoading } = useMutation({
    mutationKey: ["updateLand"],
    mutationFn: updateLandBanner,
    retry: false
  })

  return {
    mutateUpdateLandBanner,
    isLoading
  }
}

export default useUpdateLand
