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
import { useCallback, useEffect, useState } from "react"

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
    Array<ITypeMaterials & { amount?: number }> | undefined
  >(undefined)
  const { pathname } = useRouter()

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

  // update materialList
  const updateMaterialList = (
    _type: TInvenVaultAction,
    _tokenId: string,
    _amount: number
  ) => {
    if (materialList) {
      const upd_obj = materialList.findIndex(
        (obj) => obj.material_id_smartcontract === Number(_tokenId)
      )
      let _clone = materialList[upd_obj]
      if (_clone.amount) {
        let cal_amount: number = 0
        if (_type === "decrease") {
          cal_amount = _clone.amount - _amount
        } else {
          cal_amount = _clone.amount + _amount
        }
        _clone = { ..._clone, amount: cal_amount }
        const _dummy = materialList.filter(
          (f) => f.material_id_smartcontract !== Number(_tokenId)
        )
        const _result = [..._dummy, _clone]
        setMaterialList(_result)
      }
    }
  }

  const onFetchInvenMaterial = useCallback(async () => {
    if (profile.data && profile.data.address) {
      setOpen(MESSAGES.transaction_processing_order) // ? changed text
      await getAllMaterialByAddrs(profile.data.address)
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
            setMaterialList(data.filter((_item) => _item.amount > 0))
          }
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setTimeout(() => setClose(), 1000)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.data, materialTypes])

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
            "MoveMaterialToUserSingle(address,address,uint256,uint256)"
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
        setTimeout(() => setClose(), 1000)
      })
  }

  useEffect(() => {
    let load = false
    if (!load && pathname.includes("inventory")) {
      onFetchInvenMaterial()
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchInvenMaterial])

  return {
    materialList,
    updateMaterialList,
    onFetchInvenMaterial,
    onTransferMaterial,
    getAllMaterialByAddrs
  }
}

export default useInvenMaterial
