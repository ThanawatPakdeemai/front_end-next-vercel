import SearchIcon from "@components/icons/SearchIcon"
import { commonPattern } from "@constants/regex"
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import React, { useEffect, useState } from "react"

interface IProps {
  title: string
  placeholder?: string
  onClick: (_value: string) => void
  // eslint-disable-next-line no-unused-vars
  onKey?: (event: React.KeyboardEvent<HTMLDivElement>, _value: string) => void
  reset?: boolean
  className?: string
}

const FilterSearchBox = ({
  title,
  placeholder,
  onClick,
  onKey,
  reset,
  className
}: IProps) => {
  const [state, setState] = useState<string>("")

  useEffect(() => {
    let load = false
    if (!load) setState("")
    return () => {
      load = true
    }
  }, [reset])

  return (
    <div className={`${className || `flex-col`} flex  gap-y-1`}>
      <Typography className="text-xs uppercase text-neutral-500">
        {title}
      </Typography>
      <TextField
        className="w-full"
        placeholder={placeholder}
        InputProps={{
          style: {
            fontSize: "14px",
            fontFamily: "neueMachina",
            width: "100%",
            padding: 8
          },
          endAdornment: (
            <InputAdornment
              position="end"
              className="cursor-pointer"
            >
              <IconButton
                onClick={() => {
                  onClick(state)
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        onKeyDown={(event) => {
          if (onKey) onKey(event, state)
        }}
        onChange={(_event) => {
          setState(_event.target.value.replace(commonPattern, ""))
        }}
        value={state}
      />
    </div>
  )
}
export default FilterSearchBox
