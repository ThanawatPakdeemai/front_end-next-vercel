import { useQuery } from "@tanstack/react-query"
import { IGetAvatar } from "@feature/avatar/interfaces/IAvatarService"
import { getAllAvatar } from "../services/avatar.service"

const useGetAvatar = () => {
  const { data, error, isLoading, isError } = useQuery<IGetAvatar>({
    queryKey: ["all_avatar"],
    queryFn: () => getAllAvatar(),
    keepPreviousData: true,
    staleTime: Infinity
  })

  if (isLoading) {
    return {
      isLoading
    }
  }
  if (isError) {
    return {
      isError,
      error
    }
  }
  if (data && data.data.length > 0) {
    const avatar = data.data
    return {
      avatar
    }
  }
  return {
    data: undefined
  }
}

export default useGetAvatar
