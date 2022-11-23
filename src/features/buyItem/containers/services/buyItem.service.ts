import services from "@src/configs/axiosGlobalConfig"
import {
  IBuyItems,
  IBuyItemTransectionResponse
} from "../../interfaces/IBuyItem"

const buyItems = ({ player_id, item_id, qty }: IBuyItems) =>
  new Promise<IBuyItemTransectionResponse>((resolve, reject) => {
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
