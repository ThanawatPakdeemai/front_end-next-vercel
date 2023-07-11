import { useQuery, QueryClient } from "@tanstack/react-query"
import { IGetAvatar } from "@feature/avatar/interfaces/IAvatarService"
import useProfileStore from "@stores/profileStore"
import { getAllAvatar } from "../services/avatar.service"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
}) // Create a new instance of QueryClient

const useGetAvatar = () => {
  const profile = useProfileStore((state) => state.profile.data)

  const { data, error, isLoading, isError } = useQuery<IGetAvatar>({
    queryKey: ["all_avatar"],
    queryFn: () => getAllAvatar(),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!profile,
    onSuccess: (newData) => {
      // Set a cache time only when new data is updated
      if (newData && newData.data.length > 0) {
        queryClient.setQueryData(["all_avatar"], newData)
      }
    }
  })

  return {
    avatar: data?.data,
    error,
    isLoading,
    isError
  }
}

export default useGetAvatar
