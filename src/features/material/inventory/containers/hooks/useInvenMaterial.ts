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
import { useCallback } from "react"

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

  // get item by addrs & token id
  const getMaterialByToken = (_address: string, _token: string) =>
    new Promise<string>((resolve, reject) => {
      materialNoAccContract
        .getMaterialAmountbyUser(_address, _token)
        .then((_response: string) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

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

  // update _arr
  const updateMaterialList = (
    _arr: Array<ITypeMaterials & { amount?: number }> | undefined,
    _type: TInvenVaultAction,
    _tokenId: string,
    _amount: number
  ) => {
    if (_arr) {
      const upd_obj = _arr.findIndex(
        (obj) => obj.material_id_smartcontract === Number(_tokenId)
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
          (f) => f.material_id_smartcontract !== Number(_tokenId)
        )
        const _result = [..._dummy, _clone]
        return _result
      }
    }
  }

  const onFetchInvenMaterial = useCallback(async () => {
    if (
      profile.data &&
      profile.data.address &&
      materialTypes &&
      materialTypes.length > 0
    ) {
      let _data: Array<ITypeMaterials & { amount?: number }> | undefined = []
      setOpen(MESSAGES.transaction_processing_order) // ? changed text
      await getAllMaterialByAddrs(profile.data.address)
        .then((response) => {
          const data = materialTypes
            .sort((_a, _b) =>
              _a.material_id_smartcontract < _b.material_id_smartcontract
                ? -1
                : 1
            )
            .map((m) => ({
              ...m,
              amount: Number(response[m.material_id_smartcontract])
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

  const sendTransferMaterial = async (
    _arr: Array<ITypeMaterials & { amount?: number }>,
    _to: string,
    _materialId: string,
    _materialAmount: number = 1
  ) => {
    let _status: boolean = false
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
            _arr,
            "decrease",
            _resultEvent[2].toString(),
            Number(_resultEvent[3].toString())
          )
        }
        _status = true
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => setClose(), 1000)
      })
    return _status
  }

  return {
    getMaterialByToken,
    updateMaterialList,
    onFetchInvenMaterial,
    sendTransferMaterial,
    getAllMaterialByAddrs
  }
}

export default useInvenMaterial
