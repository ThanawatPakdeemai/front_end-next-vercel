import services from "@src/configs/axiosGlobalConfig"
import { ITransData, ITransWalletService } from "../interfaces/ITransaction"

export const createTransWallet = (
  _playerId: string,
  _dateTime: string,
  _amount: number,
  _fee: number,
  _type: string,
  _txHash: string
) =>
  new Promise<ITransData>((resolve, reject) => {
    const data = {
      player_id: _playerId,
      date_time: _dateTime,
      amount: _amount,
      fee: _fee,
      type: _type,
      transaction_hash: _txHash
    }
    services
      .post<ITransData>(`/inventory/transaction`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getTransWallet = (
  _playerId: string,
  _type: string, // null<˜all>, DepositNaka, WithdrawNaka //! case-sensitive
  _limit: number,
  _page: number
) =>
  new Promise<ITransWalletService>((resolve, reject) => {
    const data = {
      player_id: _playerId,
      type: _type,
      limit: _limit,
      skip: _page
    }
    services
      .post<ITransWalletService>(`/inventory/transaction/history`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
