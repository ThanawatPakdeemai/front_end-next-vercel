import { Box, LinearProgress, Skeleton, Typography } from "@mui/material"
import { TStaking } from "@src/types/staking"
import Helper from "@utils/helper"
import React from "react"

interface ITotalStaked {
  totalPoolStake: number
  poolLimit: number
  className?: string
  type?: TStaking
}

const TotalStaked = ({
  totalPoolStake,
  poolLimit,
  className,
  type
}: ITotalStaked) => {
  const { formatNumber } = Helper
  /**
   * @description Calculate total naka staked
   */
  const totalNAKAStaked = () => {
    if (poolLimit > 0 && totalPoolStake > 0) {
      const result = (totalPoolStake / poolLimit) * 100
      return result > 0.0001 ? parseFloat(result.toString()).toFixed(4) : 0.0001
    }
    return 0
  }

  return (
    <div
      className={`h-full items-center justify-between rounded-[10px] bg-neutral-900 sm:flex ${className} px-5 py-3 sm:px-2 sm:py-0`}
    >
      {totalPoolStake !== -1 && poolLimit !== -1 ? (
        <div className="h-[50px] w-full py-2 sm:w-[200px]">
          <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-[2px] bg-neutral-780 py-1">
            <Box
              className="absolute h-full w-full rounded-[2px]"
              sx={{
                backgroundColor: "#101013",
                background:
                  "linear-gradient(90deg, rgba(1,1,1,1) 52%, #101013 52%);",
                backgroundRepeat: "repeat-x",
                backgroundSize: "1%"
              }}
            />
            <LinearProgress
              variant="determinate"
              className={`progress-bar-energy relative h-full w-[${Number(
                totalNAKAStaked()
              )}] rotate-180`}
              sx={[
                {
                  "&.progress-bar-energy": {
                    background:
                      "linear-gradient(90deg, #101013 52%, #101013 52%)",
                    backgroundSize: "1%!important"
                  },
                  ".MuiLinearProgress-bar1Determinate": {
                    backgroundColor: type === "fixed" ? "#F42728" : "#7B5BE6",
                    background: `linear-gradient(90deg, rgba(1,1,1,1) 52%, ${
                      type === "fixed" ? "#F42728" : "#7B5BE6"
                    } 52%);`,
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "1%"
                  }
                }
              ]}
              value={Number(totalNAKAStaked())}
            />
            <Box
              className="absolute"
              sx={{
                transform: `translateX(calc(${Number(totalNAKAStaked())}%))`
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-white"
              >{`${Number(totalNAKAStaked())}%`}</Typography>
            </Box>
          </div>
        </div>
      ) : (
        <Skeleton className="h-[50px] w-full rounded-sm" />
      )}

      <div className="flex items-center justify-center whitespace-nowrap font-neue-machina-semi sm:w-[calc(100%-200px)] sm:justify-end sm:pl-5">
        <span className="mr-2 text-neutral-600">total naka staked : </span>
        {totalPoolStake !== -1 && poolLimit !== -1 ? (
          <>
            <span className="text-neutral-300">
              {formatNumber(totalPoolStake, { maximumFractionDigits: 4 })}
            </span>
            &nbsp;/&nbsp;
            <span className="text-neutral-300">
              {formatNumber(poolLimit, { maximumFractionDigits: 4 })}
            </span>
          </>
        ) : (
          <Skeleton className="h-[15px] w-[150px] rounded-sm sm:h-[50px] sm:w-full" />
        )}
      </div>
    </div>
  )
}
export default TotalStaked
