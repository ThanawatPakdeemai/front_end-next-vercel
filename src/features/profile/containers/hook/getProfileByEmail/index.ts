import { useQuery } from "@tanstack/react-query"
import { getProfileByEmail } from "../../services/profile.service"

const useGetProfileByEmail = (_email: string) => {
  const {
    data: profile,
    error,
    isLoading,
    isError
  } = useQuery(["profile"], () => getProfileByEmail(_email), {
    enabled: _email !== "" || _email !== undefined
  })

  return {
    profile: profile || undefined,
    error,
    isLoading,
    isError
  }
}

export default useGetProfileByEmail
