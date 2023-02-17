import IBusd from "@components/icons/Busd"
import INaka from "@components/icons/Naka"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { InputAdornment, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import AmountBalance from "@components/molecules/balance/AmountBalance"
import Helper from "@utils/helper"
import useGetBalanceVault from "@feature/inventory/containers/hooks/useGetBalanceVault"
import { useWeb3Provider } from "@providers/Web3Provider"
import HrLine from "@components/icons/HrLine"

interface IProp {
  type?: string
}
const FormCreate = ({ type = "buy" }: IProp) => {
  const [nakaBalanceVault, SetNakaBalanceVault] = useState<string>("N/A")
  const { address } = useWeb3Provider()
  const { WeiToNumber, formatNumber } = Helper
  const { balanceVaultNaka } = useGetBalanceVault(address ?? "", !!address)
  useEffect(() => {
    if (balanceVaultNaka && address) {
      const tempData = WeiToNumber(balanceVaultNaka.data)
      SetNakaBalanceVault(formatNumber(tempData, { maximumFractionDigits: 1 }))
    } else {
      SetNakaBalanceVault("N/A")
    }
  }, [WeiToNumber, address, balanceVaultNaka, formatNumber])
  return (
    <>
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
              id="price"
              variant="outlined"
              className="my-2 w-full"
              placeholder="Enter price"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IBusd width={21} />
                  </InputAdornment>
                )
              }}
            />
            <Typography className="font-neue-machina text-sm uppercase text-neutral-600">
              reference price
              <span className="ml-2 text-neutral-300">340.45 busd</span>
            </Typography>
            <div className="flex justify-center">
              <div className="my-10 flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-neutral-700">
                <ArrowDownwardIcon />
              </div>
            </div>
            <Typography className="font-neue-machina text-sm uppercase text-neutral-500">
              You will recieve
            </Typography>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "0 10px"
                }
              }}
              id="price"
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
              you will pay
              <span className="ml-2 text-neutral-300">340.45 busd</span>
            </Typography>
            <ButtonToggleIcon
              startIcon=""
              endIcon=""
              text={`Create ${type} NAKA`}
              handleClick={() => {}}
              className="leading-2 mt-10 mb-5 flex h-[50px] w-full items-center  justify-center rounded-md bg-varidian-default !fill-primary-main font-neue-machina text-sm font-bold capitalize !text-primary-main"
              type="submit"
            />
            <Typography className="my-2 text-center font-neue-machina text-sm uppercase text-neutral-500">
              fee 0.5 busd
            </Typography>
          </div>
        </div>
      </div>
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
                dataBalance={[{ icon: <INaka />, balance: nakaBalanceVault }]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default FormCreate
