/**
 * @description all these interfaces are available for use in mockup only.
 * Wait P'Aof implement real api/interface
 */
export interface Position {
  x: string
  y: string
}

export interface MaterialInfo {
  detail: string
  image: string
  is_active: boolean
  material_type_id: number
  material_id_smartcontract: number
  model_id: number
  name: string
  name_type: string
  type: string
  createdAt: Date | string
  current_time: Date | string
  id: string
}

export interface RateDeteriorate {
  percentage: number
  cost_material_repair: number
  counting_mining_days: number
  cost_prorate_array: number[]
  day_of_mining_start?: number
  day_of_mining_end?: number
  cost_material_repair_per_day?: number
}

export interface MaterialRepairArray {
  material_type: string
  percent_rate: number
  qty: number
  material_info: MaterialInfo
}

export interface DeteriorateBuilding {
  rate_deteriorate: RateDeteriorate
  material_repair_array: MaterialRepairArray[]
}

export interface LandData {
  _id: string
  name: string
  details: string
  image: string
  qrcode_image: string
  NFT_token: string | null
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
  prefix_no: number
  model_id: number
  name: string
  prefix?: number
  detail: string
  type: string
  level: number
  is_active: boolean
  image: string
  NFT_video: string
  NFT_image: string
  model_3d: string
  counting_mining_days?: number
  building_id_smartcontract?: number
  wallet_adddress?: string
  NFT_token?: string
  player_id?: string
  owner_id?: string
  deteriorate_building?: DeteriorateBuilding
}

export interface MaterialData {
  _id: string
  name: string
  detail: string
  material_id_smartcontract: number
  name_type: string
  image: string
}

export interface NakapunkData {
  _id: string
  NFT_token: string
  is_active: boolean
  description: string
  name: string
  owner_id: string
  player_id: string
  wallet_adddress: string
  image: string
  NFT_video: null
  NFT_image: null
}

