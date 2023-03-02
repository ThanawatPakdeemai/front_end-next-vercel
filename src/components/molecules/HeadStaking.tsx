import IconBarGraphOne from "@components/icons/BarGraphOne"
import useTab from "@feature/tab/hook/useTab"
import { Button, Grid } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const HeadStaking = ({ children }: { children: React.ReactNode }) => {
  const { handleChangeTab, tabValue } = useTab()
  const router = useRouter()
  const { pathname } = router
  const path = pathname.split("/")

  /**
   * @description Tab Content Partner Game
   */
  const STAKING_TAB_CONTENT: {
    id: "1" | "2"
    label: string
    icon: React.ReactNode
  }[] = [
    {
      id: "1",
      label: "Variable APR",
      icon: <IconBarGraphOne stroke="#E1E2E2" />
    },
    {
      id: "2",
      label: "Fixed APR",
      icon: <IconBarGraphOne stroke="#E1E2E2" />
    }
  ]

  return (
    <div className="relative z-10 w-[calc(100%)] px-[5%] lg:px-[10%]">
      <Grid
        container
        spacing={2}
        className="mb-10 flex-col items-center md:flex-row"
      >
        <Grid
          item
          xs={6}
          className="max-w-full font-bold uppercase"
        >
          Unlock the power of staking <br />
          and earn passive income
        </Grid>
        <Grid
          item
          xs={6}
          className="max-w-full"
        >
          {path.length === 3 ? (
            <Link
              className="flex h-full items-center justify-end"
              href="/staking"
            >
              <span className="ml-3">Back to Staking</span>
            </Link>
          ) : (
            <div
              aria-label="basic tabs example"
              className="grid grid-cols-2 items-center justify-center gap-x-2 rounded-[13px] bg-neutral-700 p-1.5 text-center"
            >
              {STAKING_TAB_CONTENT.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handleChangeTab(item.id)}
                  className={`flex h-full items-center justify-center rounded-lg py-3 hover:bg-neutral-900 ${
                    item.id === tabValue
                      ? "!bg-neutral-900 !text-white-default"
                      : "bg-neutral-800"
                  }`}
                >
                  <IconBarGraphOne stroke="#E1E2E2" />
                  <span className="ml-3">{item.label}</span>
                </Button>
              ))}
            </div>
          )}
        </Grid>
      </Grid>
      {children}
    </div>
  )
}
export default HeadStaking
