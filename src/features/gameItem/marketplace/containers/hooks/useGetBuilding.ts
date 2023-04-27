import { getTypesBuilding } from "@feature/building/containers/services/building.services"
import { useQuery } from "@tanstack/react-query"
// import { useRouter } from "next/router"

const useGetBuilding = () => {
  // const { pathname } = useRouter()
  const { data: buildingTypes } = useQuery({
    queryKey: ["BuildingTypes"],
    queryFn: getTypesBuilding,
    retry: false,
    staleTime: Infinity
    // enabled: pathname.includes("inventory")
  })

  return {
    buildingTypes: buildingTypes?.data
  }
}

export default useGetBuilding
