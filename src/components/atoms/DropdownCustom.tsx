import * as React from "react"
import { useEffect, useState } from "react"
import { Collapse } from "@mui/material"
import DropdownIcon from "@components/icons/DropdownIcon"
import {
  getCategories,
  getGameAssets
} from "@feature/dropdown/containers/services/dropdown.service"
import { useToast } from "@feature/toast/containers"
import AllCategoriesIcon from "@components/icons/AllCategoriesIcon"
import {
  IDevice,
  IDropdownAll,
  IGameCategory,
  IGameItem,
  IGameType
} from "@feature/dropdown/interfaces/IDropdownService"
import useFilterStore from "@stores/blogFilter"
import { getGamePartner } from "@feature/partner/containers/services/dropdownPartner.service"
import { useTranslation } from "react-i18next"
import AllGamesIcon from "@components/icons/AllGamesIcon"
import AllDevicesIcon from "@components/icons/AllDevicesIcon"
import MobileIcon from "@components/icons/HowToPlayIcon/MobileIcon"
import DesktopIcon from "@components/icons/DesktopIcon"
import MultiPlayerIcon from "@components/icons/MultiPlayerIcon"
import SinglePlayerIcon from "@components/icons/SinglePlayerIcon"
import SelectDropdown from "./selectDropdown/SelectDropdown"

export type IDropdownCustomSelect =
  | "All Categories"
  | "All Game Assets"
  | "All Devices"
  | "All Game Types"
  | "All Publisher Categories"
  | "Currently Week"
  | "All Partner Categories"
  | "GameItem"
  | ""

