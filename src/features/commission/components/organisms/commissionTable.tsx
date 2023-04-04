import React from "react"
import useCommissionController from "@feature/commission/containers/hooks/useComminssionController"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import { Chip, Table, TableBody, TableContainer } from "@mui/material"
import dayjs from "dayjs"
import IconArrowTop from "@components/icons/arrowTopIcon"
import { PaginationNaka } from "@components/atoms/pagination"
import DropdownLimit from "@components/atoms/DropdownLimit"
import { v4 as uuid } from "uuid"
import SkeletonTableWallet from "@components/atoms/skeleton/SkeletonTableWallet"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"

const CommissionTable = () => {
  const {
    commissionTableHeader,
    pager,
    totalCount,
    limit,
    setLimit,
    page,
    setPage,
    isLoading,
    txHistory
  } = useCommissionController()

  return (
    <div className="mx-auto max-w-[678px]">
      <PageHeader
        title="Commission"
        subtitle="Commission share to earn"
      />
      <TableContainer className="rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5">
        <Table>
          <TableHeader
            thead={commissionTableHeader}
            gridTemplateColumns="180px 130px 150px 1fr"
          />
          {isLoading ? (
            [...Array(limit)].map(() => <SkeletonTableWallet key={uuid()} />)
          ) : (
            <TableBody
              sx={{
                display: "block",
                borderRadius: "9px",
                overflow: "hidden",
                "tr:last-of-type td": { borderBottom: 0 }
              }}
            >
              {txHistory && txHistory.length > 0 ? (
                txHistory.map((item) => (
                  <TableRowData
                    key={item.id}
                    gridTemplateColumns="180px 130px 150px 1fr"
                    child={[
                      <div key={item.id}>
                        <span className="rounded-less border border-neutral-700 p-[5px] font-neue-machina-bold text-xs uppercase text-neutral-400">
                          {dayjs(item.current_time).format("DD MMM YYYY")}
                        </span>
                        <span className="px-3 font-neue-machina-bold text-xs text-neutral-600">
                          {dayjs(item.current_time).format("hh:mm A")}
                        </span>
                      </div>,
                      <div key={item.id}>
                        <Chip
                          label={item.transaction_status.split("_").join(" ")}
                          size="small"
                          variant="outlined"
                          className={`max-w-[120px] truncate font-neue-machina-bold uppercase ${
                            item.transaction_status &&
                            item.transaction_status === "complete"
                              ? "!bg-varidian-default !text-neutral-900"
                              : "!bg-neutral-900 !text-neutral-400"
                          }`}
                        />
                      </div>,
                      <div key={item.id}>
                        <div
                          className={`flex items-center font-neue-machina-bold text-sm ${
                            item.transaction_status &&
                            item.transaction_status === "complete"
                              ? "text-varidian-default"
                              : "text-neutral-600"
                          }`}
                        >
                          <IconArrowTop className="mr-[8.35px] rotate-180" />
                          {item.naka_for_player.toFixed(4)}
                        </div>
                      </div>,
                      <div
                        key={item.id}
                        className="uppercase"
                      >
                        {item.type.split("_").join(" ")}
                      </div>
                    ]}
                  />
                ))
              ) : (
                <TableNodata />
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {txHistory && txHistory.length > 0 && (
        <div className="my-5 flex justify-between">
          <PaginationNaka
            totalCount={totalCount}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <DropdownLimit
            defaultValue={12}
            list={pager}
            onChangeSelect={setLimit}
          />
        </div>
      )}
    </div>
  )
}

export default CommissionTable
