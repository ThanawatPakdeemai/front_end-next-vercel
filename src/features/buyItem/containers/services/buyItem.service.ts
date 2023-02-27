import services from "@configs/axiosGlobalConfig"
import {
  IBuyItems,
  IBuyItemTransactionResponse
} from "@feature/buyItem/interfaces/IBuyItemService"

const buyItems = ({ _player_id, _item_id, _qty }: IBuyItems) =>
  new Promise<IBuyItemTransactionResponse>((resolve, reject) => {
    if (_player_id) {
      services
        .put("/inventory/buy-item-smartcontract", {
          player_id: _player_id,
          item_id: _item_id,
          qty: _qty
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { buyItems }

export const buyItemsBSC = ({
  _player_id,
  _item_id,
  _qty,
  _tokenAddress,
  _symbol
}: IBuyItems) =>
  new Promise<IBuyItemTransactionResponse>((resolve, reject) => {
    if (_player_id) {
      services
        .put("/bsc-chain/buy-item-smartcontract", {
          player_id: _player_id,
          token_address: _tokenAddress,
          item_id: _item_id,
          qty: _qty,
          symbol: _symbol
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
