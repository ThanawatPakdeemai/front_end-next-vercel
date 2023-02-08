import { Box, LinearProgress, Skeleton, Typography } from "@mui/material"
import { TStaking } from "@src/types/staking"
import { numberWithCommas } from "@utils/helpers"
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
      className={`flex h-full items-center justify-between rounded-[10px] bg-neutral-900 ${className} px-2`}
    >
      {totalPoolStake !== -1 && poolLimit !== -1 ? (
        <div className="h-[50px] w-[200px] py-2">
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

      <div className="flex w-[calc(100%-200px)] items-center justify-end whitespace-nowrap pl-5 font-neue-machina-semi">
        <span className="mr-2 text-neutral-600">total naka staked : </span>
        {totalPoolStake !== -1 && poolLimit !== -1 ? (
          <>
            <span className="text-neutral-300">
              {numberWithCommas(totalPoolStake)}
            </span>
            &nbsp;/&nbsp;
            <span className="text-neutral-300">
              {numberWithCommas(poolLimit)}
            </span>
          </>
        ) : (
          <Skeleton className="h-[50px] w-full rounded-sm" />
        )}
      </div>
    </div>
  )
}
export default TotalStaked
