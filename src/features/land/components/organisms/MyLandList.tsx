import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import {
  Chip,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { IconVerify } from "@components/icons/Icons"
import CopyButton from "@components/atoms/CopyButton"
import { useGetMyLand } from "@feature/land/containers/hooks/useGetMyLand"
import { IMarketLandData } from "@feature/land/interfaces/ILandService"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import DropdownLimit from "@components/atoms/DropdownLimit"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import useMyLandController from "@feature/land/containers/hooks/useMyLandController"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import SkeletonTableWallet from "@components/atoms/skeleton/SkeletonTableWallet"
import { v4 as uuid } from "uuid"

const MyLandList = () => {
  const { profile } = useProfileStore()
  const [totalCount, setTotalCount] = useState<number>(0)
  const [limit, setLimit] = useState<number>(6)
  const [page, setPage] = useState<number>(1)
  const [txHistory, setTxHistory] = useState<IMarketLandData[]>([])

  const { mutateGetMyLand, isLoading } = useGetMyLand()
  const { hydrated, pager } = useGlobal()
  const { sortLandId, sortBlockPoint, landListHeader } = useMyLandController()

  useEffect(() => {
    let load = false

    if (!load) {
      const fetchHistory = async () => {
        if (profile.data) {
          await mutateGetMyLand({
            _limit: limit,
            _page: page,
            _search: {
              player_id: profile.data && profile.data.id ? profile.data.id : "",
              isRent: false,
              type: "nft_land"
            },
            _sort:
              sortLandId || sortBlockPoint
                ? {
                    land_id: sortLandId,
                    position: sortBlockPoint,
                    created_at: -1
                  }
                : { created_at: -1 },
            _landList: []
          }).then((res) => {
            // res.status === 200 -> ok
            if (res.data) {
              setTxHistory(res.data)
            }
            if (res.info) {
              setTotalCount(res.info.totalCount)
            }
          })
        }
      }
      fetchHistory()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, sortLandId, sortBlockPoint])

  return (
    <>
      {hydrated && (
        <TableContainer className="w-[457px] rounded-[14px] bg-neutral-800 p-1.5">
          <Table>
            <TableHead>
              <TableRowData
                className="!rounded-[9px] border border-neutral-700"
                borderBottom={false}
                child={[
                  <>
                    <p className="text-sm">MY LAND</p>
                  </>
                ]}
                gridTemplateColumns="1fr"
              />
            </TableHead>
            <TableHeader
              thead={landListHeader}
              gridTemplateColumns="180px 1fr 1fr"
            />
            {isLoading ? (
              [...Array(limit)].map(() => <SkeletonTableWallet key={uuid()} />)
            ) : (
              <TableBody
                sx={{
                  "tr:last-of-type": { marginBottom: 0 }
                }}
              >
                {txHistory && txHistory.length > 0 ? (
                  txHistory.map((item) => (
                    <TableRowData
                      key={item.land_id}
                      className="mb-1.5 !rounded-[9px]"
                      borderBottom={false}
                      child={[
                        <div
                          key={item.land_id}
                          className="flex items-center gap-1.5"
                        >
                          <IconVerify color="#27F1EC" />
                          <Chip
                            label={item.land_id}
                            size="small"
                            color="default"
                            variant="outlined"
                            className="!h-5"
                          />
                          <CopyButton
                            text={item.land_id}
                            className="!ml-0 !border-neutral-800 !bg-neutral-780"
                          />
                        </div>,
                        <div
                          key={item.land_id}
                          className="flex items-center gap-1.5"
                        >
                          <Chip
                            label={`X${item.position.x}, Y${item.position.y}`}
                            size="small"
                            color="secondary"
                            className="!h-5"
                          />
                          <CopyButton
                            text={`X${item.position.x}, Y${item.position.y}`}
                            className="!ml-0 !border-neutral-800 !bg-neutral-780"
                          />
                        </div>,
                        <div
                          key={item.land_id}
                          className="flex w-full justify-end"
                        >
                          <Chip
                            label="View"
                            size="small"
                            color="default"
                            variant="outlined"
                            className="!h-[30px] w-[67px] !rounded-default"
                            onClick={() => {}}
                          />
                        </div>
                      ]}
                      gridTemplateColumns="180px 1fr 1fr"
                    />
                  ))
                ) : (
                  <TableNodata className="rounded-[9px]" />
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
      {txHistory && txHistory.length > 0 && (
        <div className="justify-between md:my-5 md:flex xl:w-[457px]">
          <PaginationNaka
            totalCount={totalCount}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <DropdownLimit
            defaultValue={6}
            list={pager}
            onChangeSelect={setLimit}
          />
        </div>
      )}
    </>
  )
}

export default MyLandList
