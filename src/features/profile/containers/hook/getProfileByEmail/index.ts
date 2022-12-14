import { useQuery } from "@tanstack/react-query"
import { getProfileByEmail } from "../../services/profile.service"

const useGetProfileByEmail = (_email: string) => {
  const {
    data: profile,
    error,
    isLoading,
    isError
  } = useQuery(["profile"], () => getProfileByEmail(_email))
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
  if (profile) {
    return {
      profile
    }
  }
  return {
    profile: undefined
  }
}

export default useGetProfileByEmail
