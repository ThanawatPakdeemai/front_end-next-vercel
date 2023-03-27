import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { getTypesMaterial } from "../services/material.services"

const useGetMaterialTypes = () => {
  const { pathname } = useRouter()
  const { data: materialTypes } = useQuery({
    queryKey: ["getTypesMaterial"],
    queryFn: getTypesMaterial,
    retry: false,
    staleTime: Infinity,
    enabled: pathname.includes("inventory")
  })

  return {
    materialTypes: materialTypes?.data
  }
}

export default useGetMaterialTypes
