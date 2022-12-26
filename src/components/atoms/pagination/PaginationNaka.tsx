import { Pagination, PaginationItem, Stack } from "@mui/material"
import React, { memo } from "react"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

interface IProp {
  totalPage: number
  defaultPage?: number
  // eslint-disable-next-line no-unused-vars
  setPage: (value: number) => void
}
const PaginationNaka = ({ totalPage, defaultPage, setPage }: IProp) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault()
    setPage(value)
  }

  return (
    <>
      <Stack spacing={2}>
        <Pagination
          count={totalPage}
          hideNextButton
          hidePrevButton
          defaultPage={defaultPage ?? 1}
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
