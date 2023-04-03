import FilterIcon from "@components/icons/FilterIcon"
import TablePopover from "@feature/table/components/atoms/TablePopover"
import { ITableHeader } from "@feature/table/interface/ITable"
import { useMemo, useState } from "react"
import { Trans } from "react-i18next"

const useTransactionController = () => {
  const [sortTime, setSortTime] = useState<number | undefined>(undefined) // 1 || -1
  const [sortAmount, setSortAmount] = useState<number | undefined>(undefined)
  const allTypes = ["DepositNaka", "WithdrawNaka"]
  const [typeCheck, setTypeCheck] = useState<Array<string>>(allTypes)

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
  const TransactionTableHeader: Array<ITableHeader> = useMemo(
    () => [
      {
        title: <Trans i18nKey="time">time</Trans>,
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
        title: <Trans i18nKey="type">type</Trans>,
        filterIcon: true,
        child: (
          <TablePopover
            icon={<FilterIcon className="text-neutral-600" />}
            checkboxList={["DepositNaka", "WithdrawNaka"]}
            check={typeCheck}
            setCheck={onTypeCheck}
          />
        )
      },
      {
        title: <Trans i18nKey="amount">amount</Trans>,
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
      {
        title: <Trans i18nKey="fee">fee</Trans>,
        className: "flex justify-end w-full"
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortTime, sortAmount]
  )
  const AllTransactionTableHeader: Array<ITableHeader> = useMemo(
    () => [
      {
        title: <Trans i18nKey="time">time</Trans>,
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
        title: <Trans i18nKey="event">event</Trans>
      },
      {
        title: <Trans i18nKey="amount">amount</Trans>,
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
      {
        title: <Trans i18nKey="fee">fee</Trans>
      },
      {
        title: <Trans i18nKey="view">view</Trans>,
        className: "flex justify-end w-full"
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortTime, sortAmount]
  )
  return {
    sortTime,
    sortAmount,
    typeCheck,
    TransactionTableHeader,
    AllTransactionTableHeader
  }
}

export default useTransactionController
