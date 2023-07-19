import { TextField, Typography } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import MinusIcon from "@components/icons/CountIcon/MinusIcon"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import { iconmotion } from "@components/organisms/Footer"
import Helper from "@utils/helper"
import { commonPattern } from "@constants/regex"

const regexNumber = /^[0-9]*$/

interface IProps {
  label?: string | null
  helperText?: string
  max?: number
  min?: number
  setValue: (_value: number) => void
  resetValue?: boolean
}

const AmountItem = ({
  label,
  helperText,
  max = 999999,
  min = 0,
  setValue,
  resetValue
}: IProps) => {
  const [amount, setAmount] = useState<string>(min.toString())
  const AmountAsNumber = Number(amount)
  const onIncreaseAmount = useCallback(() => {
    const _value: number = Number(amount) + 1
    if (_value >= max) setAmount(max.toString())
    else setAmount(_value.toString())
  }, [max, amount])

  const onDecreaseAmount = useCallback(() => {
    const _value: number = Number(amount) - 1
    if (_value <= min) setAmount(min.toString())
    else setAmount(_value.toString())
  }, [min, amount])

  const amountUpdate = useCallback(() => {
    setValue(Number(amount))
  }, [amount, setValue])

  useEffect(() => {
    let load = false
    if (!load) amountUpdate()
    return () => {
      load = true
    }
  }, [amountUpdate])

  const onAmountChanged = useCallback(
    (_value: string) => {
      if (_value.length > 3) _value = _value.replace(commonPattern, "")
      if (regexNumber.test(_value) && _value !== "") {
        if (_value.length >= 2 && _value.charAt(0) === "0")
          _value = _value.slice(1)
        if (Number(_value) >= max) setAmount(max.toString())
        else if (Number(_value) <= min) setAmount(min.toString())
        else setAmount(_value)
      } else if (_value === "") {
        setAmount(min.toString())
      }
    },
    [max, min]
  )

  useEffect(() => {
    let load = false
    if (!load) setAmount(min.toString())
    return () => {
      load = true
    }
  }, [min, resetValue])

  return (
    <div className="count-item__wrapper flex flex-col items-start gap-y-2">
      {label && (
        <Typography className="text-sm font-bold uppercase text-neutral-500">
          {label}
        </Typography>
      )}
      <div className="count-item__content flex items-center">
        <ButtonIcon
          onClick={onDecreaseAmount}
          variants={iconmotion}
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 4 }}
          icon={<MinusIcon />}
          className="count-item__decrease m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
        />
        <TextField
          type="text"
          value={formatNumber(AmountAsNumber)}
          onChange={(e) => onAmountChanged(e.target.value)}
          autoComplete="off"
          inputProps={{
            style: {
              paddingLeft: 4
            }
          }}
        />
        <ButtonIcon
          onClick={onIncreaseAmount}
          variants={iconmotion}
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 4 }}
          icon={<PlusIcon />}
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

export default AmountItem
