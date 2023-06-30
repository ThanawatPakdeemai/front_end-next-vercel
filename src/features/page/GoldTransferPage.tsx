import ButtonGold from "@components/atoms/gold/ButtonGold"
import GoldAllIcon from "@components/icons/GoldAllIcon"
import GoldIcon from "@components/icons/GoldIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import CONFIGS from "@configs/index"
import { useGetCurrentExp } from "@feature/gold/containers/hook/useGetCurrentExp"

import useTransferExpToGold from "@feature/gold/containers/hook/useTransferExpToGold"
import useGetTransactionExpToGold from "@feature/gold/containers/hook/useGetTransactionExpToGold"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import { useToast } from "@feature/toast/containers"
import { ArrowForward } from "@mui/icons-material"
import {
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TextField
} from "@mui/material"
import TableContainer from "@mui/material/TableContainer"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { isNaN } from "lodash"
import { useEffect, useState } from "react"
import { PaginationNaka } from "@components/atoms/pagination"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import dayjs from "dayjs"

const GoldTransferPage = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const [exp, setExp] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  const { errorToast } = useToast()
  const { mutateTransferExpToGold, isLoading } = useTransferExpToGold()
  const { data: _currentexp, refetch: _refetchexp } = useGetCurrentExp()
  const [limit] = useState<number>(10)
  const [skip, setSkip] = useState<number>(1)
  const [sort] = useState({ createdAt: -1 })
  const [search] = useState({})
  const [totalCount, setTotalCount] = useState(10)

  const {
    data: dataTransaction,
    refetch: refetchTransaction,
    isLoading: loadingTransaction
  } = useGetTransactionExpToGold({
    _limit: limit,
    _skip: skip,
    _sort: sort,
    _search: search
  })

  const currentExp = _currentexp?.data?.total_exp || 0

  useEffect(() => {
    let load = false
    if (!load) {
      refetchTransaction().then((_res) => {
        setTotalCount(_res?.data?.info?.totalCount || 10)
      })
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTransaction, skip])

  useEffect(() => {
    let load = false
    if (!load) {
      if (currentExp < 1) {
        _refetchexp()
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExp])

  const transferExpGold = () => {
    if (exp > 0) {
      mutateTransferExpToGold(amount).then(async (res) => {
        if (res) {
          await _refetchexp()
          await refetchTransaction()
        }
      })
    } else {
      errorToast("exp not found")
    }
  }

  useEffect(() => {
    let load = false
    if (!load) {
      if (exp && CONFIGS.EXP_TO_GOLD) {
        setAmount(exp / Number(CONFIGS.EXP_TO_GOLD))
      }
    }
    return () => {
      load = true
    }
  }, [exp])

  return (
    <>
      <div className=" relative">
        <div className="  flex h-[100px] w-full max-w-[907px] items-center justify-center bg-[url('/images/LED-BG.svg')] bg-cover uppercase">
          <p className="text-shadow-text-red font-digital-7 text-[26px] text-error-main">
            GET NaKA GOLD
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-start gap-8">
        <div className=" w-full max-w-[552px] rounded-[24px] border border-neutral-780 bg-primary-main p-[16px]">
          <div className="rounded-[8px] bg-neutral-800 px-[22px] py-[15px]">
            <p className=" text-default text-neutral-300">
              EXP TO GOLD TRANSFER
            </p>
          </div>
          <div className=" flex items-center gap-3 py-4">
            <div>
              <p className=" mb-2 text-xs uppercase text-neutral-500">EXP</p>
              <TextField
                id="exp"
                sx={{
                  m: 1,
                  width: "226px",
                  " .MuiOutlinedInput-root": {
                    height: "49px !important",
                    padding: "0 10px"
                  }
                }}
                value={exp}
                onChange={(event) => {
                  const num = Number(event.target.value)
                  if (num && !isNaN(num) && typeof num === "number") {
                    if (profile) {
                      if (num <= currentExp) {
                        setExp(num)
                      } else {
                        setExp(currentExp)
                      }
                    }
                  } else {
                    setExp(0)
                  }
                }}
                placeholder="Enter amount"
                className="m-0"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className="cursor-pointer text-xs text-neutral-300"
                      onClick={() => setExp(Number(currentExp))}
                    >
                      All
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div className="mt-auto flex h-[49px] w-[60px] items-center justify-center rounded-[8px] border border-neutral-700 bg-neutral-800">
              <ArrowForward />
            </div>
            <div>
              <p className="mb-2  text-xs uppercase text-neutral-500">
                Gold Amount
              </p>
              <TextField
                id="gold_amount"
                sx={{
                  m: 1,
                  width: "226px",
                  " .MuiOutlinedInput-root": {
                    height: "49px !important",
                    padding: "0 10px"
                  }
                }}
                disabled
                value={amount}
                className="m-0"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className="text-xs text-neutral-300"
                    >
                      <GoldIcon />
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </div>
          <p className=" text-xs uppercase text-neutral-500">
            My EXP :
            <span className="mx-1 text-neutral-300">
              {Helper.formatNumber(currentExp || 0)}
            </span>
            Exp
          </p>
          <ButtonToggleIcon
            handleClick={transferExpGold}
            startIcon={<></>}
            disabled={exp <= 0 || isLoading}
            text="transfer"
            className="btn-rainbow-theme mt-5 h-[50px] !w-full bg-secondary-main font-bold uppercase text-white-default"
            type="button"
          />
        </div>
        <div className=" w-full max-w-[230px] rounded-[24px] bg-neutral-780 p-[12px]">
          <div className=" flex flex-col gap-5 rounded-[16px] border border-neutral-800 bg-primary-main p-[15px]">
            <div className="flex items-center justify-center rounded-xl border border-neutral-710 px-[15px] py-[30px]">
              <GoldAllIcon />
            </div>
            <ButtonGold
              onClick={() => {}}
              text="My NAKA Gold"
              showIcon={false}
              className=" !rounded-xl uppercase"
            />
            <div className="flex h-[49px] items-center justify-between rounded-xl bg-neutral-800 px-2">
              <p>{Helper.formatNumber(profile?.gold as number)}</p>
              <GoldIcon className="m-auto" />
            </div>
          </div>
        </div>
      </div>
      <Divider className="mb-10 !block max-w-[552px] border-neutral-800" />
      {/* className=" border-neutral-800/75" */}
      <PageHeader
        title="Transactions"
        subtitle=""
      />
      <TableContainer className="mb-5 max-w-[552px] rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5">
        <Table>
          <TableHeader
            thead={[
              { title: "time" },
              { title: "type" },
              { title: "gold" },
              { title: "exp" }
            ]}
            gridTemplateColumns="118px 125px 125px 1fr"

            // gridTemplateColumns="180px 130px 200px 1fr"
          />
          <TableBody
            sx={{
              display: "block",
              borderRadius: "9px",
              overflow: "hidden",
              "tr:last-of-type td": { borderBottom: 0 }
            }}
          >
            {dataTransaction && !loadingTransaction ? (
              dataTransaction?.data?.map((_data) => (
                <TableRowData
                  key={_data.id}
                  gridTemplateColumns="118px 125px 125px 1fr"
                  child={[
                    <>
                      <div className="rounded border border-neutral-700 px-2 py-1 text-neutral-500">
                        {dayjs(_data.createdAt).format("DD MMM YYYY")}
                      </div>
                    </>,
                    <>
                      <div className="bg-transfer-gold  rounded px-2 py-1  text-primary-main">
                        {_data.type}
                      </div>
                    </>,
                    <>
                      <div className=" text-[#FFCA63]">
                        {_data?.meta_data?.gold_amount}
                      </div>
                    </>,
                    <>- {_data?.meta_data?.exp_use}</>
                  ]}
                />
              ))
            ) : (
              <>
                <TableNodata />
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationNaka
        totalCount={totalCount}
        limit={limit}
        page={skip}
        setPage={setSkip}
      />
    </>
  )
}
export default GoldTransferPage
