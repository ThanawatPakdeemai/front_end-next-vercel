import services from "@configs/axiosGlobalConfig"
import { ITypesBuildingServ } from "@feature/marketplace/building/interfaces/IBuildingService"

export const getTypesBuilding = () =>
  new Promise<ITypesBuildingServ>((resolve, reject) => {
    services
      .get<ITypesBuildingServ>(`/market-place/building`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
