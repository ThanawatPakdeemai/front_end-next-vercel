import ButtonIcon from "@components/atoms/button/ButtonIcon"
import MinusIcon from "@components/icons/CountIcon/MinusIcon"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import SkullIcon from "@components/icons/CountIcon/SkullIcon"
import { iconmotion } from "@components/organisms/Footer"
import { TextField, Typography } from "@mui/material"
import useCountStore from "@stores/countComponant"
import React, { useEffect } from "react"
import { unstable_batchedUpdates } from "react-dom"

interface IProp {
  endIcon?: React.ReactNode
  label?: string | null
  helperText?: string
  _minusItem?: () => void
  _addItem?: () => void
  min?: number
  max?: number
  count?: number
  setItemCount?: (_count: number) => void
  _item?: number
}

const CountItem = ({
  endIcon,
  label,
  helperText,
  _minusItem,
  _addItem,
  min,
  max,
  count,
  setItemCount,
  _item
}: IProp) => {
  const minusItem = useCountStore((state: any) => state.decrease)
  const addItem = useCountStore((state: any) => state.increase)
  const item = useCountStore((state: any) => state.count)
  const { setMin, setMax, setCount } = useCountStore()

  useEffect(() => {
    let load = false

    if (!load)
      unstable_batchedUpdates(() => {
        if (min) setMin(min)
        if (max) setMax(max)
        if (count) {
          if (setItemCount) setItemCount(count)
          else setCount(count)
        }
      })

    return () => {
      load = true
    }
  }, [count, max, min, setCount, setItemCount, setMax, setMin])

  return (
    <div className="flex flex-col items-start gap-y-2">
      {label && (
        <Typography className="text-sm font-bold uppercase text-neutral-500">
          {label}
        </Typography>
      )}
      <div className="flex items-center">
        <ButtonIcon
          onClick={_minusItem || minusItem}
          variants={iconmotion}
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 4 }}
          icon={<MinusIcon />}
          className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
        />
        <TextField
          className="mx-1"
          sx={{
            input: {
              textAlign: "center"
            },
            "& label.Mui-focused": {
              color: "white"
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "white",
                border: "none"
              }
            }
          }}
          value={setItemCount && count ? count : _item || item}
          InputProps={{
            readOnly: true,
            endAdornment: endIcon || <SkullIcon />,
            style: {
              width: "200px",
              fontSize: 14,
              paddingLeft: 30,
              fontFamily: "neueMachina"
            }
          }}
          focused={false}
        />
        <ButtonIcon
          onClick={_addItem || addItem}
          variants={iconmotion}
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 4 }}
          icon={<PlusIcon />}
          className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
        />
      </div>
      {helperText && (
        <Typography className="text-sm font-bold uppercase text-neutral-600">
          {helperText}
        </Typography>
      )}
    </div>
  )
}

export default CountItem
