import React from "react"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import useEventController from "@feature/event/containers/hooks/useEventController"

const Chip = dynamic(() => import("@mui/material/Chip"), {
  suspense: true,
  ssr: false
})
const Divider = dynamic(() => import("@mui/material/Divider"), {
  suspense: true,
  ssr: false
})
const Typography = dynamic(() => import("@mui/material/Typography"), {
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
const AsideLayout = dynamic(
  () => import("@components/templates/contents/AsideLayout"),
  {
    suspense: true,
    ssr: false
  }
)

const EventRewardSidebar = () => {
  const { currentEventData, MOCKUP_REWARD } = useEventController()

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
        }
      }}
    >
      <div className="relative my-2 flex flex-col overflow-hidden rounded-2xl bg-neutral-780 p-2 sm:m-0 md:min-w-[330px]">
        <AsideLayout
          icon={<Icomoon className="icon-Radar-02" />}
          title="Reward details"
        >
          <PanelContent height="h-[500px]">
            <div className="text-start text-sm text-neutral-500 lg:pl-6 lg:pr-3 lg:pt-3">
              {MOCKUP_REWARD.map((reward) => (
                <div
                  key={reward.id}
                  className="reward-item"
                >
                  <div className="flex items-center gap-2">
                    <Typography className="font-neue-machina-semi text-xs uppercase text-neutral-600">
                      {reward.rank}
                    </Typography>
                    <Chip
                      label={`$ ${reward.reward}`}
                      variant="outlined"
                      size="small"
                      className="cursor-pointer uppercase"
                    />
                  </div>
                  <Divider className="border-neutral-750 my-2 !block border-b-[1px]" />
                </div>
              ))}
            </div>
          </PanelContent>
        </AsideLayout>
      </div>
    </Box>
  )
}

export default EventRewardSidebar
