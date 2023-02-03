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
  IGameCategory,
  IGameItem
} from "@feature/dropdown/interfaces/IDropdownService"
import SelectDropdown from "./selectDropdown/SelectDropdown"

interface IProp {
  icon?: React.ReactNode
  title: string
  className: string
}

const Dropdown = ({ title, className }: IProp) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [gameData, setGameData] = useState<
    IGameItem[] | IGameCategory[] | IDevice[]
  >([])
  const [onTitle, setOnTitle] = useState<IGameCategory | IGameItem>()
  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }
  const { errorToast } = useToast()

  const onGameAssets = () => {
    getGameAssets()
      .then((res) => {
        res.splice(0, 0, {
          create_date: "2022-05-17T03:23:54.313Z",
          _id: "63059f49f700aaf1893132fe",
          current_time: "2022-05-17T07:46:59.620Z",
          name: "All Game Assets",
          detail: "The marble can be used in other games such as NAKA ZAKA",
          is_active: true,
          price: 0.5,
          min_item: 1,
          item_id_smartcontract: 43,
          model_id: 43,
          image_icon_color:
            "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/d58df97a040197b02da514b92645cfde/icon_color/marble_red.png",
          image_icon:
            "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/d58df97a040197b02da514b92645cfde/icon/marble_white.png",
          image:
            "https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/game_item/d58df97a040197b02da514b92645cfde/image/marble.png",
          item_size: "0.5$",
          craft_time: 60,
          id: "all"
        })
        setGameData(res)

        // eslint-disable-next-line no-console
        console.log("status", res)
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

  // const onGameAlls = () => {
  //   getGameAlls()
  //     .then((res) => {
  //       // setGameData(res)
  //       // eslint-disable-next-line no-console
  //       console.log("status_All", res)
  //     })
  //     .catch((error) => {
  //       errorToast(error.message)
  //     })
  // }

  const device = [
    {
      key: "all",
      name: "All Devices",
      supported: true
    },
    {
      key: "mobile",
      name: "Mobile and Tablet",
      supported: true
    },
    {
      key: "desktop",
      name: "Desktop",
      supported: true
    }
  ]

  useEffect(() => {
    // eslint-disable-next-line no-console
    if (title === "All Categories") {
      onCategories()
    } else if (title === "All Game Assets") {
      onGameAssets()
    } else if (title === "All Devices") {
      setGameData(device)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {gameData && (
        <div>
          <button
            type="button"
            onClick={handleOnExpandClick}
            className={`${className} mb-1 flex h-[40px] w-[218px] flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary`}
          >
            {onTitle ? "" : <AllCategoriesIcon />}
            <span className="">
              {onTitle === undefined ? title : onTitle.name}
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
            className="rounded-[19px]"
            sx={{
              backgroundColor: "#010101D9",
              zIndex: 99999,
              position: "absolute",
              width: "218px"
            }}
          >
            <SelectDropdown
              className={className}
              details={gameData}
              setOnTitle={setOnTitle}
              setExpanded={setExpanded}
            />
          </Collapse>
        </div>
      )}
    </>
  )
}
export default Dropdown
