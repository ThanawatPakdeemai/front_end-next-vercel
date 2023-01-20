import { useMemo } from "react"
import { useWeb3 } from "@hooks/useWeb3"
import { getErc20Contract } from "@utils/contractHelpers"
import BalanceVault from "@configs/abi/BalanceVault.json"
import Shop from "@configs/abi/Shop.json"
import erc20Abi from "@configs/abi/ERC20.json"
import { ethers } from "ethers"
// eslint-disable-next-line import/no-extraneous-dependencies
import { AbiItem } from "web3-utils"
import Web3 from "web3"
import {
  getBalanceOf,
  getNaka
} from "@src/features/inventory/containers/services/inventory.service"
import { baseContractAddress, baseUrl } from "@constants/sites"
import { ITransectionResponse } from "@src/types/transaction"
import axios from "axios"
import { IUseitem } from "@src/types/contract"
import { BigNumber } from "@src/types/staking"

const useContractAction = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const web3: any | Web3 = useWeb3()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ethereum }: any = window

  let provider
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let signer: any
  if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum)
    signer = provider.getSigner()
  }

  // ERC20 Contract
  const Erc20Dai = new web3.eth.Contract(
    erc20Abi as AbiItem[],
    baseContractAddress.erc20
  )

  // BalanceVault Contract
  const BalanceVaultDai = new web3.eth.Contract(
    BalanceVault.abi as AbiItem[],
    baseContractAddress.vault
  )

  // ItemVault Contract
  // const ItemVaultDai = new web3.eth.Contract(
  //   ItemVault.abi as AbiItem[],
  //   process.env.REACT_APP_CONTRACT_ITEM_VAULT
  // )

  // Shop Contract
  const ShopDai = new web3.eth.Contract(
    Shop.abi as AbiItem[],
    baseContractAddress.shop
  )

  const ownerAddress = `${baseContractAddress.owner}`
  // Set TOKEN ADDRESS -------------------------------------------------------------------- TOKEN ADDRESS
  const useERC20 = (address: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const web3: any | Web3 = useWeb3()
    return useMemo(() => getErc20Contract(address, web3), [address, web3])
  }

  // Check NAKA that you already approved or not (180 m) ---------------------------
  const checkAllowNaka = async (address: string) =>
    new Promise((resolve, reject) => {
      Erc20Dai.methods
        .allowance(address, baseContractAddress.vault)
        .call({
          from: address
        })
        .then((response: string) => {
          resolve(response)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })

  // Appove to use NAKA in your wallet ---------------------------------------------
  const allowNaka = async (address: string) => {
    const amount = 180000000
    const amountToWei = Web3.utils.toWei(amount.toString(), "ether")
    await Erc20Dai.methods
      .approve(baseContractAddress.vault, Web3.utils.toHex(amountToWei))
      .send({
        from: address
      })
  }

  // Deposit naka in balance vault -------------------------------------------------- BALANCEVAULT
  const depositNaka = async (address: string, nakaAmount: string) =>
    new Promise<ITransectionResponse>((resolve, reject) => {
      BalanceVaultDai.methods
        .depositNaka(nakaAmount)
        .send({
          from: address
        })
        .then((response: ITransectionResponse) => {
          resolve(response)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })

  // Get balance of naka in Balance Vault -------------------------------------------
  // fromWei funtion is require type as string | BN
  const getNakaBalanceVault = (address: string) =>
    new Promise<string>((resolve, reject) => {
      getNaka(address)
        .then((res: any) => {
          if (res.status) {
            resolve(res.data)
          }
        })
        .catch((error: Error) => {
          reject(error)
        })
    })

  // Withdraw naka in balance vault ------------------------------------------------
  const withdrawNaka = async (address: string, nakaAmount: string) =>
    new Promise<ITransectionResponse>((resolve, reject) => {
      BalanceVaultDai.methods
        .withdrawNaka(nakaAmount)
        .send({
          from: address
        })
        .then((response: ITransectionResponse) => {
          resolve(response)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })

  // Buy items ----------------------------------------------------------------- SHOP
  const AddBullets = async (
    item: number,
    number: number,
    nakaAmount: string,
    address: string
  ) =>
    new Promise((resolve, reject) => {
      ShopDai.methods
        .buyItems(address, item, number, nakaAmount)
        .send({
          from: address
        })
        .then((response: ITransectionResponse) => {
          resolve(response)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })

  // Get item game from Smart Contract --------------------------------------------  ITEMVAULT
  const getItemAmount = async (_address: string, _item_id: number) => {
    // To Do : Hide for now because it has got errors
    const response = await getBalanceOf({ _address, _item_id })

    if (response.status) {
      const qty = response.data
      const nakaHolder = response.data
      return {
        qty,
        nakaHolder
      }
    }
    const qty = 0
    const nakaHolder = 0
    return {
      qty,
      nakaHolder
    }
  }

  // Check Approval ---------------------------------------------------------------
  // Returns true if the operator is approved to make ENS registry operations on behalf of the owner.
  const IsApproved = (address: string) =>
    new Promise((resolve, reject) => {
      ShopDai.methods
        .isApprovedForAll(address, ownerAddress)
        .call({ from: address })
        .then((response: boolean) => {
          resolve(response)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })

  const useItem = ({ player_id, item_id, room_id, qty }: IUseitem) =>
    // burn item on backend before play game
    axios
      .put(`${baseUrl.api}/inventory/burn-smart-contact-multiplayer`, {
        player_id,
        item_id,
        room_id,
        qty
      })
      .then((res) => ({
        status: true,
        data: res.data,
        message: "",
        error: null
      }))
      .catch((error) => ({
        status: false,
        data: null,
        message: "",
        error: true
      }))

  const getNakaBalanceOf = async (_userAddress: string) => {
    const contract = new ethers.Contract(
      baseContractAddress.vault ? baseContractAddress.vault : "",
      BalanceVault.abi,
      signer
    )
    try {
      const data: BigNumber = await contract.getBalance(_userAddress)
      return {
        status: true,
        data
      }
    } catch (error) {
      return { status: false, data: 0 }
    }
    // return new Promise((resolve, reject) => {
    //   Erc20Dai.methods
    //     .balanceOf(address)
    //     .call({
    //       from: address
    //     })
    //     .then((response: string) => {
    //       resolve(response);
    //     })
    //     .catch((error: Error) => {
    //       reject(error);
    //     });
    // });
  }

  return {
    getItemAmount,
    useERC20,
    AddBullets,
    IsApproved,
    allowNaka,
    checkAllowNaka,
    depositNaka,
    getNakaBalanceVault,
    withdrawNaka,
    useItem,
    getNakaBalanceOf
  }
}
export default useContractAction
