import { useMutation } from "@tanstack/react-query"
import { getMyNakapunk } from "../services/nakapunk.service"

const useGetMyNakaPunk = () => {
  const { mutateAsync: mutateGetMyNakaPunk, isLoading } = useMutation({
    mutationKey: ["getMyNakapunk"],
    mutationFn: getMyNakapunk,
    retry: false,
    cacheTime: Infinity
  })
  return { mutateGetMyNakaPunk, isLoading }
}
export default useGetMyNakaPunk
