import { TextField, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { unstable_batchedUpdates } from "react-dom"
import dynamic from "next/dynamic"
import useCountStore from "@stores/countComponant"
import { iconmotion } from "@styles/themes/partial/motion"

const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

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
    <div className="count-item__wrapper flex flex-col items-start gap-y-2">
      {label && (
        <Typography className="text-sm font-bold uppercase text-neutral-500">
          {label}
        </Typography>
      )}
      <div className="count-item__content flex items-center">
        <ButtonIcon
          onClick={_minusItem || minusItem}
          variants={iconmotion}
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 4 }}
          icon={<Icomoon className="icon-Minus" />}
          className="count-item__decrease m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
        />
        <TextField
          className="mx-1 !w-[136px]"
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
            endAdornment: endIcon || <Icomoon className="icon-Skull" />,
            style: {
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
          icon={<Icomoon className="icon-Plus1" />}
          className="count-item__increase m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
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
