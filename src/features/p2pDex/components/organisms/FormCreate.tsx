import IBusd from "@components/icons/Busd"
import INaka from "@components/icons/Naka"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { Alert, InputAdornment, TextField, Typography } from "@mui/material"
import React, { useEffect, useMemo, useState } from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import AmountBalance from "@components/molecules/balance/AmountBalance"

import HrLine from "@components/icons/HrLine"
import useAllBalances from "@hooks/useAllBalances"
import { useForm } from "react-hook-form"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
import { IResponseGetFee } from "@feature/contract/interfaces/IMultichainHook"
import { formatEther } from "ethers/lib/utils"
import { useWeb3Provider } from "@providers/Web3Provider"
import useP2PDexCreateOrder from "@feature/p2pDex/containers/hooks/useP2PDexCreateOrder"
import Helper from "@utils/helper"
import useProfileStore from "@stores/profileStore"
import useLoadingStore from "@stores/loading"
import { MESSAGES } from "@constants/messages"

interface IProp {
  type?: string
}
const FormCreate = ({ type = "buy" }: IProp) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { signer, address } = useWeb3Provider()
  const { busdVaultBalance, nakaVaultBalance } = useAllBalances()
  const { setClose, setOpen } = useLoadingStore()
  const balance = type === "buy" ? busdVaultBalance.text : nakaVaultBalance.text
  const {
    getFee,
    createOrderBuyNaka,
    createOrderSellNaka,
    // p2pBinanceContract,
    p2pPolygonContract,
    nakaCurrentPrice
  } = useContractMultichain()
  const { mutateCreateOrder } = useP2PDexCreateOrder()
  const [fee, setFee] = useState(0)

  useEffect(() => {
    getFee().then((_res) => {
      const res = _res as IResponseGetFee
      setFee(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer])

  const {
    register,
    handleSubmit,
    watch
    // formState: { errors }
  } = useForm({
    defaultValues: { price: "", amount: "" }
  })

  const onSubmit = (_data) => {
    if (type === "buy") {
      createOrderBuyNaka(_data.price, _data.amount)
    } else {
      setOpen("Processing Transaction")

      createOrderSellNaka(_data.price, _data.amount)
        .then((_receipt) => {
          // console.log("_receipt>>___", _receipt)

          const receipt = (_receipt as IResponseGetFee).data
          if (
            _receipt &&
            (_receipt as IResponseGetFee).status &&
            receipt.logs
          ) {
            const events = receipt.logs
              .filter((log) => log.address === p2pPolygonContract.address)
              .map((log) => p2pPolygonContract.interface.parseLog(log))
            if (events) {
              const _orderId = events[0].args.orderSellId
              const _busdPrice = "0" // Only binance
              const _nakaPrice = events[0].args.nakaPrice.toString()
              const _nakaAmount = events[0].args.amount.toString()
              const _totalPrice = "0" // Only polygon
              const _address = events[0].args.seller
              const _type = events[0].args.orderSellId ? "sell" : "buy"
              mutateCreateOrder({
                _orderId,
                _type,
                _busdPrice,
                _nakaPrice,
                _nakaAmount,
                _totalPrice,
                _address
              })
                .then((_res) => {
                  // console.log(_res)
                  setClose()
                })
                .catch((_err) => {
                  // console.log(_err)
                  setClose()
                })
            }
          } else {
            setClose()
          }
        })
        .catch(() => {
          // console.log("err......", err)
          setClose()
        })
    }
  }

  const disableButton = useMemo(() => {
    if (
      profile &&
      address &&
      balance &&
      balance !== "N/A" &&
      address?.toLowerCase() === profile.address.toLowerCase() &&
      Helper.removeComma(balance) >=
        Number(watch("price")) * Number(watch("amount")) &&
      Number(watch("amount")) > 0 &&
      Number(watch("price")) > 0
    ) {
      return false
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, balance, profile, watch("price"), watch("amount")])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 flex items-center justify-center">
          <div className=" flex w-[454px] items-center justify-center rounded-lg bg-neutral-780 p-10">
            <div>
              <Typography className=" font-neue-machina text-sm uppercase text-neutral-500">
                CREATE AN ORDER IN WHICH YOU WOULD LIKE TO BUY NAKA. PEOPLE WHO
                ARE INTERESTED IN YOUR PRICE WILL TAKE YOUR ORDER.
              </Typography>
              <HrLine className="my-5 " />
              <Typography className="font-neue-machina text-sm uppercase text-neutral-500">
                enter price naka/busd
              </Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "0 10px"
                  }
                }}
                {...register("price", { required: true })}
                name="price"
                id="price"
                variant="outlined"
                className="my-2 w-full"
                placeholder="Enter price"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {type === "buy" ? <IBusd /> : <INaka />}
                    </InputAdornment>
                  )
                }}
              />
              <Typography className="font-neue-machina text-sm uppercase text-neutral-600">
                reference price
                <span className="ml-2 uppercase text-neutral-300">
                  {nakaCurrentPrice !== undefined
                    ? Helper.formatNumber(Number(nakaCurrentPrice.last), {
                        maximumFractionDigits: 4
                      })
                    : 0}
                  {type === "buy" ? " busd" : " naka"}
                </span>
              </Typography>
              <div className="flex justify-center">
                <div className="my-10 flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-neutral-700">
                  <ArrowDownwardIcon />
                </div>
              </div>
              <Typography className="font-neue-machina text-sm uppercase text-neutral-500">
                You will {type === "sell" ? "pay" : "recieve"}
              </Typography>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "0 10px"
                  }
                }}
                {...register("amount", { required: true })}
                name="amount"
                id="amount"
                variant="outlined"
                className="my-2 w-full"
                placeholder="Enter The amount of NAKA"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <INaka />
                    </InputAdornment>
                  )
                }}
              />
              <Typography className="font-neue-machina text-sm uppercase text-neutral-600">
                you will {type === "buy" ? "pay" : "recieve"}
                <span className="ml-2 text-neutral-300">
                  {Helper.formatNumber(
                    Number(watch("price")) * Number(watch("amount")),
                    {
                      maximumFractionDigits: 4
                    }
                  )}{" "}
                  busd
                </span>
              </Typography>
              <ButtonToggleIcon
                startIcon=""
                endIcon=""
                disabled={disableButton}
                text={`Create ${type} NAKA`}
                handleClick={() => {}}
                className={`leading-2 mt-10 mb-5 flex h-[50px] w-full items-center  justify-center rounded-md ${
                  type === "buy" ? " bg-varidian-default " : " bg-error-main"
                } !fill-primary-main font-neue-machina text-sm font-bold capitalize !text-primary-main`}
                type="submit"
              />
              <Typography className="my-2 text-center font-neue-machina text-sm uppercase text-neutral-500">
                fee {formatEther(fee)} busd
              </Typography>
              {disableButton && (
                <Alert severity="error">
                  <Typography className="  text-center font-neue-machina text-sm text-error-main">
                    {!profile && `${MESSAGES.please_login}, `}
                    {address?.toLowerCase() !==
                      profile?.address.toLowerCase() &&
                      `${MESSAGES["please-connect-wallet"]}, `}
                    {(balance === "N/A" ||
                      Helper.removeComma(balance) <
                        Number(watch("price")) * Number(watch("amount"))) &&
                      `${MESSAGES.balance_not_enough}, `}
                    {(watch("amount") === "" ||
                      watch("price") === "" ||
                      Number(watch("amount")) < 1 ||
                      Number(watch("price")) < 1) &&
                      `${MESSAGES.please_fill}`}
                  </Typography>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </form>
      <div className="flex   justify-center">
        <div className="mt-10 flex w-[454px] items-center  justify-center rounded-lg bg-neutral-780 p-10">
          <div className="flex w-full items-center justify-center">
            <div className=" m-auto w-full flex-row  gap-y-3 rounded-[13px]  px-[5px] py-[5px]">
              <div className="my-5 flex items-center">
                <Typography className="mr-3 whitespace-nowrap font-neue-machina text-sm uppercase text-neutral-500">
                  your wallet balance
                </Typography>
                <HrLine className="" />
              </div>
              <AmountBalance
                dataBalance={[
                  {
                    icon: type === "sell" ? <INaka /> : <IBusd />,
                    balance:
                      type === "sell"
                        ? nakaVaultBalance.text
                        : busdVaultBalance.text
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default FormCreate
