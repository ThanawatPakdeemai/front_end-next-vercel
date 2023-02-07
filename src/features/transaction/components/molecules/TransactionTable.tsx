import React, { useEffect, useMemo, useRef, useState, ReactNode } from "react"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import dayjs from "dayjs"
import { Chip, TableBody, Table, TableContainer } from "@mui/material"
import FilterIcon from "@components/icons/FilterIcon"
import IconArrowTop from "@components/icons/arrowTopIcon"
import { v4 as uuid } from "uuid"
import { ITransactionWalletData } from "@feature/transaction/interfaces/ITransaction"
import DropdownLimit from "@feature/transaction/components/atoms/DropdownLimit"
import TableHeader from "@feature/transaction/components/atoms/TableHeader"
import TablePopover from "@feature/transaction/components/atoms/TablePopover"
import TableRowData from "@feature/transaction/components/atoms/TableRowData"

export interface ITableHeader {
  title: string
  keyUp?: boolean
  keyDown?: boolean
  onClick?: () => void
  arrowIcon?: boolean // >?< optional จะใส่หรือไม่ใส่ก็ได้ ถ้าไม่ใส่ undefinded
  filterIcon?: boolean
  filterList?: Array<string>
  curFilter?: Array<string>
  onFilter?: (_value: string, _checked: boolean) => void
  child?: ReactNode
}

export default function TransactionTable() {
  const playerId = "61a72d7e970fbe264d627bf5"
  const [limit, setLimit] = useState<number>(12)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)

  const [sortTime, setSortTime] = useState<number | undefined>(undefined) // 1 || -1
  const [sortAmount, setSortAmount] = useState<number | undefined>(undefined)
  const allTypes = ["DepositNaka", "WithdrawNaka"]
  const [typeCheck, setTypeCheck] = useState<Array<string>>(allTypes)
  const [txHistory, setTxHistory] = useState<ITransactionWalletData[]>([])

  const { getTransHistory } = useGetTransWallet()

  useEffect(() => {
    const fetchHistory = async () => {
      await getTransHistory({
        _playerId: playerId,
        _type: typeCheck,
        _limit: limit,
        _page: page,
        _sort:
          sortTime || sortAmount
            ? { "current_time": sortTime, "amount": sortAmount }
            : undefined // sort: {}
      }).then((res) => {
        // res.status === 200 -> ok
        if (res.data) {
          setTxHistory(res.data)
        }
        if (res.info) {
          setTotalCount(res.info.totalCount)
        }
      })
      // .catch((err) => console.log(err))
    }
    if (fetchRef.current) {
      fetchHistory()
    }
    fetchRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, sortTime, typeCheck, sortAmount])

  const onTypeCheck = (_value: string, _checked: boolean) => {
    setTypeCheck((prev: Array<string>) => {
      let data = prev
      const findType = prev.find((v) => v === _value)
      if (findType) {
        data = data.filter((v) => v !== _value)
        if (_checked) {
          data = [...data, _value]
        }
      } else if (_checked) {
        data = [...data, _value]
      }
      return [...data]
    })
  }
  // const เราไม่สามารถอัพเดตมันได้
  const tHeader: Array<ITableHeader> = useMemo(
    () => [
      {
        title: "time",
        arrowIcon: true,
        keyUp: sortTime === 1,
        keyDown: sortTime === -1,
        onClick: () =>
          setSortTime((prev: number | undefined) => {
            if (prev) {
              return prev * -1
            }
            return -1
          })
      },
      {
        title: "type",
        filterIcon: true,
        child: (
          <TablePopover
            icon={<FilterIcon />}
            checkboxList={["DepositNaka", "WithdrawNaka"]}
            check={typeCheck}
            setCheck={onTypeCheck}
          />
        )
      },
      {
        title: "amount",
        arrowIcon: true,
        keyUp: sortAmount === 1,
        keyDown: sortAmount === -1,
        onClick: () =>
          setSortAmount((prev: number | undefined) => {
            if (prev) {
              return prev * -1
            }
            return -1
          })
      },
      { title: "fee" }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortTime, sortAmount]
  )

  return (
    <div>
      <p className="my-5 font-neue-machina-bold text-default uppercase">
        Naka Storage Transactions
      </p>
      <TableContainer className="w-[580px] rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5 pt-4">
        <Table aria-label="simple table">
          <TableHeader thead={tHeader} />
          <TableBody
            sx={{
              display: "block",
              borderRadius: "9px",
              overflow: "hidden",
              "tr:last-of-type td": { borderBottom: 0 }
            }}
          >
            {txHistory &&
              txHistory.map((item) => (
                <TableRowData
                  key={uuid()}
                  child={[
                    <>
                      <span className="rounded-less border p-[5px]">
                        {dayjs(item.current_time).format("DD MMM YYYY")}
                      </span>
                      <span className="px-3">
                        {dayjs(item.current_time).format("hh:mm A")}
                      </span>
                    </>,
                    <>
                      <Chip
                        label={item.type}
                        size="small"
                        className={`font-neue-machina-bold uppercase !text-neutral-900 ${
                          item.type && item.type === "DepositNaka"
                            ? "!bg-varidian-default"
                            : "!bg-red-card"
                        }`}
                      />
                    </>,
                    <>
                      <div
                        className={`flex items-center font-neue-machina-bold text-sm ${
                          item.type && item.type === "DepositNaka"
                            ? "text-varidian-default"
                            : "text-red-card"
                        }`}
                      >
                        <div className="flex flex-row">
                          <div className="pr-[8.35px]">
                            {item.type && item.type === "DepositNaka" ? (
                              <IconArrowTop className="rotate-180" />
                            ) : (
                              <IconArrowTop />
                            )}
                          </div>
                          {item.amount.toFixed(2)}
                        </div>
                      </div>
                    </>,
                    <>
                      <span> - {item.fee.toFixed(4)}</span>
                    </>
                  ]}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="my-5 flex w-[580px] justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <DropdownLimit
          defaultValue={12}
          list={[6, 12, 24, 48, 64]}
          onChangeSelect={setLimit}
        />
      </div>
    </div>
  )
}
