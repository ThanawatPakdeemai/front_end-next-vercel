import { useQuery } from "@tanstack/react-query"
import { getProfileByEmail } from "@src/features/profile/containers/services/profile.service"

const useGetProfileByEmail = (_email: string) => {
  const {
    data: profile,
    error,
    isLoading,
    isError
  } = useQuery(["profile"], () => getProfileByEmail(_email), {
    enabled: !!_email,
    retry: false
  })

  return {
    profile,
    error,
    isLoading,
    isError
  }
}

export default useGetProfileByEmail
