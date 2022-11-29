import services from "@configs/axiosGlobalConfig"
import {
  IBuyItems,
  IBuyItemTransactionResponse
} from "@features/buyItem/interfaces/IBuyItemService"

const buyItems = ({ player_id, item_id, qty }: IBuyItems) =>
  new Promise<IBuyItemTransactionResponse>((resolve, reject) => {
    if (player_id) {
      services
        .put("/inventory/buy-item-smartcontract", {
          player_id,
          item_id,
          qty
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
