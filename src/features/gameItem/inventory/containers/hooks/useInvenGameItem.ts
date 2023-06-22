import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import {
  useGetAllGameItemofAddrs,
  useItemVaultNoAccount
} from "@feature/contract/containers/hooks/useContract"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { TInvenVaultAction } from "@feature/inventory/interfaces/IInventoryItem"
import useLoadingStore from "@stores/loading"
import useMarketCategTypes from "@stores/marketCategTypes"
import useProfileStore from "@stores/profileStore"
import { useCallback } from "react"

const useInvenGameItem = () => {
  const { profile } = useProfileStore()
  const { gameItemTypes } = useMarketCategTypes()
  const { setOpen, setClose } = useLoadingStore()
  const allGameItemContract = useGetAllGameItemofAddrs(
    CONFIGS.CONTRACT_ADDRESS.GET_GAMEITEMOFADDRESS
  )
  const gameItemContractNoAcc = useItemVaultNoAccount(
    CONFIGS.CONTRACT_ADDRESS.ITEM_VAULT
  )

  // get item by addrs & token id
  const getGameItemByToken = (_address: string, _token: string) =>
    new Promise<string>((resolve, reject) => {
      gameItemContractNoAcc
        .getItemAmountbyId(_address, _token)
        .then((_response: string) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // get all material by address
  const getAllGameItemByAddrs = (_address: string, _length: number) =>
    new Promise<string[]>((resolve, reject) => {
      allGameItemContract
        .getAllitem(_address, _length)
        .then((_response: string[]) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // update _arr
  const updateGameItemList = (
    _arr: Array<IGameItemListData & { amount?: number }> | undefined,
    _type: TInvenVaultAction,
    _tokenId: string,
    _amount: number
  ) => {
    if (_arr) {
      const upd_obj = _arr.findIndex(
        (obj) => obj.item_id_smartcontract === Number(_tokenId)
      )
      let _clone = _arr[upd_obj]
      if (_clone.amount) {
        let cal_amount: number = 0
        if (_type === "decrease") {
          cal_amount = _clone.amount - _amount
        } else {
          cal_amount = _clone.amount + _amount
        }
        _clone = { ..._clone, amount: cal_amount }
        const _dummy = _arr.filter(
          (f) => f.item_id_smartcontract !== Number(_tokenId)
        )
        const _result = [..._dummy, _clone]
        return _result
      }
    }
  }

  const onFetchInvenGameItem = useCallback(async () => {
    if (
      profile.data &&
      profile.data.address &&
      gameItemTypes &&
      gameItemTypes.length > 0
    ) {
      let _data: Array<IGameItemListData & { amount?: number }> | undefined = []
      setOpen(MESSAGES.transaction_processing_order) // ? changed text
      await getAllGameItemByAddrs(
        profile.data.address,
        gameItemTypes ? gameItemTypes.length + 1 : 0 // ? not sure for plus 1
      )
        .then((response) => {
          const data = gameItemTypes
            .sort((_a, _b) =>
              _a.item_id_smartcontract < _b.item_id_smartcontract ? -1 : 1
            )
            .map((g) => ({
              ...g,
              amount: Number(response[g.item_id_smartcontract])
            }))
          _data = data.filter((_item) => _item.amount > 0)
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setTimeout(() => setClose(), 1000)
        })
      return _data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data, gameItemTypes])

  return {
    getGameItemByToken,
    updateGameItemList,
    onFetchInvenGameItem,
    getAllGameItemByAddrs
  }
}

export default useInvenGameItem
