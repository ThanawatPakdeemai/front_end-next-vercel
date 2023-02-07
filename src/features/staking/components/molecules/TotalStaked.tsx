import { Box, LinearProgress, Typography } from "@mui/material"
import { numberWithCommas } from "@utils/helpers"
import React from "react"

interface ITotalStaked {
  totalPoolStake: number
  totalPoolReward: number
  stakingValueMin?: number
  stakingValueMax?: number
  className?: string
}

const TotalStaked = ({
  totalPoolStake,
  totalPoolReward,
  className
}: ITotalStaked) => {
  /**
   * @description Calculate total naka staked
   */
  const totalNAKAStaked = () => {
    if (totalPoolStake > 0 && totalPoolReward > 0) {
      const result = (totalPoolReward / totalPoolStake) * 100
      return result > 0.0001 ? parseFloat(result.toString()).toFixed(4) : 0.0001
    }
    return 0
  }

  return (
    <div
      className={`flex h-full items-center justify-between rounded-[10px] bg-neutral-900 ${className} px-2`}
    >
      <div className="flex h-[50px] w-[200px] flex-col justify-center py-2">
        <LinearProgress
          variant="determinate"
          className={`progress-bar-energy h-full w-[${Number(
            totalNAKAStaked()
          )}] rotate-180`}
          sx={[
            {
              "&.progress-bar-energy": {
                opacity: 0.5,
                background: "linear-gradient(90deg, #101013 52%, #101013 52%)",
                backgroundSize: "1%!important"
              },
              ".MuiLinearProgress-bar1Determinate": {
                opacity: 1,
                backgroundColor: "#F42728",
                background:
                  "linear-gradient(90deg, rgba(1,1,1,1) 52%, #F42728 52%);",
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
      <div className="flex w-[calc(100%-200px)] items-center justify-end whitespace-nowrap pl-5 font-neue-machina-semi text-[14px]">
        <span className="text-neutral-600">total naka staked : </span>
        <span className="text-neutral-300">
          {numberWithCommas(totalPoolStake)}
        </span>
        &nbsp;/&nbsp;
        <span className="text-neutral-300">
          {numberWithCommas(totalPoolReward)}
        </span>
      </div>
    </div>
  )
}
export default TotalStaked
