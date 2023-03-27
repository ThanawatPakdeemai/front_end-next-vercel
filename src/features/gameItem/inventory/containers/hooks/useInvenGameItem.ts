import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { useGetAllGameItemofAddrs } from "@feature/contract/containers/hooks/useContract"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import useGetGameItems from "@feature/gameItem/marketplace/containers/hooks/useGetGameItem"
import { TInvenVaultAction } from "@feature/inventory/interfaces/IInventoryItem"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import { useEffect, useState } from "react"

const useInvenGameItem = () => {
  const { profile } = useProfileStore()
  const { gameItemTypes } = useGetGameItems()
  const { setOpen, setClose } = useLoadingStore()
  const allGameItemContract = useGetAllGameItemofAddrs(
    CONFIGS.CONTRACT_ADDRESS.GET_GAMEITEMOFADDRESS
  )
  const [gameItemList, setGameItemList] = useState<
    Array<IGameItemListData & { amount: number }> | undefined
  >(undefined)

  // update gameItemList
  const updateGameItemList = (
    _type: TInvenVaultAction,
    _tokenId: string,
    _amount: number
  ) => {
    if (gameItemList) {
      const _dummy = gameItemList
      const upd_obj = _dummy.findIndex(
        (obj) => obj.item_id_smartcontract === Number(_tokenId)
      )
      let _calAmount: number = _dummy[upd_obj].amount
      if (_type === "decrease") {
        _calAmount = _dummy[upd_obj].amount - _amount
      } else {
        _calAmount = _dummy[upd_obj].amount + _amount
      }
      _dummy[upd_obj].amount = _calAmount
      const result = _dummy // ? not sure for need to declare new variable?
      setGameItemList(result)
    }
  }

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

  const onFetchInvenGameItem = async (_address: string) => {
    setOpen(MESSAGES.transaction_processing_order) // ? changed text
    await getAllGameItemByAddrs(
      _address,
      gameItemTypes ? gameItemTypes.length + 1 : 0 // ? not sure for plus 1
    )
      .then((response) => {
        if (gameItemTypes) {
          const data = gameItemTypes
            .sort((_a, _b) =>
              _a.item_id_smartcontract < _b.item_id_smartcontract ? -1 : 1
            )
            .map((g) => ({
              ...g,
              amount: Number(response[g.item_id_smartcontract]) // ! Please check index again
            }))
          setGameItemList(data)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setClose())
  }

  useEffect(() => {
    if (profile && profile.data) {
      onFetchInvenGameItem(profile.data.address)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, gameItemTypes])

  return {
    gameItemList:
      gameItemList && gameItemList.filter((_item) => _item.amount > 0),
    updateGameItemList,
    onFetchInvenGameItem
  }
}

export default useInvenGameItem
