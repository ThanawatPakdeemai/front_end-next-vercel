/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Drawer } from "@mui/material"
import React, { useState } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { FLAGS } from "@constants/flags"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const IcomoonFlag = dynamic(
  () => import("@components/atoms/icomoon/IcomoonFlag"),
  {
    suspense: true,
    ssr: false
  }
)

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
          <button
            type="button"
            aria-label=""
            onClick={toggleDrawer("bottom", true)}
          >
            <Icomoon className="icon-Settings" />
          </button>
          <Drawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer("bottom", false)}
          >
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
                <IcomoonFlag
                  className={
                    FLAGS.find((flag) => flag.code === item)?.name ?? ""
                  }
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
