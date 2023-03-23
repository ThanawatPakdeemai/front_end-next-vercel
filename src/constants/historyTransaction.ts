import { ITransTypes } from "@feature/transaction/interfaces/ITransaction"

export const txLandTypes: ITransTypes[] = [
  // { label: "buy", value: "BuyLand" }, //! no use
  {
    id: "tx_land_mint",
    label: "Mint",
    value: "MintLand"
  },
  {
    id: "tx_land_install",
    label: "Buy-Installment",
    value: "BuyLandInstallment"
  },
  {
    id: "tx_land_fullpay",
    label: "Buy-Fullpayment",
    value: "BuyLandFullpayment"
  },
  {
    id: "tx_land_rent",
    label: "Rent",
    value: "RentLand"
  },
  {
    id: "tx_land_create",
    label: "Create-Order",
    value: "CreateLandOrder"
  },
  {
    id: "tx_land_cancel",
    label: "Cancel-Order",
    value: "CancleLandOrder"
  },
  {
    id: "tx_land_trans",
    label: "Transfer",
    value: "TransferLand"
  },
  { id: "tx_land_claimR", label: "Claim-Rental", value: "ClaimRental" }
]

export const txBuilding: ITransTypes[] = [
  { id: "tx_build_mint", label: "Mint", value: "MintBuilding" },
  {
    id: "tx_build_fullpay",
    label: "Buy-Fullpayment",
    value: "BuyBuildingFullpayment"
  },
  {
    id: "tx_build_install",
    label: "Buy-Installment",
    value: "BuyBuildingInstallment"
  },
  { id: "tx_build_rent", label: "Rent", value: "RentBuilding" },
  { id: "tx_build_cate", label: "Create-Order", value: "CreateBuildingOrder" },
  {
    id: "tx_build_cancel",
    label: "Cancel-Order",
    value: "CancleBuildingOrder"
  },
  {
    id: "tx_build_transfer",
    label: "Transfer",
    value: "NakaVerseTransferBuildingOwner"
  },
  { id: "tx_build_claimR", label: "Claim-Rental", value: "ClaimRental" }
]

export const txGameItemTypes: ITransTypes[] = [
  { id: "tx_gItem_buy", label: "buy", value: "BuyItem" },
  { id: "tx_gItem_use", label: "use", value: "UseItem" },
  { id: "tx_gItem_return", label: "returnItem", value: "ReturnItem" },
  { id: "tx_gItem_reward", label: "claimReward", value: "ClaimRewardItem" },
  { id: "tx_gItem_p2p", label: "p2p", value: "BuyItemP2P" },
  { id: "tx_gItem_cOrder", label: "create-order", value: "CreateItemOrder" },
  { id: "tx_gItem_cancel", label: "cancel-order", value: "CancleItemOrder" },
  { id: "tx_gItem_cItem", label: "create-item", value: "CreateItem" }
]

export const txNakapunkTypes: ITransTypes[] = [
  { id: "tx_punk_buy", label: "Mint", value: "MintNakaPunk" },
  {
    id: "tx_punk_fullpay",
    label: "Buy-Fullpayment",
    value: "BuyNFTNakaPunkFullpayment"
  },
  { id: "tx_punk_create", label: "Create-Order", value: "CreateNakaPunkOrder" },
  { id: "tx_punk_cancel", label: "Cancel-Order", value: "CancleNakaPunkOrder" },
  { id: "tx_punk_transfer", label: "Transfer", value: "NakaPunkTransferOwner" }
]

export const txMaterialTypes: ITransTypes[] = [
  {
    id: "tx_material_cancel",
    label: "Buy-Fullpayment",
    value: "BuyMaterialFullpayment"
  },
  { id: "tx_material_deposit", label: "Deposit", value: "DepositMaterial" },
  { id: "tx_material_withdraw", label: "Withdraw", value: "WithdrawMaterial" },
  {
    id: "tx_material_create",
    label: "Create-Order",
    value: "CreateMaterialOrder"
  },
  {
    id: "tx_material_cancel",
    label: "Cancel-Order",
    value: "CancleMaterialOrder"
  }
]

export const landType = [
  "MintLand",
  "BuyLandInstallment",
  "BuyLandFullpayment",
  "RentLand",
  "CreateLandOrder",
  "CancleLandOrder",
  "TransferLand",
  "ClaimRental"
]
export const gameItemType = [
  "BuyItem",
  "UseItem",
  "ReturnItem",
  "ClaimRewardItem",
  "BuyItemP2P",
  "CreateItemOrder",
  "CancleItemOrder",
  "CreateItem"
]
export const buildingType = [
  "MintBuilding",
  "BuyBuildingFullpayment",
  "BuyBuildingInstallment",
  "RentBuilding",
  "CreateBuildingOrder",
  "CancleBuildingOrder",
  "NakaVerseTransferBuildingOwner",
  "ClaimRental"
]
export const nakaType = [
  "MintNakaPunk",
  "BuyNFTNakaPunkFullpayment",
  "CreateNakaPunkOrder",
  "CancleNakaPunkOrder",
  "NakaPunkTransferOwner"
]
export const materialType = [
  "BuyMaterialFullpayment",
  "DepositMaterial",
  "WithdrawMaterial",
  "CreateMaterialOrder",
  "CancleMaterialOrder"
]
