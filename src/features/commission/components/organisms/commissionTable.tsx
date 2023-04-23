import React from "react"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import { Box, Chip, Table, TableBody, TableContainer } from "@mui/material"
import dayjs from "dayjs"
import IconArrowTop from "@components/icons/arrowTopIcon"
import { PaginationNaka } from "@components/atoms/pagination"
import { v4 as uuid } from "uuid"
import SkeletonTableWallet from "@components/atoms/skeleton/SkeletonTableWallet"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import { useTranslation } from "react-i18next"
import useCommissionController from "@feature/commission/containers/hooks/useCommissionController"

const CommissionTable = () => {
  const {
    commissionTableHeader,
    totalCount,
    limit,
    page,
    setPage,
    isLoadingCommissionHistory,
    commissionHistoryState
  } = useCommissionController()
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-[678px]">
      <PageHeader
        title={t("Commission")}
        subtitle={t("commission_share_to_earn")}
      />
      <TableContainer className="rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5">
        <Table>
          <TableHeader
            thead={commissionTableHeader}
            gridTemplateColumns="180px 130px 200px 1fr"
          />
          {isLoadingCommissionHistory ? (
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
              {commissionHistoryState && commissionHistoryState.length > 0 ? (
                commissionHistoryState.map((item) => (
                  <TableRowData
                    key={item.id}
                    gridTemplateColumns="180px 130px 200px 1fr"
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
                            item.type &&
                            item.type === "commission_share_to_earn"
                              ? "!bg-varidian-default !text-neutral-900"
                              : "!bg-neutral-900 !text-neutral-400"
                          }`}
                        />
                      </div>,
                      <div
                        key={item.id}
                        className="flex items-center gap-2 uppercase"
                      >
                        {item.type.split("_").join(" ")}
                      </div>,
                      <div key={item.id}>
                        <div
                          className={`flex items-center font-neue-machina-bold text-sm ${
                            item.type &&
                            item.type === "commission_share_to_earn"
                              ? "text-varidian-default"
                              : "text-neutral-600"
                          }`}
                        >
                          <IconArrowTop className="rotate-180" />
                          {item.naka_for_player.toFixed(4)}
                        </div>
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
      <Box
        component="div"
        className="my-2 flex w-full justify-between md:my-5"
        sx={{
          ".MuiPagination-ul": {
            gap: "5px 0"
          }
        }}
      >
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        {/* <DropdownLimit
          className="m-0 w-[160px] flex-row"
          defaultValue={30}
          list={pager}
          onChangeSelect={setLimit}
        /> */}
      </Box>
    </div>
  )
}

export default CommissionTable
