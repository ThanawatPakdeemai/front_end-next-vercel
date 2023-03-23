import { useQuery } from "@tanstack/react-query"
import { getTypesMaterial } from "../services/material.services"

const useGetMaterialTypes = () => {
  const { data: materialTypes } = useQuery({
    queryKey: ["getTypesMaterial"],
    queryFn: getTypesMaterial,
    retry: false
  })

  return {
    materialTypes: materialTypes?.data
  }
}

export default useGetMaterialTypes
