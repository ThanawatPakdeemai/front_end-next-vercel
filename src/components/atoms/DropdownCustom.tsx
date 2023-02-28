import * as React from "react"
import { useEffect, useState, useMemo } from "react"
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
  IGameItem
} from "@feature/dropdown/interfaces/IDropdownService"
import useFilterStore from "@stores/blogFilter"
import { IMenuBase } from "@interfaces/IMenu"
import SelectDropdown from "./selectDropdown/SelectDropdown"

interface IProp {
  icon?: React.ReactNode
  title: string
  className: string
}
const DropdownCustom = ({ title, className }: IProp) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [gameData, setGameData] = useState<
    IGameItem[] | IGameCategory[] | IDevice[]
  >([])
  const [onTitle, setOnTitle] = useState<IDropdownAll | IMenuBase>()
  const { errorToast } = useToast()
  const {
    setCategory: setCategoryDropdown,
    setGameItem: setGameItemDropdown,
    setDevice: setDeviceDropdown
  } = useFilterStore()

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

  const dataDetail = useMemo(() => {
    if (gameData) {
      return gameData.map((element) => ({
        label: element.name ?? "",
        data: element,
        icon: "",
        href: ""
      }))
    }
    return Array(1).map(() => ({
      label: "",
      icon: "",
      href: ""
    }))
  }, [gameData])

  const onGameAssets = () => {
    getGameAssets()
      .then((res) => {
        res.splice(0, 0, {
          crate_date: "",
          _id: "",
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
        setGameData(res)
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
          _id: ""
        })
        setGameData(res)
      })
      .catch((error) => {
        errorToast(error.message)
      })
  }

  const device = [
    {
      _id: "",
      name: "All Devices",
      supported: true
    },
    {
      _id: "mobile",
      name: "Mobile and Tablet",
      supported: true
    },
    {
      _id: "desktop",
      name: "Desktop",
      supported: true
    }
  ]

  useEffect(() => {
    if (title === "All Categories") {
      onCategories()
    } else if (title === "All Game Assets") {
      onGameAssets()
    } else if (title === "All Devices") {
      setGameData(device)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (onTitle && (onTitle as IDropdownAll)._id) {
      if (title === "All Categories") {
        setCategoryDropdown((onTitle as IDropdownAll)._id)
      } else if (title === "All Game Assets") {
        setGameItemDropdown((onTitle as IDropdownAll)._id)
      } else if (title === "All Devices") {
        setDeviceDropdown((onTitle as IDropdownAll)._id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTitle])

  return (
    <>
      {gameData && (
        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={handleOnExpandClick}
            className={`${className} mb-1 flex h-[40px] w-[218px] flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary`}
          >
            <AllCategoriesIcon />
            <span className="">
              {onTitle === undefined ? title : (onTitle as IMenuBase).label}
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
            className={`${className} mt-10 rounded-[19px]`}
            sx={{
              backgroundColor: "#010101D9",
              zIndex: 99999,
              position: "absolute",
              width: "218px"
            }}
          >
            <SelectDropdown
              details={dataDetail}
              setOnTitle={setOnTitle}
              setExpanded={setExpanded}
            />
          </Collapse>
        </div>
      )}
    </>
  )
}
export default DropdownCustom
