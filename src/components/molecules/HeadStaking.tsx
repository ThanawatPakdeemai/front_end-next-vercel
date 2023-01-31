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
        {/* <Grid
          container
          spacing={2}
          className="rounded-[13px] bg-[#232329] p-4"
          columns={12}
        >
          <Grid
            item
            xs={6}
            className="rounded-lg bg-[#18181C]"
          >
            Variable APR
          </Grid>
          <Grid
            item
            xs={6}
            className="rounded-lg bg-[#010101]"
          >
            Fixed APR
          </Grid>
        </Grid> */}
        <div className="grid grid-cols-2 items-center justify-center gap-x-2 rounded-[13px] bg-[#232329] p-1.5 text-center">
          <div className="flex h-full items-center justify-center rounded-lg bg-[#18181C] py-3">
            <IconBarGraphOne stroke="#E1E2E2" />
            <span className="ml-3">Variable APR</span>
          </div>
          <div className="flex h-full items-center justify-center rounded-lg bg-[#18181C] py-3">
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
