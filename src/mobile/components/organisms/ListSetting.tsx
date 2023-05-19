/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Drawer } from "@mui/material"
import React, { useState } from "react"
import SettingsIcon from "@mui/icons-material/Settings"
import { useRouter } from "next/router"
import { Image } from "@components/atoms/image/index"
import { FLAGS } from "@constants/flags"

type Anchor = "top" | "left" | "bottom" | "right"
const ListSetting = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const toggleDrawer =
    (_anchor: Anchor, _open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setOpen(!open)
    }
  return (
    <>
      <div>
        <React.Fragment key="bottom">
          <SettingsIcon
            sx={{ fontSize: 25 }}
            fontSize="medium"
            onClick={toggleDrawer("bottom", true)}
          />
          <Drawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer("bottom", false)}
          >
            {/* // role="presentation" // onClick={toggleDrawer("bottom", false)}
            // onKeyDown={toggleDrawer("bottom", false)}
            // sx={{ width: "auto" }} */}
            {router.locales?.map((item) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                key={item}
                className="flex h-[60px] w-full items-center justify-center gap-3 border-t border-neutral-700 bg-primary-main px-3 font-neue-machina uppercase text-neutral-300"
                onClick={() => {
                  router.push(router.pathname, router.asPath, {
                    locale: item
                  })
                  setOpen(false)
                }}
              >
                <Image
                  src={
                    FLAGS.find((flag) => flag.code === item)?.flag_4x3 ??
                    "/assets/flags/4x3/us.svg"
                  }
                  width="20"
                  height="20"
                  alt="th"
                />
                {item}
              </div>
            ))}
            <div />
            {/* </Box> */}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  )
}
export default ListSetting
