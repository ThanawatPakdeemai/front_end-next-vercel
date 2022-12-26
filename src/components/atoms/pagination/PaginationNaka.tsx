import { Pagination, PaginationItem, Stack } from "@mui/material"
import React, { memo } from "react"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

interface IProp {
  totalPage: number
  defaultPage: number
}
const PaginationNaka = ({ totalPage, defaultPage }: IProp) => {
  const [page, setPage] = React.useState(defaultPage)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return (
    <>
      <Stack spacing={2}>
        <Pagination
          count={totalPage ?? 10}
          hideNextButton
          hidePrevButton
          defaultPage={page}
          variant="outlined"
          shape="rounded"
          size="large"
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: KeyboardArrowRightIcon,
                next: KeyboardArrowLeftIcon
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  )
}
export default memo(PaginationNaka)
