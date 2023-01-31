import IconBarGraphOne from "@components/icons/BarGraphOne"
import IconBarGraphTwo from "@components/icons/BarGraphTwo"
import { Grid } from "@mui/material"
import React from "react"

const HeadStaking = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[calc(100%)] px-[10%]">
    <Grid
      container
      spacing={2}
      // columns={15}
      className="mb-10 items-center"
    >
      <Grid
        item
        xs={6}
        className="font-bold uppercase"
      >
        Unlock the power of staking <br />
        and earn passive income
      </Grid>
      <Grid
        item
        xs={6}
      >
        <div className="grid grid-cols-2 items-center justify-center gap-x-2 rounded-[13px] bg-neutral-700 p-1.5 text-center">
          <div className="flex h-full items-center justify-center rounded-lg bg-neutral-800 py-3">
            <IconBarGraphOne stroke="#E1E2E2" />
            <span className="ml-3">Variable APR</span>
          </div>
          <div className="flex h-full items-center justify-center rounded-lg bg-neutral-800 py-3">
            <IconBarGraphTwo stroke="#E1E2E2" />
            <span className="ml-3">Fixed APR</span>
          </div>
        </div>
      </Grid>
    </Grid>
    {children}
  </div>
)
export default HeadStaking
