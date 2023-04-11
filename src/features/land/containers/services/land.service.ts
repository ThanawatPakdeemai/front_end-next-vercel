import services from "@configs/axiosGlobalConfig"
import { IMarketServForm } from "@feature/marketplace/interfaces/IMarketService"
import {
  ILandData,
  ILandServ,
  IMyLandListServ,
  IRedeemServ
} from "@feature/land/interfaces/ILandService"

// this service must be improve for transfer land owner
export const getMyLand = ({
  _limit,
  _page,
  _search,
  _sort,
  _landList = [],
  _txHash
}: IMarketServForm & { _landList: string[]; _txHash?: string }) =>
  new Promise<IMyLandListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort,
      land_id_arr: _landList,
      transaction_hash: _txHash
    }
    services
      .post<IMyLandListServ>(`/nakaverse-land/lands-owner`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getLandById = ({ _id }: { _id: string }) =>
  new Promise<ILandData>((resolve, reject) => {
    services
      .get<ILandData>(`/nakaverse-land/lands-datas/${_id}`)
      .then((response) => resolve(response.data[0]))
      .catch((error) => reject(error))
  })

export const getMyForSaleLand = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IMyLandListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IMyLandListServ>(`/nakaverse-land/lands-owner-on-sale`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyRentOutLand = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IMyLandListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IMyLandListServ>(`/nakaverse-land/lands-owner-rental`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyInstallmentLand = ({
  _limit,
  _page,
  _search,
  _sort,
  _active = true
}: IMarketServForm) =>
  new Promise<IMyLandListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort,
      active: _active
    }
    services
      .post<IMyLandListServ>(`/nakaverse-land/lands-owner-installment`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const purchaseLandByRedeemCode = ({
  _code,
  _playerId,
  _landId
}: {
  _code: string
  _playerId: string
  _landId: string
}) =>
  new Promise<IRedeemServ>((resolve, reject) => {
    const data = { code: _code, player_id: _playerId, land_obj_id: _landId }
    services
      .post<IRedeemServ>(`/nakaverse-land/redeem`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const updateLandBanner = ({
  _landId,
  _img
}: {
  _landId: string
  _img: string
}) =>
  new Promise<ILandServ>((resolve, reject) => {
    const data = new FormData()
    data.append("land_id", _landId)
    data.append("image", _img)

    services
      .put<ILandServ>(`/nakaverse-land/update-logo-land`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
