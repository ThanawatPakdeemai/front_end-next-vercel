import {
  ICreateTransWallet,
  IGetTransWallet,
  ITransData,
  ITransWalletService
} from "@feature/transaction/interfaces/ITransaction"
import services from "@src/configs/axiosGlobalConfig"

export const createTransWallet = ({
  _playerId,
  _dateTime,
  _amount,
  _fee,
  _type,
  _txHash
}: ICreateTransWallet) =>
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

export const getTransWallet = ({
  _playerId,
  _type, // null<˜all>, DepositNaka, WithdrawNaka //! case-sensitive
  _limit,
  _page
}: IGetTransWallet) =>
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