export interface IMarketplaceInfoData {
  _id: string
  created_at: Date | string
  seller_id: string | null
  selling_type?: string
  item_id: string
  item_amount: number
  item_total?: number
  period_amount?: number
  price: number
  seller_type: string
  type: string
  is_active: boolean
  order_id: string | null
  item_data?: ItemData
  land_data?: LandData
  building_data?: BuildingData
  material_data?: MaterialData
  nakapunk_data?: NakapunkData
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

export const MOCK_LAND: IMarketplaceInfoResponse = {
  "status": true,
  "data": [
    {
      "_id": "62b2c7218c0f02cadef265bd",
      "created_at": "2022-06-22T07:39:13.280Z",
      "seller_id": null,
      "item_id": "61fa18cbf2378b4c8083db66",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18cbf2378b4c8083db66",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18cbf2378b4c8083db66.jpeg",
        "NFT_token": null,
        "land_id": "11100059",
        "position": {
          "x": "130",
          "y": "37"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100059.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100059.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c7218c0f02cadef265b7",
      "created_at": "2022-06-22T07:39:13.140Z",
      "seller_id": null,
      "item_id": "61fa18cbf2378b4c8083db5e",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18cbf2378b4c8083db5e",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18cbf2378b4c8083db5e.jpeg",
        "NFT_token": null,
        "land_id": "11100058",
        "position": {
          "x": "130",
          "y": "36"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100058.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100058.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c7218c0f02cadef265b1",
      "created_at": "2022-06-22T07:39:13.010Z",
      "seller_id": null,
      "item_id": "61fa18caf2378b4c8083db56",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18caf2378b4c8083db56",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18caf2378b4c8083db56.jpeg",
        "NFT_token": null,
        "land_id": "11100057",
        "position": {
          "x": "130",
          "y": "35"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100057.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100057.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c7208c0f02cadef2659f",
      "created_at": "2022-06-22T07:39:12.623Z",
      "seller_id": null,
      "item_id": "61fa18c9f2378b4c8083db3e",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18c9f2378b4c8083db3e",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18c9f2378b4c8083db3e.jpeg",
        "NFT_token": null,
        "land_id": "11100054",
        "position": {
          "x": "130",
          "y": "32"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100054.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100054.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c7208c0f02cadef26599",
      "created_at": "2022-06-22T07:39:12.496Z",
      "seller_id": null,
      "item_id": "61fa18c9f2378b4c8083db36",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18c9f2378b4c8083db36",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18c9f2378b4c8083db36.jpeg",
        "NFT_token": null,
        "land_id": "11100053",
        "position": {
          "x": "130",
          "y": "25"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100053.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100053.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c7208c0f02cadef26593",
      "created_at": "2022-06-22T07:39:12.360Z",
      "seller_id": null,
      "item_id": "61fa18c8f2378b4c8083db2e",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18c8f2378b4c8083db2e",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18c8f2378b4c8083db2e.jpeg",
        "NFT_token": null,
        "land_id": "11100052",
        "position": {
          "x": "130",
          "y": "24"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100052.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100052.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c7208c0f02cadef2658d",
      "created_at": "2022-06-22T07:39:12.245Z",
      "seller_id": null,
      "item_id": "61fa18c8f2378b4c8083db26",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18c8f2378b4c8083db26",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18c8f2378b4c8083db26.jpeg",
        "NFT_token": null,
        "land_id": "11100051",
        "position": {
          "x": "130",
          "y": "23"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100051.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100051.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c7208c0f02cadef26587",
      "created_at": "2022-06-22T07:39:12.131Z",
      "seller_id": null,
      "item_id": "61fa18c7f2378b4c8083db1e",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18c7f2378b4c8083db1e",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18c7f2378b4c8083db1e.jpeg",
        "NFT_token": null,
        "land_id": "11100050",
        "position": {
          "x": "130",
          "y": "22"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100050.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100050.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c71f8c0f02cadef26581",
      "created_at": "2022-06-22T07:39:12.000Z",
      "seller_id": null,
      "item_id": "61fa18c7f2378b4c8083db16",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18c7f2378b4c8083db16",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18c7f2378b4c8083db16.jpeg",
        "NFT_token": null,
        "land_id": "11100049",
        "position": {
          "x": "130",
          "y": "21"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100049.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100049.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c71f8c0f02cadef2657b",
      "created_at": "2022-06-22T07:39:11.857Z",
      "seller_id": null,
      "item_id": "61fa18c6f2378b4c8083db0e",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18c6f2378b4c8083db0e",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18c6f2378b4c8083db0e.jpeg",
        "NFT_token": null,
        "land_id": "11100048",
        "position": {
          "x": "128",
          "y": "37"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100048.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100048.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c71f8c0f02cadef26575",
      "created_at": "2022-06-22T07:39:11.707Z",
      "seller_id": null,
      "item_id": "61fa18c6f2378b4c8083db06",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18c6f2378b4c8083db06",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18c6f2378b4c8083db06.jpeg",
        "NFT_token": null,
        "land_id": "11100047",
        "position": {
          "x": "128",
          "y": "36"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100047.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100047.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "62b2c71f8c0f02cadef2656f",
      "created_at": "2022-06-22T07:39:11.569Z",
      "seller_id": null,
      "item_id": "61fa18c6f2378b4c8083dafe",
      "item_amount": 1,
      "price": 2,
      "seller_type": "system",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id": null,
      "land_data": {
        "_id": "61fa18c6f2378b4c8083dafe",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18c6f2378b4c8083dafe.jpeg",
        "NFT_token": null,
        "land_id": "11100046",
        "position": {
          "x": "128",
          "y": "35"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100046.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100046.jpg",
        "logo_in_map": null
      }
    }
  ],
  "info": {
    "pages": 1,
    "limit": 12,
    "currentCount": 12,
    "totalCount": 2257
  }
}

export const MOCK_BUILDING: IMarketplaceInfoResponse = {
  "status": true,
  "data": [
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

export const MOCK_P2P_GAME_ITEM: IMarketplaceInfoResponse = {
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

export const MOCK_P2P_LAND: IMarketplaceInfoResponse = {
  "status": true,
  "data": [
    {
      "_id": "640ed1f7532c1914201fdc7f",
      "created_at": "2023-03-13T07:34:15.543Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "61fa18dbf2378b4c8083dc96",
      "item_amount": 1,
      "price": 987,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0xc81945a55b62c6c647eaec08c312c88d316c1b74913de32a8ad96a7295ce7efd",
      "land_data": {
        "_id": "61fa18dbf2378b4c8083dc96",
        "name": "Copper",
        "details":
          "This plot of land is rich in copper ore of high grade and has good development conditions, suitable for mining and smelting.",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/copper.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa18dbf2378b4c8083dc96.jpeg",
        "NFT_token": "11100097",
        "land_id": "11100097",
        "position": {
          "x": "135",
          "y": "25"
        },
        "type": "copper",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Copper/11100097.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Copper/11100097.jpg",
        "logo_in_map": null
      }
    },
    {
      "_id": "64070745e852cc66f11cbeee",
      "created_at": "2023-03-07T09:43:33.267Z",
      "seller_id": "0xbDcf8229769cdfdd54c9FcCd7170b4ee5282eFb5",
      "item_id": "61fa188ff2378b4c8083d6e3",
      "item_amount": 1,
      "price": 5,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_land",
      "is_active": true,
      "order_id":
        "0x94d5efa327783a930aac5ebb0a4b02aaa0a36eb83e2be48c03d6f69e35628e83",
      "land_data": {
        "_id": "61fa188ff2378b4c8083d6e3",
        "name": "Iron",
        "details":
          "This plot of land is rich in iron ore and suitable for iron mining",
        "image":
          "https://nakamoto-s3-test.s3.ap-southeast-1.amazonaws.com/NFT-image/iron.png",
        "qrcode_image":
          "https://nakamoto-s3.s3.ap-southeast-1.amazonaws.com/qrcode-image/61fa188ff2378b4c8083d6e3.jpeg",
        "NFT_token": "11200370",
        "land_id": "11200370",
        "position": {
          "x": "209",
          "y": "-6"
        },
        "type": "iron",
        "logo_approved": false,
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-vdo/Iron/11200370.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/land-image/Iron/11200370.jpg",
        "logo_in_map": null
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
    }
  ],
  "info": {
    "pages": 1,
    "limit": 12,
    "currentCount": 12,
    "totalCount": 32
  }
}

export const MOCK_P2P_BUILDING: IMarketplaceInfoResponse = {
  "status": true,
  "data": [
    {
      "_id": "63fc644814577b246726c29c",
      "period_amount": 0,
      "created_at": "2023-02-27T08:05:28.896Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "63db49b42a5e90526f8e2901",
      "item_amount": 1,
      "price": 80,
      "seller_type": "user",
      "selling_type": "installment",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x20b4ce82c5f1a8a5ddb3f0f9e87a24ee093a4728d7a627e3f146b52073762349",
      "building_data": {
        "_id": "63db49b42a5e90526f8e2901",
        "prefix_no": 153,
        "counting_mining_days": 0,
        "model_id": 29,
        "name": "Weaponsmith",
        "detail":
          "Combine finished products from factories to produce precious items essential for participation in our play-to-earn games. By owning an Items Factory, you respond to the supply and demand of the game by producing the items gamers are yearning for most. Pro Tip: Establish in an urban area for earning bonus.",
        "type": "urban_area",
        "building_id_smartcontract": 11500162,
        "NFT_token": "11500162",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0x20E7B302f92185098082988c482C4218f5c58695",
        "player_id": "61a72d7e970fbe264d627bf5",
        "owner_id": "61a72d7e970fbe264d627bf5",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/office_render/type_2/office_type_2_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/office/office_type_2/office_type_2_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/office_render/type_2/office_type_2_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/office/office_type_2/level_1/office_type_2_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 0,
            "cost_material_repair": 0,
            "counting_mining_days": 0,
            "cost_prorate_array": []
          },
          "material_repair_array": []
        }
      }
    },
    {
      "_id": "63ec9e57e5875c4292e91342",
      "period_amount": 20,
      "created_at": "2023-02-15T08:56:55.665Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "63dcf2a0e66334097fef4ee3",
      "item_amount": 1,
      "price": 3,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0xa8c843912a148fb8e6d61522cb3ab2ce4f2cc9043d0222a43f7edded5275a654",
      "building_data": {
        "_id": "63dcf2a0e66334097fef4ee3",
        "prefix_no": 1,
        "counting_mining_days": 28,
        "model_id": 10,
        "name": "Iron Mining Plant",
        "detail":
          "Grind your low-grade Iron into dust, separate the riff-raff, and isolate pristine ingots with immense trading value in the Iron Mining Plant.",
        "type": "iron",
        "building_id_smartcontract": 10200030,
        "NFT_token": "10200030",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
        "player_id": "628f0046a7f9300e4adda760",
        "owner_id": "628f0046a7f9300e4adda760",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/iron/Iron_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/iron/level_1/iron_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 30,
            "cost_material_repair": 5810,
            "counting_mining_days": 28,
            "day_of_mining_start": 22,
            "day_of_mining_end": 28,
            "cost_material_repair_per_day": 220,
            "cost_prorate_array": [1400, 1400, 1470, 1540]
          },
          "material_repair_array": [
            {
              "material_type": "iron",
              "percent_rate": 75,
              "qty": 4358,
              "material_info": {
                "detail": "Iron",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/iron_processed-min.png",
                "is_active": true,
                "material_type_id": 8,
                "material_id_smartcontract": 8,
                "model_id": 11,
                "name": "Iron",
                "name_type": "iron",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.146Z",
                "current_time": "2023-03-13T08:20:38.146Z",
                "id": "63522c88c81000f1fbb2c09c"
              }
            },
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 1453,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.146Z",
                "current_time": "2023-03-13T08:20:38.146Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63ec8da141babf47aed4d899",
      "period_amount": 20,
      "created_at": "2023-02-15T07:45:37.447Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "63dce39a33f37f0dfc3515a8",
      "item_amount": 1,
      "price": 2,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x66abc10390bc87b221ca532e91fd6040578a0bd8cf9b29e58862abc4f03a9d77",
      "building_data": {
        "_id": "63dce39a33f37f0dfc3515a8",
        "prefix_no": 1,
        "counting_mining_days": 22,
        "model_id": 7,
        "name": "Gemstone Mining Factory",
        "detail":
          "Scour the quarry for precious stones. Deliver them to the Gemstone Mining Factory where they are beautified before being presented on the marketplace in all their glory.",
        "type": "gems",
        "building_id_smartcontract": 10400041,
        "NFT_token": "10400041",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
        "player_id": "628f0046a7f9300e4adda760",
        "owner_id": "628f0046a7f9300e4adda760",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/gem/gem_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/gam_facetory/gem_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/gem/gem_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/gem/level_1/gem_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 30,
            "cost_material_repair": 4490,
            "counting_mining_days": 22,
            "day_of_mining_start": 22,
            "day_of_mining_end": 28,
            "cost_material_repair_per_day": 220,
            "cost_prorate_array": [1400, 1400, 1470, 220]
          },
          "material_repair_array": [
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 1123,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.137Z",
                "current_time": "2023-03-13T08:20:38.137Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            },
            {
              "material_type": "gems",
              "percent_rate": 75,
              "qty": 3368,
              "material_info": {
                "detail": "Gems",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/gem_processed-min.png",
                "is_active": true,
                "material_type_id": 10,
                "material_id_smartcontract": 10,
                "model_id": 10,
                "name": "Gems",
                "name_type": "gems",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.137Z",
                "current_time": "2023-03-13T08:20:38.137Z",
                "id": "63522c88c81000f1fbb2c09e"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63ec8b8841babf47aed4884c",
      "period_amount": 20,
      "created_at": "2023-02-15T07:36:40.590Z",
      "seller_id": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
      "item_id": "63eb6b95a7769131660fb33a",
      "item_amount": 1,
      "price": 1,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x22cbf9a42a8c1cbf3359033fd06d0926ae8b964538a997b519659838a9edb11d",
      "building_data": {
        "_id": "63eb6b95a7769131660fb33a",
        "prefix_no": 1,
        "counting_mining_days": 50,
        "model_id": 10,
        "name": "Iron Mining Plant",
        "detail":
          "Grind your low-grade Iron into dust, separate the riff-raff, and isolate pristine ingots with immense trading value in the Iron Mining Plant.",
        "type": "iron",
        "building_id_smartcontract": 10200048,
        "NFT_token": "10200048",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
        "player_id": "63993b310f8ff71f6e0f7770",
        "owner_id": "63993b310f8ff71f6e0f7770",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/iron/Iron_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/iron/level_1/iron_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 70,
            "cost_material_repair": 11110,
            "counting_mining_days": 50,
            "day_of_mining_start": 50,
            "day_of_mining_end": 56,
            "cost_material_repair_per_day": 260,
            "cost_prorate_array": [
              1400, 1400, 1470, 1540, 1610, 1680, 1750, 260
            ]
          },
          "material_repair_array": [
            {
              "material_type": "iron",
              "percent_rate": 75,
              "qty": 8333,
              "material_info": {
                "detail": "Iron",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/iron_processed-min.png",
                "is_active": true,
                "material_type_id": 8,
                "material_id_smartcontract": 8,
                "model_id": 11,
                "name": "Iron",
                "name_type": "iron",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.074Z",
                "current_time": "2023-03-13T08:20:38.074Z",
                "id": "63522c88c81000f1fbb2c09c"
              }
            },
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 2778,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.074Z",
                "current_time": "2023-03-13T08:20:38.074Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63ec8a0741babf47aed437b2",
      "period_amount": 20,
      "created_at": "2023-02-15T07:30:15.210Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "63c61c379cb64331fbbee70f",
      "item_amount": 1,
      "price": 2,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x70c4f8fa25569319a36b90be6168bd14c9f25ce72a5041b8238b7941c70c96fc",
      "building_data": {
        "_id": "63c61c379cb64331fbbee70f",
        "prefix_no": 1,
        "model_id": 1,
        "name": "Coal Mining Plant",
        "detail":
          "Extract, separate, and crush your coal ore in the Coal Mining Plant, preparing priceless fuel for trading on the marketplace.",
        "type": "coal",
        "building_id_smartcontract": 10600006,
        "NFT_token": "10600006",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
        "player_id": "628f0046a7f9300e4adda760",
        "owner_id": "628f0046a7f9300e4adda760",
        "counting_mining_days": 37,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/coal/coal_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/coal_factory/coal_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/coal/coal_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/coal/level_1/coal_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 50,
            "cost_material_repair": 7900,
            "counting_mining_days": 37,
            "day_of_mining_start": 36,
            "day_of_mining_end": 42,
            "cost_material_repair_per_day": 240,
            "cost_prorate_array": [1400, 1400, 1470, 1540, 1610, 480]
          },
          "material_repair_array": [
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 1975,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.070Z",
                "current_time": "2023-03-13T08:20:38.070Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            },
            {
              "material_type": "coal",
              "percent_rate": 75,
              "qty": 5925,
              "material_info": {
                "detail": "Coal",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/coal_processed-min.png",
                "is_active": true,
                "material_type_id": 12,
                "material_id_smartcontract": 12,
                "model_id": 7,
                "name": "Coal",
                "name_type": "coal",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.070Z",
                "current_time": "2023-03-13T08:20:38.070Z",
                "id": "63522c88c81000f1fbb2c0a0"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63ec89cc41babf47aed4353d",
      "period_amount": 100,
      "created_at": "2023-02-15T07:29:16.916Z",
      "seller_id": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
      "item_id": "63ec568568ef0132b9030f54",
      "item_amount": 1,
      "price": 1000,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x74478bd75ee2c5b367eca252966a1947f4c0318a5b7a1e1ef0224b93d6e84deb",
      "building_data": {
        "_id": "63ec568568ef0132b9030f54",
        "prefix_no": 1,
        "counting_mining_days": 101,
        "model_id": 10,
        "name": "Iron Mining Plant",
        "detail":
          "Grind your low-grade Iron into dust, separate the riff-raff, and isolate pristine ingots with immense trading value in the Iron Mining Plant.",
        "type": "iron",
        "building_id_smartcontract": 10200050,
        "NFT_token": "10200050",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
        "player_id": "63993b310f8ff71f6e0f7770",
        "owner_id": "63993b310f8ff71f6e0f7770",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/iron/Iron_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/iron/level_1/iron_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 100,
            "cost_material_repair": 25510,
            "counting_mining_days": 101,
            "day_of_mining_start": 71,
            "day_of_mining_end": 90000000,
            "cost_material_repair_per_day": 290,
            "cost_prorate_array": [
              1400, 1400, 1470, 1540, 1610, 1680, 1750, 1820, 1890, 1960, 8990
            ]
          },
          "material_repair_array": [
            {
              "material_type": "iron",
              "percent_rate": 75,
              "qty": 19133,
              "material_info": {
                "detail": "Iron",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/iron_processed-min.png",
                "is_active": true,
                "material_type_id": 8,
                "material_id_smartcontract": 8,
                "model_id": 11,
                "name": "Iron",
                "name_type": "iron",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.074Z",
                "current_time": "2023-03-13T08:20:38.074Z",
                "id": "63522c88c81000f1fbb2c09c"
              }
            },
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 6378,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:38.074Z",
                "current_time": "2023-03-13T08:20:38.074Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63eb4a7293b0da0ef0d4e7a7",
      "period_amount": 10,
      "created_at": "2023-02-14T08:46:42.042Z",
      "seller_id": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
      "item_id": "63eb4a3c93b0da0ef0d4e436",
      "item_amount": 1,
      "price": 1,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x3b6ee769a199beab9f2d2b9f681dcfcb692999685f1114a3a2506b7250420247",
      "building_data": {
        "_id": "63eb4a3c93b0da0ef0d4e436",
        "prefix_no": 1,
        "counting_mining_days": 3,
        "model_id": 10,
        "name": "Iron Mining Plant",
        "detail":
          "Grind your low-grade Iron into dust, separate the riff-raff, and isolate pristine ingots with immense trading value in the Iron Mining Plant.",
        "type": "iron",
        "building_id_smartcontract": 10200046,
        "NFT_token": "10200046",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
        "player_id": "63993b310f8ff71f6e0f7770",
        "owner_id": "63993b310f8ff71f6e0f7770",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/iron/Iron_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/iron/level_1/iron_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 0,
            "cost_material_repair": 600,
            "counting_mining_days": 3,
            "day_of_mining_start": 1,
            "day_of_mining_end": 7,
            "cost_material_repair_per_day": 200,
            "cost_prorate_array": [600]
          },
          "material_repair_array": [
            {
              "material_type": "iron",
              "percent_rate": 75,
              "qty": 450,
              "material_info": {
                "detail": "Iron",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/iron_processed-min.png",
                "is_active": true,
                "material_type_id": 8,
                "material_id_smartcontract": 8,
                "model_id": 11,
                "name": "Iron",
                "name_type": "iron",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.634Z",
                "current_time": "2023-03-13T08:20:37.634Z",
                "id": "63522c88c81000f1fbb2c09c"
              }
            },
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 150,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.634Z",
                "current_time": "2023-03-13T08:20:37.634Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63eb041438adbe71b6d78d3d",
      "period_amount": 20,
      "created_at": "2023-02-14T03:46:28.821Z",
      "seller_id": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
      "item_id": "63eb038538adbe71b6d780da",
      "item_amount": 1,
      "price": 2,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x04a48cbb17b8e376ce79b509b7a05ef0c8b9348ef86cddf70b81ac7c227bdf79",
      "building_data": {
        "_id": "63eb038538adbe71b6d780da",
        "prefix_no": 1,
        "counting_mining_days": 0,
        "model_id": 10,
        "name": "Iron Mining Plant",
        "detail":
          "Grind your low-grade Iron into dust, separate the riff-raff, and isolate pristine ingots with immense trading value in the Iron Mining Plant.",
        "type": "iron",
        "building_id_smartcontract": 10200043,
        "NFT_token": "10200043",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
        "player_id": "63993b310f8ff71f6e0f7770",
        "owner_id": "63993b310f8ff71f6e0f7770",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/iron/Iron_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/iron/level_1/iron_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 0,
            "cost_material_repair": 0,
            "counting_mining_days": 0,
            "cost_prorate_array": []
          },
          "material_repair_array": [
            {
              "material_type": "iron",
              "percent_rate": 75,
              "qty": 0,
              "material_info": {
                "detail": "Iron",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/iron_processed-min.png",
                "is_active": true,
                "material_type_id": 8,
                "material_id_smartcontract": 8,
                "model_id": 11,
                "name": "Iron",
                "name_type": "iron",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.611Z",
                "current_time": "2023-03-13T08:20:37.611Z",
                "id": "63522c88c81000f1fbb2c09c"
              }
            },
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 0,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.611Z",
                "current_time": "2023-03-13T08:20:37.611Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63e4d87488595342cf0c5b81",
      "period_amount": 300,
      "created_at": "2023-02-09T11:26:44.392Z",
      "seller_id": "0x28698158F3b062446FE563226D5C6e8802c52E30",
      "item_id": "63e4aa88ac804e552fa08120",
      "item_amount": 1,
      "price": 1,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x30cd0bc3933a8710ebff115fc76c618910665d38e41b7b766e5bc73ef2a380a3",
      "building_data": {
        "_id": "63e4aa88ac804e552fa08120",
        "prefix_no": 1,
        "counting_mining_days": 0,
        "model_id": 10,
        "name": "Iron Mining Plant",
        "detail":
          "Grind your low-grade Iron into dust, separate the riff-raff, and isolate pristine ingots with immense trading value in the Iron Mining Plant.",
        "type": "iron",
        "building_id_smartcontract": 10200035,
        "NFT_token": "10200035",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0x28698158F3b062446FE563226D5C6e8802c52E30",
        "player_id": "61d51db5e64c9751321a8ecc",
        "owner_id": "61d51db5e64c9751321a8ecc",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/iron/Iron_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/iron/iron_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/iron/level_1/iron_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 0,
            "cost_material_repair": 0,
            "counting_mining_days": 0,
            "cost_prorate_array": []
          },
          "material_repair_array": [
            {
              "material_type": "iron",
              "percent_rate": 75,
              "qty": 0,
              "material_info": {
                "detail": "Iron",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/iron_processed-min.png",
                "is_active": true,
                "material_type_id": 8,
                "material_id_smartcontract": 8,
                "model_id": 11,
                "name": "Iron",
                "name_type": "iron",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.502Z",
                "current_time": "2023-03-13T08:20:37.502Z",
                "id": "63522c88c81000f1fbb2c09c"
              }
            },
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 0,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.502Z",
                "current_time": "2023-03-13T08:20:37.502Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63e1f86dd7a577537de09a34",
      "period_amount": 0,
      "created_at": "2023-02-07T07:06:21.684Z",
      "seller_id": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
      "item_id": "63d78f514fe1c118f66c89e8",
      "item_amount": 1,
      "price": 5,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x447cb1767056dffc12ec0c92f8aa08b22d455f5377987ec006bae244a8653204",
      "building_data": {
        "_id": "63d78f514fe1c118f66c89e8",
        "prefix_no": 1,
        "model_id": 1,
        "name": "Coal Mining Plant",
        "detail":
          "Extract, separate, and crush your coal ore in the Coal Mining Plant, preparing priceless fuel for trading on the marketplace.",
        "type": "coal",
        "building_id_smartcontract": 10600017,
        "NFT_token": "10600017",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
        "player_id": "63993b310f8ff71f6e0f7770",
        "owner_id": "63993b310f8ff71f6e0f7770",
        "counting_mining_days": 0,
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/coal/coal_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/coal_factory/coal_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/coal/coal_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/coal/level_1/coal_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 0,
            "cost_material_repair": 0,
            "counting_mining_days": 0,
            "cost_prorate_array": []
          },
          "material_repair_array": [
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 0,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.395Z",
                "current_time": "2023-03-13T08:20:37.395Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            },
            {
              "material_type": "coal",
              "percent_rate": 75,
              "qty": 0,
              "material_info": {
                "detail": "Coal",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/coal_processed-min.png",
                "is_active": true,
                "material_type_id": 12,
                "material_id_smartcontract": 12,
                "model_id": 7,
                "name": "Coal",
                "name_type": "coal",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.395Z",
                "current_time": "2023-03-13T08:20:37.395Z",
                "id": "63522c88c81000f1fbb2c0a0"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63e0db2101570c75b944040b",
      "period_amount": 10,
      "created_at": "2023-02-06T10:49:05.776Z",
      "seller_id": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
      "item_id": "63db92295b608b515d7cdeda",
      "item_amount": 1,
      "price": 2,
      "seller_type": "user",
      "selling_type": "rental",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x3f0b18ae9d92c896f476721ef71a7b110f4a5a78cfb9cfc98b41fc833b1ee5d8",
      "building_data": {
        "_id": "63db92295b608b515d7cdeda",
        "prefix_no": 1,
        "counting_mining_days": 1,
        "model_id": 4,
        "name": "Copper Mining Plant",
        "detail":
          "Blast and break rocks to extract copper. Then convert through a series of intense industrial processes to produce large quantities of valuable copper ore.",
        "type": "copper",
        "building_id_smartcontract": 10100051,
        "NFT_token": "10100051",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0xc5DB59c64DCDF875f4CE3EC4f0EE70f8B455eb1E",
        "player_id": "628f0046a7f9300e4adda760",
        "owner_id": "628f0046a7f9300e4adda760",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/copper/copper_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/copper_facetory/copper_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/copper/copper_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/copper/level_1/copper_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 0,
            "cost_material_repair": 200,
            "counting_mining_days": 1,
            "day_of_mining_start": 1,
            "day_of_mining_end": 7,
            "cost_material_repair_per_day": 200,
            "cost_prorate_array": [200]
          },
          "material_repair_array": [
            {
              "material_type": "copper",
              "percent_rate": 75,
              "qty": 150,
              "material_info": {
                "detail": "Copper",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/copper_processed-min.png",
                "is_active": true,
                "material_type_id": 7,
                "material_id_smartcontract": 7,
                "model_id": 8,
                "name": "Copper",
                "name_type": "copper",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.288Z",
                "current_time": "2023-03-13T08:20:37.288Z",
                "id": "63522c88c81000f1fbb2c09b"
              }
            },
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 50,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.288Z",
                "current_time": "2023-03-13T08:20:37.288Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            }
          ]
        }
      }
    },
    {
      "_id": "63e0bb0a54429c7c940c2226",
      "period_amount": 0,
      "created_at": "2023-02-06T08:32:10.636Z",
      "seller_id": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
      "item_id": "63e0baa954429c7c940c1bae",
      "item_amount": 1,
      "price": 5,
      "seller_type": "user",
      "selling_type": "installment",
      "type": "nft_building",
      "is_active": true,
      "order_id":
        "0x0f4a2bde082addc80f05d3977fac4976b5bf0a04c6ed6f824a6227eeb94d4c24",
      "building_data": {
        "_id": "63e0baa954429c7c940c1bae",
        "prefix_no": 1,
        "counting_mining_days": 1,
        "model_id": 4,
        "name": "Copper Mining Plant",
        "detail":
          "Blast and break rocks to extract copper. Then convert through a series of intense industrial processes to produce large quantities of valuable copper ore.",
        "type": "copper",
        "building_id_smartcontract": 10100054,
        "NFT_token": "10100054",
        "level": 1,
        "is_active": true,
        "wallet_adddress": "0x2e2316623DaCD6107a93A9e9c188163c1c8Da87e",
        "player_id": "63993b310f8ff71f6e0f7770",
        "owner_id": "63993b310f8ff71f6e0f7770",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/copper/copper_factory_lv1.png",
        "NFT_video":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nft_building_mp4/factory/copper_facetory/copper_level_1.mp4",
        "NFT_image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/only_building/factory_render/copper/copper_factory_lv1.png",
        "model_3d":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/render/nakaverse_steampunk_model/factory/copper/level_1/copper_lv_1.glb",
        "deteriorate_building": {
          "rate_deteriorate": {
            "percentage": 0,
            "cost_material_repair": 200,
            "counting_mining_days": 1,
            "day_of_mining_start": 1,
            "day_of_mining_end": 7,
            "cost_material_repair_per_day": 200,
            "cost_prorate_array": [200]
          },
          "material_repair_array": [
            {
              "material_type": "copper",
              "percent_rate": 75,
              "qty": 150,
              "material_info": {
                "detail": "Copper",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/copper_processed-min.png",
                "is_active": true,
                "material_type_id": 7,
                "material_id_smartcontract": 7,
                "model_id": 8,
                "name": "Copper",
                "name_type": "copper",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.286Z",
                "current_time": "2023-03-13T08:20:37.286Z",
                "id": "63522c88c81000f1fbb2c09b"
              }
            },
            {
              "material_type": "wood",
              "percent_rate": 25,
              "qty": 50,
              "material_info": {
                "detail": "Wood",
                "image":
                  "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/processed/wood_processed-min.png",
                "is_active": true,
                "material_type_id": 9,
                "material_id_smartcontract": 9,
                "model_id": 6,
                "name": "Wood",
                "name_type": "wood",
                "type": "material",
                "createdAt": "2023-03-13T08:20:37.286Z",
                "current_time": "2023-03-13T08:20:37.286Z",
                "id": "63522c88c81000f1fbb2c09d"
              }
            }
          ]
        }
      }
    }
  ],
  "info": {
    "pages": 1,
    "limit": 12,
    "currentCount": 12,
    "totalCount": 19
  }
}

export const MOCK_P2P_MATERIAL: IMarketplaceInfoResponse = {
  "status": true,
  "data": [
    {
      "_id": "63bf83d4f0a7760172a73d13",
      "created_at": "2023-01-12T03:51:48.294Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "61bc489ec7e557cc28ed2c1e",
      "item_amount": 8,
      "price": 9,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0xbed179ab0910c1e44f5965a945b63ad0db28e9f03965f42753d64f2a2937ab25",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1e",
        "name": "Wood log",
        "detail": "Wood log",
        "material_id_smartcontract": 3,
        "name_type": "wood_log",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/wood_unprocessed-min.png"
      }
    },
    {
      "_id": "63a136fb59d3cb7765b0507e",
      "created_at": "2022-12-20T04:15:55.673Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "61bc489ec7e557cc28ed2c1e",
      "item_amount": 3,
      "price": 10,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0x4537855748c3abef5131cc19db7c5c63cdf88f8a1d8846b37b063aa7f61cc6fa",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1e",
        "name": "Wood log",
        "detail": "Wood log",
        "material_id_smartcontract": 3,
        "name_type": "wood_log",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/wood_unprocessed-min.png"
      }
    },
    {
      "_id": "63a1352159d3cb7765afdf61",
      "created_at": "2022-12-20T04:08:01.263Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "61bc489ec7e557cc28ed2c1e",
      "item_amount": 9,
      "price": 1,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0x48f7837732ad75375c6bd121df083e5087f1e35dc342a96b0a4157c2d327e67a",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1e",
        "name": "Wood log",
        "detail": "Wood log",
        "material_id_smartcontract": 3,
        "name_type": "wood_log",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/wood_unprocessed-min.png"
      }
    },
    {
      "_id": "6391b872e3a3dc2e81b118e0",
      "created_at": "2022-12-08T10:12:02.458Z",
      "seller_id": "0x28698158F3b062446FE563226D5C6e8802c52E30",
      "item_id": "61bc489ec7e557cc28ed2c1d",
      "item_amount": 90,
      "price": 900,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0xa9549a83d8e961a906349f9ebe872f619d75a901d8ef10f672a17ab032a832fa",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1d",
        "name": "Iron ore",
        "detail": "Iron ore",
        "material_id_smartcontract": 2,
        "name_type": "iron_ore",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/iron_unprocessed-min.png"
      }
    },
    {
      "_id": "6391b871e3a3dc2e81b118d5",
      "created_at": "2022-12-08T10:12:01.035Z",
      "seller_id": "0x28698158F3b062446FE563226D5C6e8802c52E30",
      "item_id": "61bc489ec7e557cc28ed2c1d",
      "item_amount": 90,
      "price": 900,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0xcd8b2f19f7ed79cfa1f684d6690d6a98b196f98f6089c1efb7f948819906954e",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1d",
        "name": "Iron ore",
        "detail": "Iron ore",
        "material_id_smartcontract": 2,
        "name_type": "iron_ore",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/iron_unprocessed-min.png"
      }
    },
    {
      "_id": "6391b86fe3a3dc2e81b118ca",
      "created_at": "2022-12-08T10:11:59.604Z",
      "seller_id": "0x28698158F3b062446FE563226D5C6e8802c52E30",
      "item_id": "61bc489ec7e557cc28ed2c1d",
      "item_amount": 90,
      "price": 900,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0xc008a487795b5e2066fdb1dc46ed2e7b3d1520a8629172007c065086ad89f986",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1d",
        "name": "Iron ore",
        "detail": "Iron ore",
        "material_id_smartcontract": 2,
        "name_type": "iron_ore",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/iron_unprocessed-min.png"
      }
    },
    {
      "_id": "6391b869e3a3dc2e81b1189e",
      "created_at": "2022-12-08T10:11:53.878Z",
      "seller_id": "0x488eB9E6FDC14F1FB5be2C6bE3aA1D08cBA19218",
      "item_id": "61bc489ec7e557cc28ed2c1c",
      "item_amount": 1,
      "price": 10,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0xfd94ecc9ea48618eeed7711c0b79d6237cb047ee25f43a7c65b45fb58adab4f4",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1c",
        "name": "Copper ore",
        "detail": "Copper ore",
        "material_id_smartcontract": 1,
        "name_type": "copper_ore",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/copper_unprocessed-min.png"
      }
    },
    {
      "_id": "6391b868e3a3dc2e81b11893",
      "created_at": "2022-12-08T10:11:52.444Z",
      "seller_id": "0x488eB9E6FDC14F1FB5be2C6bE3aA1D08cBA19218",
      "item_id": "61bc489ec7e557cc28ed2c1c",
      "item_amount": 1,
      "price": 10,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0x796efebf1a24a118c38a0e80d51d2a70739f45caad2b7c0d3a8829f18f11d188",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1c",
        "name": "Copper ore",
        "detail": "Copper ore",
        "material_id_smartcontract": 1,
        "name_type": "copper_ore",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/copper_unprocessed-min.png"
      }
    },
    {
      "_id": "6391b866e3a3dc2e81b11888",
      "created_at": "2022-12-08T10:11:50.993Z",
      "seller_id": "0x488eB9E6FDC14F1FB5be2C6bE3aA1D08cBA19218",
      "item_id": "61bc489ec7e557cc28ed2c1c",
      "item_amount": 1,
      "price": 2,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0x08c7dd77d7cc12dcbed8347ac258f360978cde3724779a9c284d6c9fba49d12b",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1c",
        "name": "Copper ore",
        "detail": "Copper ore",
        "material_id_smartcontract": 1,
        "name_type": "copper_ore",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/copper_unprocessed-min.png"
      }
    },
    {
      "_id": "6391b865e3a3dc2e81b1187d",
      "created_at": "2022-12-08T10:11:49.509Z",
      "seller_id": "0x488eB9E6FDC14F1FB5be2C6bE3aA1D08cBA19218",
      "item_id": "61bc489ec7e557cc28ed2c1e",
      "item_amount": 1,
      "price": 10,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0xbd2571f95a6b7b03312262b9a5d7542829f0d5c24587a35295594b0ea1724d62",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1e",
        "name": "Wood log",
        "detail": "Wood log",
        "material_id_smartcontract": 3,
        "name_type": "wood_log",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/wood_unprocessed-min.png"
      }
    },
    {
      "_id": "6391b862e3a3dc2e81b11867",
      "created_at": "2022-12-08T10:11:46.449Z",
      "seller_id": "0x488eB9E6FDC14F1FB5be2C6bE3aA1D08cBA19218",
      "item_id": "61bc489ec7e557cc28ed2c1c",
      "item_amount": 1,
      "price": 13,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0x31fde0b4f5a83b17ec6a18a7622df076a0f904e5b056d8e65f875d233a8a3e00",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1c",
        "name": "Copper ore",
        "detail": "Copper ore",
        "material_id_smartcontract": 1,
        "name_type": "copper_ore",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/copper_unprocessed-min.png"
      }
    },
    {
      "_id": "6391b860e3a3dc2e81b1185c",
      "created_at": "2022-12-08T10:11:44.923Z",
      "seller_id": "0x488eB9E6FDC14F1FB5be2C6bE3aA1D08cBA19218",
      "item_id": "61bc489ec7e557cc28ed2c1e",
      "item_amount": 1,
      "price": 12,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_material",
      "is_active": true,
      "order_id":
        "0xabfc95fefc867d36aaeb7e3f638e6f2d7828ebd5a58ad09eb0d4aa8f381d359e",
      "material_data": {
        "_id": "61bc489ec7e557cc28ed2c1e",
        "name": "Wood log",
        "detail": "Wood log",
        "material_id_smartcontract": 3,
        "name_type": "wood_log",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/nakaverse/resource/unprocessed/wood_unprocessed-min.png"
      }
    }
  ],
  "info": {
    "pages": 1,
    "limit": 12,
    "currentCount": 12,
    "totalCount": 90
  }
}

export const MOCK_P2P_NAKA_PUNK: IMarketplaceInfoResponse = {
  "status": true,
  "data": [
    {
      "_id": "63c639372b6443221ccbb070",
      "created_at": "2023-01-17T05:59:19.492Z",
      "seller_id": "0x5CBb8603db4A5F954084ccFBF9E123D476e989A4",
      "item_id": "63c638682b6443221ccbaa93",
      "item_amount": 1,
      "price": 30,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_naka_punk",
      "is_active": true,
      "order_id":
        "0xcc0da13c2c7f201b45fd80b78fba71553f0868bf0a52f2d4a149fba9920a2919",
      "nakapunk_data": {
        "_id": "63c638682b6443221ccbaa93",
        "name": "NakaPunk #8791",
        "description":
          "The NAKA Punks is a next-generation NFT collection. It not only brings a limited collection of unique punklike characters into a world built for them but also integrates privileges to the holders of these NFTs. Each punk will have distinct characteristics, strengths, and weaknesses, bestowing unique capabilities on their owners and will be particularly suitable for certain activities within the Nakamoto.games and NAKAVERSE.",
        "NFT_token": "8791",
        "is_active": true,
        "wallet_adddress": "0x5CBb8603db4A5F954084ccFBF9E123D476e989A4",
        "player_id": "61a72161970fbe264d62662c",
        "owner_id": "61a72161970fbe264d62662c",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/8791.png",
        "NFT_video": null,
        "NFT_image": null
      }
    },
    {
      "_id": "63bfc63d649004244f7f48fb",
      "created_at": "2023-01-12T08:35:09.472Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "63bfc5d7649004244f7f4224",
      "item_amount": 1,
      "price": 200,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_naka_punk",
      "is_active": true,
      "order_id":
        "0x2f6296f1acded498ac376e43685a23c1f9b88dc4dbfa17e913f63093593b5ff2",
      "nakapunk_data": {
        "_id": "63bfc5d7649004244f7f4224",
        "name": "NakaPunk #5155",
        "description":
          "The NAKA Punks is a next-generation NFT collection. It not only brings a limited collection of unique punklike characters into a world built for them but also integrates privileges to the holders of these NFTs. Each punk will have distinct characteristics, strengths, and weaknesses, bestowing unique capabilities on their owners and will be particularly suitable for certain activities within the Nakamoto.games and NAKAVERSE.",
        "NFT_token": "5155",
        "is_active": true,
        "wallet_adddress": "0x20E7B302f92185098082988c482C4218f5c58695",
        "player_id": "61a72d7e970fbe264d627bf5",
        "owner_id": "61a72d7e970fbe264d627bf5",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/5155.png",
        "NFT_video": null,
        "NFT_image": null
      }
    },
    {
      "_id": "63bf09faf0a7760172a6a611",
      "created_at": "2023-01-11T19:11:54.154Z",
      "seller_id": "0x20E7B302f92185098082988c482C4218f5c58695",
      "item_id": "63bf095cf0a7760172a6a554",
      "item_amount": 1,
      "price": 25,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_naka_punk",
      "is_active": true,
      "order_id":
        "0xcae9d566649c5773d31bd8f55f15454c48f6bd2581033b94eb45d35307f0b409",
      "nakapunk_data": {
        "_id": "63bf095cf0a7760172a6a554",
        "name": "NakaPunk #5456",
        "description":
          "The NAKA Punks is a next-generation NFT collection. It not only brings a limited collection of unique punklike characters into a world built for them but also integrates privileges to the holders of these NFTs. Each punk will have distinct characteristics, strengths, and weaknesses, bestowing unique capabilities on their owners and will be particularly suitable for certain activities within the Nakamoto.games and NAKAVERSE.",
        "NFT_token": "5456",
        "is_active": true,
        "wallet_adddress": "0x20E7B302f92185098082988c482C4218f5c58695",
        "player_id": "61a72d7e970fbe264d627bf5",
        "owner_id": "61a72d7e970fbe264d627bf5",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/5456.png",
        "NFT_video": null,
        "NFT_image": null
      }
    },
    {
      "_id": "63be8a74db948270058bc954",
      "created_at": "2023-01-11T10:07:48.693Z",
      "seller_id": "0x05572Be097ea6351bd4a5e0D7afD3960B24CEc22",
      "item_id": "63be8a3fdb948270058bc7e1",
      "item_amount": 1,
      "price": 1001,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_naka_punk",
      "is_active": true,
      "order_id":
        "0xc68cce00e32596c71b3190a92c0407203fe8721668d684607fd71a3051340c9d",
      "nakapunk_data": {
        "_id": "63be8a3fdb948270058bc7e1",
        "name": "NakaPunk #7382",
        "description":
          "The NAKA Punks is a next-generation NFT collection. It not only brings a limited collection of unique punklike characters into a world built for them but also integrates privileges to the holders of these NFTs. Each punk will have distinct characteristics, strengths, and weaknesses, bestowing unique capabilities on their owners and will be particularly suitable for certain activities within the Nakamoto.games and NAKAVERSE.",
        "NFT_token": "7382",
        "is_active": true,
        "wallet_adddress": "0x05572Be097ea6351bd4a5e0D7afD3960B24CEc22",
        "player_id": "6388304cd1b29e1618e7277f",
        "owner_id": "6388304cd1b29e1618e7277f",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/7382.png",
        "NFT_video": null,
        "NFT_image": null
      }
    },
    {
      "_id": "63b7a096a9efc64ece37d3b6",
      "created_at": "2023-01-06T04:16:22.562Z",
      "seller_id": "0x74d577C2913F035F16C0cbD3612f8Dc8B7828b10",
      "item_id": "6388557ab3b78854a1ee5fff",
      "item_amount": 1,
      "price": 200,
      "seller_type": "user",
      "selling_type": "fullpayment",
      "type": "nft_naka_punk",
      "is_active": true,
      "order_id":
        "0x0f10afe3052c1bff79cca8568e3baae1b6844a1680c82a6bdcaa29a93a59c373",
      "nakapunk_data": {
        "_id": "6388557ab3b78854a1ee5fff",
        "NFT_token": "6733",
        "is_active": true,
        "description":
          "The NAKA Punks is a next-generation NFT collection. It not only brings a limited collection of unique punklike characters into a world built for them but also integrates privileges to the holders of these NFTs. Each punk will have distinct characteristics, strengths, and weaknesses, bestowing unique capabilities on their owners and will be particularly suitable for certain activities within the Nakamoto.games and NAKAVERSE.",
        "name": "NakaPunk #6733",
        "owner_id": "63843931fce386616bcf7bf0",
        "player_id": "63843931fce386616bcf7bf0",
        "wallet_adddress": "0x74d577C2913F035F16C0cbD3612f8Dc8B7828b10",
        "image":
          "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/6733.png",
        "NFT_video": null,
        "NFT_image": null
      }
    }
  ],
  "info": {
    "pages": 1,
    "limit": 12,
    "currentCount": 5,
    "totalCount": 5
  }
}
