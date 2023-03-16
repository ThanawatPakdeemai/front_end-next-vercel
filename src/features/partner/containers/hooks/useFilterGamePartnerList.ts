import { useMutation } from "@tanstack/react-query"
import { filterGamePartner } from "../services/dropdownPartner.service"

const useFilterGamePartnerList = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    mutateAsync: mutateFilterGamePartner
  } = useMutation(filterGamePartner, {
    mutationKey: ["filterGameList"],
    retry: false
  })

  return {
    data,
    isLoading,
    error,
    isError,
    mutateFilterGamePartner
  }
}

export default useFilterGamePartnerList
