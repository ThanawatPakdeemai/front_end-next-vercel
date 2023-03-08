/**
 * @description all these interfaces are available for use in mockup only.
 * Wait P'Aof implement real api/interface
 */
export interface Position {
  x: string
  y: string
}

export interface LandData {
  _id: string
  name: string
  details: string
  image: string
  qrcode_image: string
  NFT_token: string
  land_id: string
  position: Position
  type: string
  logo_approved: boolean
  NFT_video: string
  NFT_image: string
  logo_in_map: string | null
}

export interface ItemData {
  _id: string
  name: string
  detail: string
  price: number
  item_id_smartcontract: number
  item_size: string
  image_icon: string
  image_icon_color: string
  image: string
}

export interface BuildingData {
  _id: string
  model_id: number
  name: string
  prefix: number
  prefix_no: number
  detail: string
  type: string
  level: number
  is_active: boolean
  image: string
  NFT_video: string
  NFT_image: string
  model_3d: string
}

export interface IMarketplaceInfoData {
  _id: string
  created_at: Date | string
  seller_id: string | null
  selling_type?: string
  item_id: string
  item_amount: number
  item_total?: number
  price: number
  seller_type: string
  type: string
  is_active: boolean
  order_id: string | null
  item_data?: ItemData
  land_data?: LandData
  building_data?: BuildingData
}

export interface IInfo {
  pages: number
  limit: number
  currentCount: number
  totalCount: number
}

export interface IMarketplaceInfoResponse {
  status: boolean
  data: IMarketplaceInfoData[]
  info: IInfo
}
/**
 * @description all these interfaces are available for use in mockup only.
 * Wait P'Aof implement real api/interface
 * */

