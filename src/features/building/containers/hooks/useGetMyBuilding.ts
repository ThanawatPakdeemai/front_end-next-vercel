import { useMutation } from "@tanstack/react-query"
import { getMyBuilding } from "../services/building.services"

const useGetMyBuilding = () => {
  const { mutateAsync: mutateGetOwnerBuilding, isLoading } = useMutation({
    mutationKey: ["getMyBuilding"],
    mutationFn: getMyBuilding,
    retry: false,
    cacheTime: Infinity
  })
  return { mutateGetOwnerBuilding, isLoading }
}
export default useGetMyBuilding