interface IProp {
  icon?: React.ReactNode
  title: IDropdownCustomSelect
  className: string
}
const DropdownCustom = ({ title, className }: IProp) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<boolean>(false)
  const [listSelect, setListSelect] = useState<
    IGameItem[] | IGameCategory[] | IDevice[] | IGameType[]
  >([])
  const [onTitle, setOnTitle] = useState<IDropdownAll>()
  const [onTitleGameType, setOnTitleGameType] = useState<IGameType>()
  const { errorToast } = useToast()
  // const [height, setHeight] = useState<number | undefined>(0)

  const {
    setCategory: setCategoryDropdown,
    setGameItem: setGameItemDropdown,
    setDevice: setDeviceDropdown,
    setGameType: setGameTypeDropdown
  } = useFilterStore()

  const [textTitle, setTextTitle] = useState<IDropdownCustomSelect>("")

  const showIcon = title !== "Currently Week"

  const getDropdownIconByTitleName = () => {
    switch (title) {
      case "All Categories":
        return <AllCategoriesIcon />
      case "GameItem":
      case "All Game Assets":
        return <AllGamesIcon />
      case "All Devices":
        return <AllDevicesIcon />
      case "All Game Types":
        return <MultiPlayerIcon />
      default:
        return <AllCategoriesIcon />
    }
  }

  // Check div height
  // const divHeight: number | undefined =
  //   document.getElementById("collapse-wrapper")?.clientHeight

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

  const onGamePartner = () => {
    getGamePartner()
      .then((res) => {
        res.data.data.splice(0, 0, {
          created_at: "",
          id: "",
          is_active: true,
          name: "All Categories",
          slug: "",
          updated_at: ""
        })
        setListSelect(res.data.data)
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }

  const onGameAssets = () => {
    getGameAssets()
      .then((res) => {
        res.splice(0, 0, {
          crate_date: "",
          _id: "all",
          current_time: "",
          name: "All Game Assets",
          detail: "",
          is_active: true,
          price: 0,
          min_item: 0,
          item_id_smartcontract: 0,
          model_id: 0,
          image_icon_color: "",
          image_icon: "",
          image: "",
          item_size: "",
          craft_time: 0,
          id: "all",
          default: false,
          amount: 0,
          index: 0,
          qty: 0
        })
        setListSelect(res)
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }

  const onCategories = () => {
    getCategories()
      .then((res) => {
        res.splice(0, 0, {
          id: "all",
          name: "All Categories",
          createdAt: "",
          updatedAt: "",
          detail: "",
          slug: "",
          color_code: "",
          image_list: "",
          image_banner: "",
          is_active: true,
          _id: "all"
        })
        setListSelect(res)
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }

  const device = [
    {
      _id: "all",
      name: "All Devices",
      supported: true,
      icon: <AllDevicesIcon />
    },
    {
      _id: "mobile",
      name: "Mobile and Tablet",
      supported: true,
      icon: <MobileIcon />
    },
    {
      _id: "desktop",
      name: "Desktop",
      supported: true,
      icon: <DesktopIcon />
    }
  ]

  const gameType: IGameType[] = [
    {
      _id: "all",
      name: "All Game Types",
      icon: <MultiPlayerIcon />
    },
    {
      _id: "singleplayer",
      name: "Singleplayer",
      icon: <SinglePlayerIcon />
    },
    {
      _id: "multiplayer",
      name: "Multiplayer",
      icon: <MultiPlayerIcon />
    },
    {
      _id: "storymode",
      name: "Story Mode",
      icon: <DesktopIcon />
    }
  ]

  useEffect(() => {
    let load = false

    if (!load) {
      if (title === "All Categories") {
        onCategories()
        setTextTitle("All Categories")
      } else if (title === "All Game Assets") {
        onGameAssets()
        setTextTitle("All Game Assets")
      } else if (title === "All Devices") {
        setListSelect(device)
        setTextTitle("All Devices")
      } else if (title === "All Partner Categories") {
        onGamePartner()
        setTextTitle("All Categories")
      } else if (title === "All Publisher Categories") {
        onGamePartner()
        setTextTitle("All Categories")
      } else if (title === "All Game Types") {
        setListSelect(gameType)
        setTextTitle("All Game Types")
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let load = false

    if (!load) {
      if (onTitle && textTitle) {
        if (textTitle === "All Categories") {
          if (onTitle.id) {
            setCategoryDropdown(onTitle.id)
          } else if (title === "All Partner Categories") {
            if (onTitle.name === "All Categories") {
              setCategoryDropdown("")
            } else {
              setCategoryDropdown(onTitle.name.toLowerCase())
            }
          } else if (title === "All Publisher Categories") {
            if (onTitle.name === "All Categories") {
              setCategoryDropdown("")
            } else {
              setCategoryDropdown(onTitle.slug)
            }
          }
        } else if (textTitle === "All Game Assets") {
          if (onTitle.name === "All Game Assets") {
            setGameItemDropdown("all")
          } else {
            setGameItemDropdown(onTitle.name)
          }
        } else if (textTitle === "All Devices") {
          setDeviceDropdown(onTitle._id)
        } else if (textTitle === "All Game Types") {
          if (!onTitleGameType) return
          setGameTypeDropdown(onTitleGameType._id)
        }
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTitle])

  return (
    <div className="dropdown-custom">
      {listSelect && (
        <div className="dropdown-custom__wrapper flex w-full justify-center">
          <button
            type="button"
            onClick={handleOnExpandClick}
            className={`${className} mb-1 flex h-[40px] w-[218px] flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary`}
          >
            {/* {showIcon && <AllCategoriesIcon />} */}
            {showIcon && getDropdownIconByTitleName()}
            <span className="">
              {t(onTitle === undefined ? textTitle : onTitle.name)}
            </span>
            <div
              className={`${
                expanded === true
                  ? "rotate-180 transition-all duration-300"
                  : "rotate-0 transition-all duration-300"
              }`}
            >
              <DropdownIcon />
            </div>
          </button>
          <Collapse
            in={expanded}
            timeout="auto"
            id="collapse-wrapper"
            className={`${className} ${
              title === "All Categories"
                ? "custom-scroll max-h-[420px] overflow-y-scroll"
                : ""
            } mt-10 rounded-[19px]`}
            sx={{
              background: "rgba(1, 1, 1, 0.85)",
              backdropFilter: "blur(15px)",
              borderRadius: "19px",
              zIndex: 99999,
              position: "absolute",
              width: "218px",
              padding: "5px",
              ".MuiList-root": {
                background: "#18181C",
                borderRadius: "13px"
              },
              "svg path": {
                stroke: "#70727B"
              },
              ".MuiMenuItem-root:hover": {
                "svg path": {
                  stroke: "#E1E2E2"
                }
              }
            }}
          >
            <SelectDropdown
              // className={className}
              details={listSelect}
              setOnTitle={setOnTitle}
              setOnTitleGameType={setOnTitleGameType}
              setExpanded={setExpanded}
              title={title}
            />
          </Collapse>
        </div>
      )}
    </div>
  )
}
export default DropdownCustom