export const MOCK_GAME_ITEM: IMarketplaceInfoResponse = {
  "status": true,
  "data": [
    {
      "_id": "63fc72a9569787613aab78f1",
      "created_at": "2023-02-27T09:06:49.977Z",
      "seller_id": "0x7C04cf2A5d600c3D6D5c82443Ef5499d506ca1d2",
      "item_id": "636499ed0e160d1ae8084bc5",
      "item_amount": 14,
      "price": 1,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0xb61224dd353063a7c1a1b2a606bc905443188a513ded1000538752fedca833c8",
      "item_data": {
        "_id": "636499ed0e160d1ae8084bc5",
        "name": "Marble",
        "detail": "The marble can be used in other games such as NAKA ZAKA",
        "price": 1,
        "item_id_smartcontract": 6,
        "item_size": "1$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon/marble%20wt_1.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon_color/marble%20red_2.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/image/marble%20%281%29.png"
      }
    },
    {
      "_id": "63fc72a7569787613aab78e2",
      "created_at": "2023-02-27T09:06:47.393Z",
      "seller_id": "0x7C04cf2A5d600c3D6D5c82443Ef5499d506ca1d2",
      "item_id": "636499ed0e160d1ae8084bc5",
      "item_amount": 14,
      "price": 1,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0x3ee6b0764b89c42d10491cd3835581bd39ac09ead2b87ffa1fe8b1ef2ab14fbb",
      "item_data": {
        "_id": "636499ed0e160d1ae8084bc5",
        "name": "Marble",
        "detail": "The marble can be used in other games such as NAKA ZAKA",
        "price": 1,
        "item_id_smartcontract": 6,
        "item_size": "1$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon/marble%20wt_1.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon_color/marble%20red_2.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/image/marble%20%281%29.png"
      }
    },
    {
      "_id": "63fc72a4569787613aab78d2",
      "created_at": "2023-02-27T09:06:44.341Z",
      "seller_id": "0x7C04cf2A5d600c3D6D5c82443Ef5499d506ca1d2",
      "item_id": "636499ed0e160d1ae8084bc5",
      "item_amount": 14,
      "price": 1,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0x6b0c915752658e61d1e45b2fb4c8f74936d137cfee665edcf0a2f918ff6aafc0",
      "item_data": {
        "_id": "636499ed0e160d1ae8084bc5",
        "name": "Marble",
        "detail": "The marble can be used in other games such as NAKA ZAKA",
        "price": 1,
        "item_id_smartcontract": 6,
        "item_size": "1$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon/marble%20wt_1.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon_color/marble%20red_2.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/image/marble%20%281%29.png"
      }
    },
    {
      "_id": "63fc72a2569787613aab78c6",
      "created_at": "2023-02-27T09:06:42.011Z",
      "seller_id": "0x76287b69DF91C69B1a79604e597bbE65a9f77215",
      "item_id": "63073e71d0be6934c17c7259",
      "item_amount": 1,
      "price": 0.5,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0xe3f05590f12aa95ba08910169d53686be4cada45dd92772ffd0b493425bbae3d",
      "item_data": {
        "_id": "63073e71d0be6934c17c7259",
        "name": "Marble",
        "detail":
          "The marble can be used in other games such as NAKA ZAKA. Marble 0.05$ can be used only the specific room.",
        "price": 0.05,
        "item_id_smartcontract": 40,
        "item_size": "0.05$",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon_color/marble_red.png",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon/marble_white.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/image/marble.png"
      }
    },
    {
      "_id": "63fc729f569787613aab78bb",
      "created_at": "2023-02-27T09:06:39.854Z",
      "seller_id": "0x76287b69DF91C69B1a79604e597bbE65a9f77215",
      "item_id": "63073e71d0be6934c17c7259",
      "item_amount": 1,
      "price": 2,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0xdfb7407d997e5e1ed4ea0c514365759363433ca386e3436bffddf18cbdefd24b",
      "item_data": {
        "_id": "63073e71d0be6934c17c7259",
        "name": "Marble",
        "detail":
          "The marble can be used in other games such as NAKA ZAKA. Marble 0.05$ can be used only the specific room.",
        "price": 0.05,
        "item_id_smartcontract": 40,
        "item_size": "0.05$",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon_color/marble_red.png",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon/marble_white.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/image/marble.png"
      }
    },
    {
      "_id": "63fc729d569787613aab78b0",
      "created_at": "2023-02-27T09:06:37.762Z",
      "seller_id": "0x76287b69DF91C69B1a79604e597bbE65a9f77215",
      "item_id": "630736a3d0be6934c17bde86",
      "item_amount": 1,
      "price": 0.5,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0x678e05540c1f71103980e8534da95c06093fbd30707ff599b9e12c2e692e9d88",
      "item_data": {
        "_id": "630736a3d0be6934c17bde86",
        "name": "Bullet",
        "detail":
          "The bullets can be in shooting games such as Duckhunter. Bullet 0.1$ can be used only the specific room.",
        "price": 0.1,
        "item_id_smartcontract": 1,
        "item_size": "0.1$",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7533f96ec01fd81438833f71539c7d4e/icon_color/bullet_red.png",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7533f96ec01fd81438833f71539c7d4e/icon/bullet_white.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7533f96ec01fd81438833f71539c7d4e/image/bullet.png"
      }
    },
    {
      "_id": "63fc729b569787613aab78a4",
      "created_at": "2023-02-27T09:06:35.254Z",
      "seller_id": "0x76287b69DF91C69B1a79604e597bbE65a9f77215",
      "item_id": "630736a3d0be6934c17bde86",
      "item_amount": 1,
      "price": 2,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0x5bf0cb64efcbe5799e666b35f267d012a734985aa9c66eec6565f63c529eef9c",
      "item_data": {
        "_id": "630736a3d0be6934c17bde86",
        "name": "Bullet",
        "detail":
          "The bullets can be in shooting games such as Duckhunter. Bullet 0.1$ can be used only the specific room.",
        "price": 0.1,
        "item_id_smartcontract": 1,
        "item_size": "0.1$",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7533f96ec01fd81438833f71539c7d4e/icon_color/bullet_red.png",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7533f96ec01fd81438833f71539c7d4e/icon/bullet_white.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7533f96ec01fd81438833f71539c7d4e/image/bullet.png"
      }
    },
    {
      "_id": "63fc7298569787613aab7899",
      "created_at": "2023-02-27T09:06:32.671Z",
      "seller_id": "0x76287b69DF91C69B1a79604e597bbE65a9f77215",
      "item_id": "63073e71d0be6934c17c7259",
      "item_amount": 1,
      "price": 30,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0x452e0fefdfb723c54d86b396187a036055577b1d8805c9e466204226d6282fc9",
      "item_data": {
        "_id": "63073e71d0be6934c17c7259",
        "name": "Marble",
        "detail":
          "The marble can be used in other games such as NAKA ZAKA. Marble 0.05$ can be used only the specific room.",
        "price": 0.05,
        "item_id_smartcontract": 40,
        "item_size": "0.05$",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon_color/marble_red.png",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon/marble_white.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/image/marble.png"
      }
    },
    {
      "_id": "63fc7296569787613aab788d",
      "created_at": "2023-02-27T09:06:30.136Z",
      "seller_id": "0x7C04cf2A5d600c3D6D5c82443Ef5499d506ca1d2",
      "item_id": "636499ed0e160d1ae8084bc5",
      "item_amount": 14,
      "price": 1,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0x44364d70fcdeddfa823661b6111eced34d9b3e04fba73fee70747121a9f731bc",
      "item_data": {
        "_id": "636499ed0e160d1ae8084bc5",
        "name": "Marble",
        "detail": "The marble can be used in other games such as NAKA ZAKA",
        "price": 1,
        "item_id_smartcontract": 6,
        "item_size": "1$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon/marble%20wt_1.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon_color/marble%20red_2.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/image/marble%20%281%29.png"
      }
    },
    {
      "_id": "63fc7292569787613aab7879",
      "created_at": "2023-02-27T09:06:26.890Z",
      "seller_id": "0x85E216EECC6b64EA494F4f08EC544E59B10aE9Ce",
      "item_id": "626b96115b8af5620a7ecea4",
      "item_amount": 2,
      "price": 1,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0x74705ef358b2fef65841efa8cfd210a6972ce7cc019f5c98dc3e275d516f3f94",
      "item_data": {
        "_id": "626b96115b8af5620a7ecea4",
        "name": "Shield",
        "detail": "The shield can be used in other games such as NAKA TD",
        "price": 1,
        "item_id_smartcontract": 5,
        "image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/970da5f1f2e32aeb9e488dd017160ab4/image/20220429-142834.png",
        "image_icon":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/970da5f1f2e32aeb9e488dd017160ab4/icon/ss_white.png",
        "image_icon_color":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/970da5f1f2e32aeb9e488dd017160ab4/icon_color/ss_red.png",
        "item_size": "1$"
      }
    },
    {
      "_id": "63fc728f569787613aab7861",
      "created_at": "2023-02-27T09:06:23.132Z",
      "seller_id": "0x85E216EECC6b64EA494F4f08EC544E59B10aE9Ce",
      "item_id": "633fa0646778be53b33f33c2",
      "item_amount": 6,
      "price": 1,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0x958ec29ab86b65f6b5670e4a611ecea3333454c2b9a6ae6b37a237dbdfc32146",
      "item_data": {
        "_id": "633fa0646778be53b33f33c2",
        "name": "Gas",
        "detail": "The gas can be used in other games such as Cat Planet.",
        "price": 1.5,
        "item_id_smartcontract": 3,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/234f877c20b2fce15475d1966200f683/image/gas_red.png",
        "image_icon":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/407201c23942ccde1530a2edfe889ec2/icon/GastankWhite.png",
        "image_icon_color":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/game_item/407201c23942ccde1530a2edfe889ec2/icon_color/Gastankred.png",
        "item_size": "1.5$"
      }
    },
    {
      "_id": "63fc728d569787613aab7854",
      "created_at": "2023-02-27T09:06:21.012Z",
      "seller_id": "0x7C04cf2A5d600c3D6D5c82443Ef5499d506ca1d2",
      "item_id": "636499ed0e160d1ae8084bc5",
      "item_amount": 14,
      "price": 1,
      "seller_type": "user",
      "type": "game_item",
      "is_active": true,
      "order_id":
        "0xddeed2a4a51408854542332ec98e8db574587dcf8ef2d299561131d41c15e364",
      "item_data": {
        "_id": "636499ed0e160d1ae8084bc5",
        "name": "Marble",
        "detail": "The marble can be used in other games such as NAKA ZAKA",
        "price": 1,
        "item_id_smartcontract": 6,
        "item_size": "1$",
        "image_icon":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon/marble%20wt_1.png",
        "image_icon_color":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/icon_color/marble%20red_2.png",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/7fb26875c639817a59912a87be6f7386/image/marble%20%281%29.png"
      }
    }
  ],
  "info": {
    "pages": 1,
    "limit": 12,
    "currentCount": 12,
    "totalCount": 66
  }
}

