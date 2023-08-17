import dayjs from "dayjs"
import React from "react"
import dynamic from "next/dynamic"
import { Box } from "@mui/material"
import { PaletteCustom } from "@styles/themes/partial/pattern"
import useEventController from "@feature/event/containers/hooks/useEventController"

const Divider = dynamic(() => import("@mui/material/Divider"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const PanelContent = dynamic(
  () => import("@components/molecules/PanelContent"),
  {
    suspense: true,
    ssr: false
  }
)
const TagSingular = dynamic(() => import("@components/molecules/TagSingular"), {
  suspense: true,
  ssr: false
})
const AsideLayout = dynamic(
  () => import("@components/templates/contents/AsideLayout"),
  {
    suspense: true,
    ssr: false
  }
)

const EventSidebar = () => {
  const { currentEventData } = useEventController()
  if (!currentEventData) return <></>
  return (
    <Box
      component="div"
      className="aside-wrapper flex flex-col justify-between gap-4 lg:h-full"
      sx={{
        ".panel-content": {
          maxHeight: "500px",
          ".custom-scroll": {
            overflow: "hidden"
          }
        },
        ".like-no_score": {
          margin: "0"
        }
      }}
    >
      <div className="relative my-2 flex flex-col gap-2 sm:m-0 md:min-w-[330px]">
        <AsideLayout
          icon={<Icomoon className="icon-Radar-02" />}
          title="Event Rules"
          className="overflow-hidden rounded-2xl bg-neutral-780 p-2 "
        >
          <PanelContent height="h-[500px]">
            <div className="text-start text-sm text-neutral-500 lg:pl-6 lg:pr-3 lg:pt-3">
              <TagSingular
                title="Rules"
                label={
                  <pre
                    className="whitespace-pre-wrap break-keep leading-6"
                    dangerouslySetInnerHTML={{
                      __html: currentEventData.event_detail || ""
                    }}
                  />
                }
              />
            </div>
          </PanelContent>
        </AsideLayout>
        <AsideLayout
          icon={<Icomoon className="icon-Radar-02" />}
          title="Event Details"
          className="overflow-hidden rounded-2xl bg-neutral-780 p-2 "
        >
          <PanelContent
            height="h-[200px]"
            sxCustomStyled={{
              ".MuiChip-root": currentEventData.is_active
                ? {
                    color: PaletteCustom.error
                  }
                : {}
            }}
          >
            <div className="text-start text-sm text-neutral-500 lg:pl-6 lg:pr-3 lg:pt-3">
              <TagSingular
                title="Date"
                label={`${dayjs(currentEventData.date_start).format(
                  "DD MMM YYYY"
                )} - ${dayjs(currentEventData.date_end).format("DD MMM YYYY")}`}
              />
              <Divider className="border-neutral-750 my-4 !block border-b-[1px]" />
              <TagSingular
                title="Status"
                color={
                  currentEventData.status === "on going" ? "success" : "primary"
                }
                label={currentEventData.status}
                variant="filled"
              />
            </div>
          </PanelContent>
        </AsideLayout>
      </div>
    </Box>
  )
}

export default EventSidebar
