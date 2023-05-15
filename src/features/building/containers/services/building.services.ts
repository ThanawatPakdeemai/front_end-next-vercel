import services from "@configs/axiosGlobalConfig"
import {
  IMarketServForm,
  INFTTransferServ
} from "@feature/marketplace/interfaces/IMarketService"
import {
  IMyBuildData,
  IMyBuildListServ,
  ITypesBuildServ
} from "@feature/building/interfaces/IBuildingService"

export const getTypesBuilding = () =>
  new Promise<ITypesBuildServ>((resolve, reject) => {
    services
      .get<ITypesBuildServ>(`/market-place-new/NFT-Building/building`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyBuilding = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IMyBuildListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IMyBuildListServ>(`/nakaverse-building/building-owner`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getBuildingById = ({ _id }: { _id: string }) =>
  new Promise<IMyBuildData>((resolve, reject) => {
    services
      .get<IMyBuildData>(`/nakaverse-building/building-datas/${_id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyForSaleBuilding = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IMyBuildListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IMyBuildListServ>(`/nakaverse-building/building-owner-on-sale`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyRentOutBuilding = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IMyBuildListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IMyBuildListServ>(`/nakaverse-building/building-owner-rental`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyInstallmentBuilding = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IMyBuildListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IMyBuildListServ>(
        `/nakaverse-building/building-owner-installment`,
        { ...data }
      )
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const setTransferBuilding = ({
  _token,
  _to,
  _from,
  _txHash
}: {
  _token: string
  _to: string
  _from: string
  _txHash: string
}) =>
  new Promise<INFTTransferServ>((resolve, reject) => {
    const data = {
      nft_token: _token,
      to_address: _to,
      from_address: _from,
      tx_hash: _txHash
    }
    services
      .post<INFTTransferServ>(`/nakaverse-building/building-owner-change`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