export const MOCK_LAND: IMarketplaceInfoResponse = {
  "status": true,
  "data": [
    {
      "_id": "640059093de1705b2301424f",
      "created_at": "2023-03-02T08:06:33.096Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "61fa18b0f2378b4c8083d96b",
      "item_amount": 1,
      "price": 1,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0xfdb3b0f72fdb1d7fbaeeeb1f790eebfbf64eb9d7f21caabee96a7e4083fce0e8",
      "land_data": {
        "_id": "61fa18b0f2378b4c8083d96b",
        "name": "Iron",
        "details":
          "This plot of land is rich in iron ore and suitable for iron mining",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/iron.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18b0f2378b4c8083d96b.jpeg",
        "NFT_token": "11200451",
        "land_id": "11200451",
        "position": {
          "x": "242",
          "y": "19"
        },
        "type": "iron",
        "logo_approved": true,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Iron/11200451.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Iron/11200451.jpg",
        "logo_in_map":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-logo/11200451/image/efad8be58b68c190c7f8642be373ab7f.IMG_2148.JPG"
      }
    },
    {
      "_id": "63e0dacb01570c75b94400a2",
      "created_at": "2023-02-06T10:47:39.411Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "61fa18fff2378b4c8083df5e",
      "item_amount": 1,
      "price": 2,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0x2cdae444f7cc925c056efd2194af783307ab600dcc1c7de479b2899ba8170386",
      "land_data": {
        "_id": "61fa18fff2378b4c8083df5e",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18fff2378b4c8083df5e.jpeg",
        "NFT_token": "11100186",
        "land_id": "11100186",
        "position": {
          "x": "177",
          "y": "-20"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100186.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100186.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "63e0da7301570c75b943debe",
      "created_at": "2023-02-06T10:46:11.597Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "61fa1900f2378b4c8083df66",
      "item_amount": 1,
      "price": 2,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0xb95f5556eed7ab3721e00a1a56fadd8113ef2f0b66cdd20f57b590c9874e4ecd",
      "land_data": {
        "_id": "61fa1900f2378b4c8083df66",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa1900f2378b4c8083df66.jpeg",
        "NFT_token": "11100187",
        "land_id": "11100187",
        "position": {
          "x": "177",
          "y": "-21"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100187.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100187.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "63e0821d7c526f389655ede9",
      "created_at": "2023-02-06T04:29:17.129Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "61fa1897f2378b4c8083d783",
      "item_amount": 1,
      "price": 300,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0x0c1918be76a8395fbaa17ead619b0d4257323da9345fa38ca83dc273a3fcd9da",
      "land_data": {
        "_id": "61fa1897f2378b4c8083d783",
        "name": "Iron",
        "details":
          "This plot of land is rich in iron ore and suitable for iron mining",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/iron.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa1897f2378b4c8083d783.jpeg",
        "NFT_token": "11200390",
        "land_id": "11200390",
        "position": {
          "x": "212",
          "y": "2"
        },
        "type": "iron",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Iron/11200390.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Iron/11200390.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "63dcee5660754a5f0ec18648",
      "created_at": "2023-02-03T11:21:58.410Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "61fa1906f2378b4c8083dfe6",
      "item_amount": 1,
      "price": 300,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0x66e5295dfb9da93fa59619fe82d9a783059f2f6997281657a2731ad218f7a6f8",
      "land_data": {
        "_id": "61fa1906f2378b4c8083dfe6",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa1906f2378b4c8083dfe6.jpeg",
        "NFT_token": "11100203",
        "land_id": "11100203",
        "position": {
          "x": "178",
          "y": "10"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100203.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100203.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "63dca91b5b66c93e31816c6b",
      "created_at": "2023-02-03T06:26:35.298Z",
      "seller_id": "0xA945eCBF704eC1e20522cc17890004Fd823a11ff",
      "item_id": "61fa17b6f2378b4c8083c660",
      "item_amount": 1,
      "price": 1,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0xa7e07c7967b04944d0bd500bcf67214f9afab60c502274521ed2226f81c37d4e",
      "land_data": {
        "_id": "61fa17b6f2378b4c8083c660",
        "name": "Wood",
        "details":
          "This plot of land is rich in natural forests and secondary forests. Trees, bamboos, shrubs, and coastal mangroves abound on this plot. The area is chiefly covered by natural forests, hence used for forestry production and associated practices. It is suitable for rational development and for planting, breeding, gathering and so on.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/wood.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa17b6f2378b4c8083c660.jpeg",
        "NFT_token": "11300525",
        "land_id": "11300525",
        "position": {
          "x": "200",
          "y": "-2"
        },
        "type": "wood",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Wood/11300525.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Wood/11300525.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "63da48ca975e852ff3635847",
      "created_at": "2023-02-01T11:11:06.435Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "61fa16d0f2378b4c8083b4bd",
      "item_amount": 1,
      "price": 10,
      "seller_type": "user",
      "selling_type": "installment",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0x45d53579cde0b0f167264fd8f15188fd3235bb3d13bf929582452d2bc14de40d",
      "land_data": {
        "_id": "61fa16d0f2378b4c8083b4bd",
        "name": "Gems",
        "details":
          "This plot of land is rich in various gemstones including diamonds, crystals, emeralds, rubies, sapphires and so on. Gemstones are the most beautiful and valuable type of minerals in rocks. They are bright in color, crystalline in texture, highly lustrous, hard and durable, though scarcely available. This place is suitable for reasonable development, mainly for the jewelry industry.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/gem.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa16d0f2378b4c8083b4bd.jpeg",
        "NFT_token": "11400058",
        "land_id": "11400058",
        "position": {
          "x": "187",
          "y": "-7"
        },
        "type": "gems",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Gems/11400058.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Gems/11400058.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "63da3ca047e45c798f159f93",
      "created_at": "2023-02-01T10:19:12.965Z",
      "seller_id": "0x28698158F3b062446FE563226D5C6e8802c52E30",
      "item_id": "61fa189ef2378b4c8083d803",
      "item_amount": 1,
      "price": 4,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0x15535a3610bfa831d88d4e45fa0551070e81123be266c2bd3b48713a619d4d34",
      "land_data": {
        "_id": "61fa189ef2378b4c8083d803",
        "name": "Iron",
        "details":
          "This plot of land is rich in iron ore and suitable for iron mining",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/iron.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa189ef2378b4c8083d803.jpeg",
        "NFT_token": "11200406",
        "land_id": "11200406",
        "position": {
          "x": "222",
          "y": "-3"
        },
        "type": "iron",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Iron/11200406.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Iron/11200406.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "63cf92ccd52caf1660a668a6",
      "created_at": "2023-01-24T08:11:56.927Z",
      "seller_id": "0xB161891861Ec43f980B701cB5369DA1C6b162b05",
      "item_id": "61fa16fbf2378b4c8083b800",
      "item_amount": 1,
      "price": 10000,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0x5fa3ddc146fc3a2383ca71ef63f091e694f7e8f0c2f72be6a2fec98947f16141",
      "land_data": {
        "_id": "61fa16fbf2378b4c8083b800",
        "name": "Wood",
        "details":
          "This plot of land is rich in natural forests and secondary forests. Trees, bamboos, shrubs, and coastal mangroves abound on this plot. The area is chiefly covered by natural forests, hence used for forestry production and associated practices. It is suitable for rational development and for planting, breeding, gathering and so on.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/wood.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa16fbf2378b4c8083b800.jpeg",
        "NFT_token": "11300065",
        "land_id": "11300065",
        "position": {
          "x": "133",
          "y": "18"
        },
        "type": "wood",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Wood/11300065.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Wood/11300065.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "639fe115f072c7165add0d38",
      "created_at": "2022-12-19T03:57:09.852Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "61fa17e2f2378b4c8083c9b8",
      "item_amount": 1,
      "price": 1000,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0xbcb97ec1bc839ee14472a39b24a809c0ac028bb42fa0f50f0901b5d1e0421318",
      "land_data": {
        "_id": "61fa17e2f2378b4c8083c9b8",
        "name": "Wood",
        "details":
          "This plot of land is rich in natural forests and secondary forests. Trees, bamboos, shrubs, and coastal mangroves abound on this plot. The area is chiefly covered by natural forests, hence used for forestry production and associated practices. It is suitable for rational development and for planting, breeding, gathering and so on.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/wood.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa17e2f2378b4c8083c9b8.jpeg",
        "NFT_token": "11300632",
        "land_id": "11300632",
        "position": {
          "x": "224",
          "y": "7"
        },
        "type": "wood",
        "logo_approved": true,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Wood/11300632.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Wood/11300632.jpg",
        "logo_in_map":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-logo/11300632/image/dec60653f008d4dc41f207c62a53966e.download.jpeg"
      }
    },
    {
      "_id": "6350a937bbc5ae5da65baed7",
      "created_at": "2022-10-20T01:49:43.410Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "61fa191cf2378b4c8083e18e",
      "item_amount": 1,
      "price": 200000.2044,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0x1f55e2200c2afecd308d049c9e7333929d87e3a7fc0a33f2bfd7d70eaafba38f",
      "land_data": {
        "_id": "61fa191cf2378b4c8083e18e",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa191cf2378b4c8083e18e.jpeg",
        "NFT_token": "11100256",
        "land_id": "11100256",
        "position": {
          "x": "206",
          "y": "9"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100256.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100256.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "633185d624743023f3a5dd1f",
      "created_at": "2022-09-26T10:58:30.819Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "61fa17e2f2378b4c8083c9b0",
      "item_amount": 1,
      "price": 90000,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0x5dbecec2f0d2b1e8c71134005f8b0b4b71dafe93d92d5f3183b1ee824517f6f4",
      "land_data": {
        "_id": "61fa17e2f2378b4c8083c9b0",
        "name": "Wood",
        "details":
          "This plot of land is rich in natural forests and secondary forests. Trees, bamboos, shrubs, and coastal mangroves abound on this plot. The area is chiefly covered by natural forests, hence used for forestry production and associated practices. It is suitable for rational development and for planting, breeding, gathering and so on.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/wood.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa17e2f2378b4c8083c9b0.jpeg",
        "NFT_token": "11300631",
        "land_id": "11300631",
        "position": {
          "x": "224",
          "y": "6"
        },
        "type": "wood",
        "logo_approved": true,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Wood/11300631.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Wood/11300631.jpg",
        "logo_in_map":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-logo/11300631/image/56e711cd26083c557f482c8857d5b375.733516444f824df4ee6f4efe5fbc87df.12749.png"
      }
    }
  ],
  "info": {
    "pages": 1,
    "limit": 12,
    "currentCount": 12,
    "totalCount": 31
  }
}

export const MOCK_BUILDING: IMarketplaceInfoResponse = {
  "status": true,
  "data": [
    {
      "_id": "63521df719a0097cbcf5d38a",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "635137b0b4eec00b435fee5f",
      "item_amount": 152,
      "item_total": 152,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "635137b0b4eec00b435fee5f",
        "model_id": 29,
        "name": "Weaponsmith",
        "prefix": 115,
        "prefix_no": 153,
        "detail":
          "Combine finished products from factories to produce precious items essential for participation in our play-to-earn games. By owning an Items Factory, you respond to the supply and demand of the game by producing the items gamers are yearning for most. Pro Tip: Establish in an urban area for earning bonus.",
        "type": "urban_area",
        "level": 1,
        "is_active": true,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/office_render/type_2/office_type_2_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/office/office_type_2/office_type_2_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/office_render/type_2/office_type_2_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/office/office_type_2/level_1/office_type_2_lv_1.glb"
      }
    },
    {
      "_id": "63521df719a0097cbcf5d389",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "63513762b4eec00b435f9a78",
      "item_amount": 152,
      "item_total": 152,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "63513762b4eec00b435f9a78",
        "model_id": 28,
        "name": "Armoury",
        "prefix": 115,
        "prefix_no": 1,
        "detail":
          "Combine finished products from factories to produce precious items essential for participation in our play-to-earn games. By owning an Items Factory, you respond to the supply and demand of the game by producing the items gamers are yearning for most. Pro Tip: Establish in an urban area for earning bonus.",
        "type": "urban_area",
        "level": 1,
        "is_active": true,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/office_render/type_1/office_type_1_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/office/office_type_1/office_type_1_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/office_render/type_1/office_type_1_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/office/office_type_1/level_1/office_type_1_lv_1.glb"
      }
    },
    {
      "_id": "63521df719a0097cbcf5d38b",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "63513849b4eec00b4360a42c",
      "item_amount": 151,
      "item_total": 151,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "63513849b4eec00b4360a42c",
        "model_id": 30,
        "name": "Vehicles Factory",
        "prefix": 115,
        "prefix_no": 305,
        "detail":
          "Combine finished products from factories to produce precious items essential for participation in our play-to-earn games. By owning an Items Factory, you respond to the supply and demand of the game by producing the items gamers are yearning for most. Pro Tip: Establish in an urban area for earning bonus.",
        "type": "urban_area",
        "level": 1,
        "is_active": true,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/office_render/type_3/office_type_3_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/office/office_type_3/office_type_3_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/office_render/type_3/office_type_3_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/office/office_type_3/level_1/office_type_3_lv_1.glb"
      }
    },
    {
      "_id": "63521df719a0097cbcf5d387",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "63512787b4eec00b4350c6e7",
      "item_amount": 100,
      "item_total": 100,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "63512787b4eec00b4350c6e7",
        "model_id": 26,
        "name": "Satoshi House",
        "prefix": 115,
        "prefix_no": 556,
        "detail":
          "Combine finished products from factories to produce precious items essential for participation in our play-to-earn games. By owning an Items Factory, you respond to the supply and demand of the game by producing the items gamers are yearning for most. Pro Tip: Establish in an urban area for earning bonus.",
        "type": "urban_area",
        "level": 1,
        "is_active": true,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/house_render/type_2/house_type_2_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/house/house_type_2/house_type_2_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/house_render/type_2/house_type_2_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/house/house_type_2/level_1/house_type_2_lv_1.glb"
      }
    },
    {
      "_id": "63521df719a0097cbcf5d386",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "6351277eb4eec00b4350bef7",
      "item_amount": 100,
      "item_total": 100,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "6351277eb4eec00b4350bef7",
        "model_id": 25,
        "name": "BlockVilla",
        "prefix": 115,
        "prefix_no": 456,
        "detail":
          "Combine finished products from factories to produce precious items essential for participation in our play-to-earn games. By owning an Items Factory, you respond to the supply and demand of the game by producing the items gamers are yearning for most. Pro Tip: Establish in an urban area for earning bonus.",
        "type": "urban_area",
        "level": 1,
        "is_active": true,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/house_render/type_1/house_type_1_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/house/house_type_1/house_type_1_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/house_render/type_1/house_type_1_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/house/house_type_1/level_1/house_type_1_lv_1.glb"
      }
    },
    {
      "_id": "63521df719a0097cbcf5d385",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "635125edb4eec00b434f50f0",
      "item_amount": 227,
      "item_total": 227,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "635125edb4eec00b434f50f0",
        "model_id": 22,
        "name": "Solar Energy farm",
        "prefix": 113,
        "detail":
          "And then there was light! Power the Nakaverse ecosystem by providing essential electricity for factories and farms to run their operations. All factories in the NAKAVERSE need power, creating a huge demand for Energy farms within the ecosystem. Pro tip: Setting up in the desert grants a production bonus.",
        "type": "desert",
        "level": 1,
        "is_active": true,
        "prefix_no": 1,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/energy_farm_render/solar/solar_lv_1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/energy_farm/solar_energy/solar_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/energy_farm_render/solar/solar_lv_1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/energy_farm/solar_farm/level_1/solar_lv_1.glb"
      }
    },
    {
      "_id": "63521df719a0097cbcf5d388",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "63512792b4eec00b4350d00f",
      "item_amount": 100,
      "item_total": 100,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "63512792b4eec00b4350d00f",
        "model_id": 27,
        "name": "Punk Lodge",
        "prefix": 115,
        "prefix_no": 656,
        "detail":
          "Combine finished products from factories to produce precious items essential for participation in our play-to-earn games. By owning an Items Factory, you respond to the supply and demand of the game by producing the items gamers are yearning for most. Pro Tip: Establish in an urban area for earning bonus.",
        "type": "urban_area",
        "level": 1,
        "is_active": true,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/house_render/type_3/house_type_3_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/house/house_type_3/house_type_3_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/house_render/type_3/house_type_3_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/house/house_type_3/level_1/house_type_3_lv_1.glb"
      }
    },
    {
      "_id": "63521df719a0097cbcf5d384",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "635124a8b4eec00b434e2abb",
      "item_amount": 325,
      "item_total": 325,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "635124a8b4eec00b434e2abb",
        "model_id": 19,
        "name": "Wind Energy farm",
        "prefix": 114,
        "detail":
          "Every factory needs workers. As a food farm, you fuel the workers that in turn produce the fuel for the players on our platform. Whip up meals for factory employees,  giving them the energy needed to sustain our in-game economy.  Pro tip: Setting up in grassland grants a production bonus.",
        "type": "grassland",
        "level": 1,
        "is_active": true,
        "prefix_no": 1,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/energy_farm_render/wind/wind_lv_1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/energy_farm/wind_energy/wind_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/energy_farm_render/wind/wind_lv_1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/energy_farm/wind_turbine_farm/level_1/wind_lv_1.glb"
      }
    },
    {
      "_id": "63083cd2cb447ca30173d52a",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "63072331cb447ca3018c9c0e",
      "item_amount": 678,
      "item_total": 683,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "63072331cb447ca3018c9c0e",
        "model_id": 16,
        "name": "Sawmill",
        "prefix": 103,
        "detail":
          "Start your motors! Rev up your chainsaw to slice and dice trees collected from the forest. In the Sawmill, turn trees into valuable wood vital for participation and earning prizes on our platform.",
        "type": "wood",
        "level": 1,
        "is_active": true,
        "prefix_no": 1,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/wood/wood_factory_level_1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/wood_facetory/wood_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/wood/wood_factory_level_1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/wood/level_1/wood_lv_1.glb"
      }
    },
    {
      "_id": "63083c85cb447ca3017399aa",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "63072277cb447ca3018c0fc5",
      "item_amount": 227,
      "item_total": 227,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "63072277cb447ca3018c0fc5",
        "model_id": 13,
        "name": "Oil Refinery",
        "prefix": 105,
        "detail":
          "Take crude oil and transform it via the Oil Refinery. Refine into components to make the oil and gas items essential for many of our play-to-earn games. ",
        "type": "petrol",
        "level": 1,
        "is_active": true,
        "prefix_no": 1,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/oil/oil_factory_level_1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/old_factory/oil_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/oil/oil_factory_level_1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/oil/level_1/oil_lv_1.glb"
      }
    },
    {
      "_id": "63083c4dcb447ca3017372cc",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "630721cecb447ca3018b8dfa",
      "item_amount": 421,
      "item_total": 455,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "630721cecb447ca3018b8dfa",
        "model_id": 10,
        "name": "Iron Mining Plant",
        "prefix": 102,
        "detail":
          "Grind your low-grade Iron into dust, separate the riff-raff, and isolate pristine ingots with immense trading value in the Iron Mining Plant.",
        "type": "iron",
        "level": 1,
        "is_active": true,
        "prefix_no": 1,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/iron/Iron_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/iron/level_1/iron_lv_1.glb"
      }
    },
    {
      "_id": "63083c1bcb447ca3017350e9",
      "created_at": "2022-06-22T07:32:54.861Z",
      "seller_id": null,
      "item_id": "630720e3cb447ca3018acfcc",
      "item_amount": 92,
      "item_total": 97,
      "price": 1,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id": null,
      "building_data": {
        "_id": "630720e3cb447ca3018acfcc",
        "model_id": 7,
        "name": "Gemstone Mining Factory",
        "prefix": 104,
        "detail":
          "Scour the quarry for precious stones. Deliver them to the Gemstone Mining Factory where they are beautified before being presented on the marketplace in all their glory.",
        "type": "gems",
        "level": 1,
        "is_active": true,
        "prefix_no": 1,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/gem/gem_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/gam_facetory/gem_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/gem/gem_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/gem/level_1/gem_lv_1.glb"
      }
    }
  ],
  "info": {
    "pages": 1,
    "limit": 12,
    "currentCount": 12,
    "totalCount": 14
  }
}
