import services from "@configs/axiosGlobalConfig"
import { ITypesMaterialServ } from "@feature/material/marketplace/interfaces/IMaterialService"

export const getTypesMaterial = () =>
  new Promise<ITypesMaterialServ>((resolve, reject) => {
    services
      .get<ITypesMaterialServ>(`/market-place/materials`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
