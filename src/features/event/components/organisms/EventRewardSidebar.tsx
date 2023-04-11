import OverviewIcon from "@components/icons/OverviewIcon"
import PanelContent from "@components/molecules/PanelContent"
import AsideLayout from "@components/templates/contents/AsideLayout"
import useEventController from "@feature/event/containers/hooks/useEventController"
import { Box, Chip, Divider, Typography } from "@mui/material"
import React from "react"

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
          icon={<OverviewIcon />}
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
