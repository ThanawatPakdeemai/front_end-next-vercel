import React, { useState } from "react"
import { Button } from "@mui/material"
import ReloadIcon from "@components/icons/ReloadIcon"
import LockIcon from "@components/icons/LockIcon"
import IconArrowDownBorder from "@components/icons/ArrowDownBorderIcon"

export interface IStakingDate {
  label: string
  date?: string
  time?: string
  textColor: "purple" | "red"
  buttonLabelOne?: string
  buttonLabelTwo?: string
  actionButtonOne?: () => void
  actionButtonTwo?: () => void
  className?: string
}

const ActionBar = ({
  label,
  date,
  time,
  textColor = "red",
  buttonLabelOne,
  buttonLabelTwo,
  actionButtonOne = () => {},
  actionButtonTwo = () => {},
  className
}: IStakingDate) => {
  const [disabled, setDisabled] = useState<boolean>(false)

  return (
    <div className={`${className}`}>
      <div className="flex w-fit flex-row items-center py-6 uppercase">
        <p
          className={`${
            textColor === "purple" ? "text-secondary-main" : "text-red-card"
          }`}
        >
          {label}
          {(date || time) && (
            <span className="ml-3 text-neutral-300">
              {date} {time}
            </span>
          )}
        </p>

        <div className="mr-3 ml-5 flex items-center">
          <Button
            // sx={{ fontFamily: "neueMachina" }}
            color="error"
            className={`${
              disabled
                ? "!bg-neutral-800 !text-neutral-600"
                : "bg-secondary-main !text-neutral-200"
            } text-md ml-3 w-full font-neue-machina-semi `}
            variant="contained"
            size="large"
            type="submit"
            onClick={() => {
              setDisabled(!disabled)
              actionButtonOne()
            }}
          >
            {disabled ? <LockIcon stroke="#4E5057" /> : <IconArrowDownBorder />}
            <p className="ml-5">
              {disabled ? "Locked" : `${buttonLabelOne || "Stake"}`}
            </p>
          </Button>
          <Button
            // sx={{ fontFamily: "neueMachina" }}
            color="secondary"
            className={`${
              disabled
                ? "!bg-neutral-800 !text-neutral-600"
                : "bg-secondary-main !text-neutral-200"
            } text-md ml-3 w-full font-neue-machina-semi`}
            variant="contained"
            size="large"
            type="submit"
            onClick={() => {
              setDisabled(!disabled)
              actionButtonTwo()
            }}
          >
            {disabled ? <LockIcon stroke="#4E5057" /> : <IconArrowDownBorder />}
            <p className="ml-5">
              {disabled ? "Locked" : `${buttonLabelTwo || "Redeem"}`}
            </p>
          </Button>
        </div>

        <div className="h-fit w-fit rounded-lg border border-neutral-700 bg-neutral-800 p-3">
          <ReloadIcon />
        </div>
      </div>
    </div>
  )
}

export default ActionBar
