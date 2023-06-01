import LogoIcon from "@components/icons/LogoIcon"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { NextRouter, useRouter } from "next/router"
import { Image } from "@components/atoms/image"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Typography
} from "@mui/material"
import useNotiStore from "@stores/notification"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import useProfileStore from "@stores/profileStore"
import Link from "next/link"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_MARKETPLACE, MENU_MARKETPLACE_INVENTORY } from "@configs/menu"
// import RightMenuLogIn from "@components/molecules/rightMenu/RightMenuLogIn"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import MenuButtonExpandMobile from "./MenuButtonExpandMobile"

const HeaderMunuMobile = () => {
  const router: NextRouter = useRouter()
  const { count } = useNotiStore()
  const profile = useProfileStore((state) => state.profile.data)

  const [expanded, setExpanded] = useState<boolean>(false)
  const [expandedInvenTory, setExpandedInvenTory] = React.useState<
    string | false
  >("")
  const [headerTitle, setHeaderTitle] = useState<string>("NAKA Market")

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedInvenTory(newExpanded ? panel : false)
    }

  useEffect(() => {
    const pathName = router.asPath
    if (pathName.includes("/p2p")) {
      setHeaderTitle("P2P Market")
    } else if (pathName.includes("/map")) {
      setHeaderTitle("Nakaverse Map")
    } else if (pathName === "/marketplace") {
      setHeaderTitle("NAKA Market")
    }
  }, [router.asPath])

  return (
    <div>
      {/* <HeadProfileMobile /> */}
      <div className="fixed left-0 top-2 z-50 flex w-full justify-between px-2">
        <div className="flex">
          <div className="mr-1 h-[50px] w-[50px] rounded-[13px] border border-neutral-700 bg-neutral-780 p-1">
            <div className="grid h-full w-full content-center justify-items-center rounded-[8px] bg-purple-primary">
              <LogoIcon />
            </div>
          </div>
          <div className="flex h-[50px] w-[180px] rounded-[13px] border border-neutral-700  bg-neutral-780 p-1">
            <motion.div
              transition={{ type: "spring", stiffness: 100 }}
              animate={{
                rotate: expanded ? 0 : 180
              }}
              className={`mr-1 grid h-[40px] !w-[48px] content-center justify-items-center rounded-[8px] border border-neutral-700  p-[7px] ${
                expanded ? `bg-error-main` : `bg-neutral-780`
              }`}
            >
              <MenuButtonExpandMobile
                isOpen={expanded}
                onClick={handleOnExpandClick}
                strokeWidth="2"
                color="#F1F4F4"
                transition={{
                  ease: "easeOut",
                  duration: 0.2,
                  stiffness: 10,
                  bounce: 5
                }}
                width="20"
                height="10"
              />
            </motion.div>
            <div className="grid h-full w-full items-center rounded-[8px] bg-neutral-900 p-1 text-sm text-white-primary">
              {/* {pathName} */}
              {headerTitle}
            </div>
          </div>
        </div>
        <div className="flex h-[50px] w-fit gap-1 rounded-[13px] border border-neutral-700 bg-neutral-780 p-1">
          <div
            className={`relative mr-1 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-lg border border-neutral-700 bg-transparent before:absolute before:right-[6px] before:top-[5px] before:h-[6px] before:w-[6px] before:rounded-full ${
              (count > 0 && "before:bg-error-main before:opacity-100") ||
              "before:bg-transparent before:opacity-0"
            }`}
          >
            <NotificationsOutlinedIcon className="text-white-primary" />
          </div>
          <div className="grid !h-[40px] !w-[40px] content-center rounded-[8px] bg-neutral-900">
            <Link href={`/profile/${profile?.id}`}>
              <Image
                src={profile?.avatar || "/images/avatar.png"}
                alt="avatar"
                width={40}
                height={40}
                className="mr-[5px] rounded-lg"
              />
            </Link>
          </div>
        </div>
        {/* <RightMenuLogIn /> */}
      </div>
      <Collapse
        in={expanded}
        timeout="auto"
        className="fixed mt-4 !h-full w-full gap-2 p-2"
        sx={{
          backgroundColor: "#101013",
          zIndex: 99999,
          position: "absolute",
          width: "218px"
        }}
      >
        <div className="m-2 rounded-[13px] border border-purple-primary p-3 text-sm text-purple-primary">
          {headerTitle}
        </div>
        <div className="m-2 rounded-[13px] bg-neutral-680 p-1">
          {MENU_MARKETPLACE &&
            MENU_MARKETPLACE.map((menu) => {
              const active = router.asPath.includes(menu.link)
              if (menu.name === headerTitle) {
                return null
              }
              return (
                <MenuItemCustom
                  key={menu.name}
                  label={menu.name}
                  icon=""
                  // href=""
                  href={menu.link}
                  id={menu.name}
                  external={false}
                  active={active}
                  onClick={() => {
                    // setExpanded(false)
                  }}
                />
              )
            })}
        </div>
        <Accordion
          expanded={expandedInvenTory === "panel1"}
          onChange={handleChange("panel1")}
          className="static items-center justify-center rounded-[13px] border-neutral-800 bg-neutral-780 px-[26px]"
          sx={{
            "& .MuiAccordionSummary-content": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px 0",
              borderRadius: "13px"
            },
            borderRadius: "20px",
            // borderRadius: "13px",
            // backgroundImage: "none",
            margin: 1
          }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{ backgroundImage: "#010101" }}
            className="!flex !w-full !justify-between"
          >
            <Typography className="text-neutral-300">Inventory</Typography>

            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-neutral-700 bg-neutral-800">
              <div
                className={`flex items-center justify-center ${
                  expandedInvenTory === "panel1"
                    ? "rotate-90 transition-all duration-300"
                    : "rotate-0 transition-all duration-300"
                }`}
              >
                <div className="border border-neutral-200">
                  <PlusIcon
                    width={15}
                    height={15}
                  />
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {/* className="m-0 rounded-[13px] bg-neutral-680 p-2" */}
              {MENU_MARKETPLACE_INVENTORY.map((ele) => {
                const active = router.asPath.includes(ele.href)
                return (
                  <MenuItemCustom
                    key={ele.id}
                    id={ele.id}
                    label={ele.label}
                    icon={ele.icon}
                    href={ele.href}
                    external={ele.external}
                    active={active}
                  />
                )
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </Collapse>
    </div>
  )
}

export default HeaderMunuMobile
