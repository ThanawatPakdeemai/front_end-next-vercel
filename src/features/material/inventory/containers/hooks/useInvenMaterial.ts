import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  useMaterialVault,
  useMaterialVaultNoAccount
} from "@feature/contract/containers/hooks/useContract"
import { TInvenVaultAction } from "@feature/inventory/interfaces/IInventoryItem"
import { ITypeMaterials } from "@feature/material/marketplace/interfaces/IMaterialService"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import useMarketCategTypes from "@stores/marketCategTypes"
import useProfileStore from "@stores/profileStore"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useInvenMaterial = () => {
  const { profile } = useProfileStore()
  const { materialTypes } = useMarketCategTypes()
  const { utils } = ethers
  const { signer } = useWeb3Provider()
  const materialContract = useMaterialVault(
    signer,
    CONFIGS.CONTRACT_ADDRESS.MATERIAL_VAULT
  )
  const materialNoAccContract = useMaterialVaultNoAccount(
    CONFIGS.CONTRACT_ADDRESS.MATERIAL_VAULT
  )
  const { setOpen, setClose } = useLoadingStore()
  const [materialList, setMaterialList] = useState<
    Array<ITypeMaterials & { amount: number }> | undefined
  >(undefined)
  const { pathname } = useRouter()

  // update materialList
  const updateMaterialList = (
    _type: TInvenVaultAction,
    _tokenId: string,
    _amount: number
  ) => {
    if (materialList) {
      const _dummy = materialList
      const upd_obj = _dummy.findIndex(
        (obj) => obj.material_id_smartcontract === Number(_tokenId)
      )
      let _calAmount: number = _dummy[upd_obj].amount
      if (_type === "decrease") {
        _calAmount = _dummy[upd_obj].amount - _amount
      } else {
        _calAmount = _dummy[upd_obj].amount + _amount
      }
      _dummy[upd_obj].amount = _calAmount
      const result = _dummy // ? not sure for need to declare new variable?
      setMaterialList(result)
    }
  }

  // get all material by address
  const getAllMaterialByAddrs = (_address: string) =>
    new Promise<string[]>((resolve, reject) => {
      materialNoAccContract
        .getAllMaterialAmountbyUser(_address)
        .then((_response: string[]) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onFetchInvenMaterial = async (_address: string) => {
    setOpen(MESSAGES.transaction_processing_order) // ? changed text
    await getAllMaterialByAddrs(_address)
      .then((response) => {
        if (materialTypes) {
          const data = materialTypes
            .sort((_a, _b) =>
              _a.material_id_smartcontract < _b.material_id_smartcontract
                ? -1
                : 1
            )
            .map((m) => ({
              ...m,
              amount: Number(response[m.material_id_smartcontract]) // ! Please check index again
            }))
          setMaterialList(data)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setClose())
  }

  // transfer
  const transferMaterial = (
    _to: string,
    _materialId: string,
    _materialAmount: number
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      materialContract
        .moveMaterialToUserSingle(_to, _materialId, _materialAmount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onTransferMaterial = async (
    _to: string,
    _materialId: string,
    _materialAmount: number = 1
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    await transferMaterial(_to, _materialId, _materialAmount)
      .then(async (response) => {
        const _res = await response.wait()
        const _enTopic = await utils.keccak256(
          utils.toUtf8Bytes(
            "MoveMaterialToUser(address,address,uint256[],uint256[])"
          )
        )
        const _log = _res.logs.find((f) => f.topics.find((l) => l === _enTopic))
        if (_log) {
          const _resultEvent = utils.defaultAbiCoder.decode(
            ["bytes32", "bytes32", "uint256", "uint256"],
            _log.data
          )
          updateMaterialList(
            "decrease",
            _resultEvent[2].toString(),
            Number(_resultEvent[3].toString())
          )
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setClose()
      })
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (profile && profile.data && pathname.includes("inventory")) {
        onFetchInvenMaterial(profile.data.address)
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, materialTypes])

  return {
    materialList:
      materialList && materialList.filter((_item) => _item.amount > 0),
    updateMaterialList,
    onFetchInvenMaterial,
    onTransferMaterial
  }
}

export default useInvenMaterial
