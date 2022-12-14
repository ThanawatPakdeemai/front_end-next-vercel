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
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"

interface IProp {
  button: React.ReactNode
  title: string
  options: {
    label: string
    value: string
    icon?: string | React.ReactNode
    image?: React.ReactNode
    textEnd?: string
    link: string
  }[]
  imageSelectd?: React.ReactNode
  widthOption?: string
  left?: string
}
const SelectNaka = ({
  button,
  title,
  options,
  imageSelectd,
  widthOption = "auto",
  left
}: IProp) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
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
                  borderRadius: "19px",
                  "@media only screen and (min-width: 768px)": {
                    top: "40px !important",
                    width: widthOption,
                    marginLeft: left || "0px"
                  }
                }
              }}
            >
              <div className="bg-primary-main p-1">
                <div className="rounded-default bg-grey-900 p-1">
                  <div className="flex items-center justify-between">
                    <div className="w-full rounded-default bg-primary-main px-4 py-2">
                      <ListItemText>
                        <Typography className="overflow-hidden truncate font-neue-machina text-default">
                          {t(`${title}`)}
                        </Typography>
                      </ListItemText>
                    </div>
                    <Box
                      component="div"
                      className="relative mx-3 cursor-pointer"
                      onClick={() => popupState.close()}
                    >
                      <div className="image-square ml-2 font-neue-machina text-default ">
                        <div className="select-global-square h-8 w-8 rotate-45  rounded-[8px] bg-error-main hover:h-[35px] hover:w-[35px] hover:rotate-0" />
                      </div>

                      <Divider
                        className="select-square absolute bottom-[16px] left-[16px] w-[15px] border border-[#f1f4f4]"
                        orientation="vertical"
                        flexItem
                      />
                    </Box>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-primary-main pt-2 ">
                  <div className="flex w-full items-center  justify-between rounded-default bg-grey-900 p-1">
                    <MenuList className="w-full">
                      {options.map((option) => (
                        <MenuItem
                          className={`${
                            router.pathname === option.link ? "active" : ""
                          } menu-select-naka`}
                          key={option.value}
                          onClick={() => {
                            popupState.close()
                            router.push(option.link)
                          }}
                        >
                          <ListItemIcon className="text-primary-contrastText">
                            {option.icon}
                          </ListItemIcon>
                          <ListItemText className="w-50">
                            <Typography className="font-neue-machina text-default">
                              {option.label}
                            </Typography>
                          </ListItemText>
                          {option.textEnd && (
                            <Box
                              component="div"
                              className="w-max "
                            >
                              <ListItemText className="text-end-select-naka rounded-less border border-grey-900 bg-primary-main px-2 text-center font-neue-machina-semi text-sm uppercase ">
                                <Typography className="uppercase text-primary-contrastText" />
                                {option.textEnd}
                              </ListItemText>
                            </Box>
                          )}
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
}
export default memo(SelectNaka)
