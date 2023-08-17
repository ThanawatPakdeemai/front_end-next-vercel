import { IconButton, Popover } from "@mui/material"
import React, { memo, ReactNode, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"

const CheckBoxNaka = dynamic(
  () => import("@components/atoms/checkBox/CheckBoxNaka")
)

interface IProps {
  icon: ReactNode
  checkboxList: Array<string>
  check: Array<string>
  setCheck: (_value: string, _checked: boolean) => void
}

interface IDummyList {
  value: string
  checked: boolean
}

const TablePopover = ({ icon, checkboxList, check, setCheck }: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const initialChecked = check.map((c) => {
    if (checkboxList.find((v) => v === c)) {
      return { value: c, checked: true }
    }
    return { value: c, checked: false }
  })
  const [dummyCheck, setDummyCheck] = useState<IDummyList[]>(initialChecked)
  const onHandleChanged = (_value: string, _check: boolean | undefined) => {
    const _checked = _check || false
    setDummyCheck((prev: IDummyList[]) => {
      let dummyList = prev
      const _dFindValue = prev.find((v) => v.value === _value)
      if (_dFindValue) {
        dummyList = dummyCheck.filter((v) => v.value !== _value)
        if (_checked) {
          dummyList = [...dummyList, { value: _value, checked: _checked }]
        }
      } else if (_checked) {
        dummyList = [...dummyList, { value: _value, checked: _checked }]
      }
      return [...dummyList]
    })
    setCheck(_value, _checked)
  }
  return (
    <div>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        className="p-1 py-0.5"
      >
        {icon}
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        {checkboxList.map((c) => (
          <CheckBoxNaka
            key={uuidv4()}
            text={c}
            value={!!dummyCheck.find((v) => v.value === c && v.checked)}
            onHandle={(e) => onHandleChanged(c, e?.target.checked)}
            className="flex cursor-pointer items-center bg-neutral-800 px-2.5 py-1"
          />
        ))}
      </Popover>
    </div>
  )
}

export default memo(TablePopover)
