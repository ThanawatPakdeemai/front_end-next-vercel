import React, { memo } from "react"
import MenuItem from "@mui/material/MenuItem"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuList,
  Popover,
  Typography,
  Box
} from "@mui/material"

interface IProp {
  button: React.ReactNode
  title: string
  options: {
    label: string
    value: string
    image?: React.ReactNode
    handelClick?: () => void
  }[]
  imageSelectd?: React.ReactNode
}
const SelectNaka = ({ button, title, options, imageSelectd }: IProp) => (
  <>
    <PopupState
      variant="popover"
      popupId="demo-popup-popover"
    >
      {(popupState) => (
        <div>
          <div {...bindTrigger(popupState)}>{button}</div>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "10px",
                top: "0 !important"
              }
            }}
          >
            <div className="bg-primary-main p-1">
              <div className="rounded-less bg-grey-900 p-1">
                <div className="flex items-center justify-between">
                  <div className="w-full rounded-less bg-primary-main px-4">
                    <ListItemText>
                      <Typography className="overflow-hidden truncate font-neue-machina text-default">
                        {title}
                      </Typography>
                    </ListItemText>
                  </div>
                  <Box
                    component="div"
                    className="relative cursor-pointer"
                    onClick={() => popupState.close()}
                  >
                    <div className="ml-2 font-neue-machina text-default">
                      <div className="h-5 w-5 rotate-45 rounded-less bg-error-main hover:rotate-0 " />
                    </div>

                    <Divider
                      className=" absolute bottom-[9px] left-[10px] w-[15px] border border-[#f1f4f4]"
                      orientation="vertical"
                      flexItem
                    />
                  </Box>
                </div>
              </div>
              <div className="flex items-center justify-between bg-primary-main pt-2 ">
                <div className="flex w-full items-center  justify-between rounded-less bg-grey-900 p-1">
                  <MenuList className="w-full">
                    {options.map((option) => (
                      <MenuItem
                        key={option.value}
                        onClick={() => {
                          option.handelClick && option.handelClick()
                          popupState.close()
                        }}
                      >
                        <ListItemIcon>{option.image}</ListItemIcon>
                        <ListItemText>
                          <Typography className="font-neue-machina text-default">
                            {option.label}
                          </Typography>
                        </ListItemText>
                      </MenuItem>
                    ))}
                  </MenuList>
                  <div className="py-1 px-2">{imageSelectd}</div>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  </>
)
export default memo(SelectNaka)
