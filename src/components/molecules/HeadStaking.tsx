import { Button, Grid } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Trans, useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import useTab from "@feature/tab/hook/useTab"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const HeadStaking = ({ children }: { children: React.ReactNode }) => {
  const { handleChangeTab, tabValue } = useTab()
  const router = useRouter()
  const { pathname } = router
  const path = pathname.split("/")
  const { t } = useTranslation()

  /**
   * @description Tab Content Partner Game
   */
  const STAKING_TAB_CONTENT: {
    id: "1" | "2"
    label: React.ReactNode | string
    icon: React.ReactNode
  }[] = [
    {
      id: "1",
      label: <Trans i18nKey="variable_APR">variable_APR</Trans>,
      icon: <Icomoon className="icon-Bar-Graph text-[#E1E2E2]" />
    },
    {
      id: "2",
      label: <Trans i18nKey="fixed_APR">fixed_APR</Trans>,
      icon: <Icomoon className="icon-Bar-Graph text-[#E1E2E2]" />
    }
  ]

  return (
    <div className="relative z-10 w-[calc(100%)] lg:px-[5%] xl:px-[10%]">
      <Grid
        container
        spacing={2}
        className="mb-10 flex-col items-center max-md:mt-4 md:flex-row"
      >
        <Grid
          item
          xs={6}
          className="max-w-full font-bold uppercase"
        >
          {t("head_staking_desc_1")} <br />
          {t("head_staking_desc_2")}
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
              <span className="ml-3">{t("back_to_staking")}</span>
            </Link>
          ) : (
            <div
              aria-label="basic tabs example"
              className="grid grid-cols-2 items-center justify-center gap-x-2 rounded-[13px] bg-neutral-700 p-1.5 text-center"
            >
              {STAKING_TAB_CONTENT.map((item) => (
                <Button
                  key={item.id}
                  aria-label="Previous Slide"
                  onClick={() => handleChangeTab(item.id)}
                  className={`flex h-full items-center justify-center rounded-lg py-3 hover:bg-neutral-900 max-sm:!min-w-0 ${
                    item.id === tabValue
                      ? "!bg-neutral-900 !text-white-default"
                      : "bg-neutral-800"
                  }`}
                >
                  <Icomoon className="icon-Bar-Graph text-[#E1E2E2]" />
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
