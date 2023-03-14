import services from "@configs/axiosGlobalConfig"
import {
  IMarketArcadeServForm,
  IMarketServForm,
  INFTTransferServ
} from "@feature/marketplace/interfaces/IMarketService"
import {
  IArcGameDetailServ,
  IMyArcGameListServ
} from "@feature/game/marketplace/interfaces/IArcGameService"

export const getMyArcGame = ({
  _limit,
  _page,
  _search,
  _sort,
  _categoryId,
  _sortBy
}: IMarketArcadeServForm) =>
  new Promise<IMyArcGameListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      sort_by: _sortBy,
      search: _search,
      category_id: _categoryId,
      sort: _sort
    }
    services
      .post<IMyArcGameListServ>(`/game/NFT/game-owner`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getArcGameById = ({ _id }: { _id: string }) =>
  new Promise<IArcGameDetailServ>((resolve, reject) => {
    services
      .get<IArcGameDetailServ>(`/game/NFT/my-game/${_id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyForSaleArcGame = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IMyArcGameListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IMyArcGameListServ>(`/game/NFT/game-owner-on-sale`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyInstallmentArcGame = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IMyArcGameListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IMyArcGameListServ>(`/game/NFT/game-owner-installment`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const setTransferArcGame = ({
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
      .post<INFTTransferServ>(`/game/NFT/game-owner-change`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
