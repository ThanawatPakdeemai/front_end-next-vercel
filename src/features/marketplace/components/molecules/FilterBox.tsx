import SearchIcon from "@components/icons/SearchIcon"
import { Collapse, InputAdornment, TextField, Typography } from "@mui/material"
import React, { memo, useMemo, useState } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import INaka from "@components/icons/Naka"
import SpeedHeight from "@components/icons/marketplace/SpeedHeight"
import SpeedLow from "@components/icons/marketplace/SpeedLow"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import { NextRouter, useRouter } from "next/router"
import DropdownIcon from "@components/icons/DropdownIcon"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import { MENU_MARKETPLACE } from "@configs/menu"
import useMarketFilterStore from "@stores/marketFilter"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ITypeBuild } from "@feature/building/interfaces/IBuildingService"
import useMarketCategTypes, { TCategory } from "@stores/marketCategTypes"
import { ITypeMaterials } from "@feature/material/marketplace/interfaces/IMaterialService"

const FilterBox = () => {
  const router: NextRouter = useRouter()
  const pathName = router.asPath.split("/").pop()
  const isP2P = router.asPath.includes("p2p")
  const isInventory = router.asPath.search("inventory")

  const {
    search,
    sort,
    filter,
    onSetSearch,
    onSetSort,
    onSetFilter,
    onResetSort,
    onResetSearch,
    onResetFilter
  } = useMarketFilterStore()

  const [expanded, setExpanded] = useState<boolean>(false)
  const [expandedPrice, setExpandedPrice] = useState<boolean>(false)
  const [expandDate, setExpandDate] = useState<boolean>(false)
  const [expandType, setExpandType] = useState<boolean>(false)
  const [land, setLand] = useState<string>("Land")
  const [text, setText] = useState<string>("")
  const [wallet, setWallet] = useState<string>("")
  const [price, setPrice] = useState<string>("Price")
  const [date, setDate] = useState<string>("Date")
  const [type, setType] = useState<string>("Type")

  const { category, fetchStatus, getCurrentTypes } = useMarketCategTypes()

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleOnExpandPrice = () => {
    setExpandedPrice(!expandedPrice)
  }
  const handleOnExpandDate = () => {
    setExpandDate(!expandDate)
  }
  const handleOnExpandType = () => {
    setExpandType(!expandType)
  }

  const onFilterChange = (
    _category: TCategory,
    _value: IGameItemListData | ITypeMaterials | ITypeBuild
  ) => {
    let _checked: boolean = false
    switch (_category) {
      case "game_item":
        _checked = !!filter.find((f) => f === _value.id)
        break
      case "nft_land":
        _checked =
          "name_type" in _value
            ? !!filter.find((f) => f === _value.name_type)
            : false
        break
      case "nft_building":
        _checked =
          "model_id" in _value
            ? !!filter.find((f) => f === _value.model_id.toString())
            : false
        break
      case "nft_material":
        _checked =
          "name_type" in _value
            ? !!filter.find((f) => f === _value.name_type)
            : false
        break
      default:
        _checked = false
        break
    }
    return _checked
  }

  const onSelectedFilterValue = (
    _category: TCategory,
    _value: IGameItemListData | ITypeMaterials | ITypeBuild
  ) => {
    let _data: string = ""
    switch (_category) {
      case "game_item":
        _data = _value.id
        break
      case "nft_land":
        _data = "name_type" in _value ? _value.name_type : ""
        break
      case "nft_building":
        _data = "model_id" in _value ? _value.model_id.toString() : ""
        break
      case "nft_material":
        _data = "name_type" in _value ? _value.name_type : ""
        break
      default:
        break
    }
    return _data
  }

  const FilterData = useMemo(() => {
    let _arr: Array<
      (IGameItemListData | ITypeMaterials | ITypeBuild) & { checked: boolean }
    > = []
    if (fetchStatus) {
      const _curTypes = getCurrentTypes(category)
      if (_curTypes) {
        _arr = _curTypes.map((i) => ({
          ...i,
          checked: onFilterChange(category, i)
        }))
      }
    }
    return _arr
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, category, fetchStatus])

  // eslint-disable-next-line no-unused-vars
  const obj = sort.reduce((acc, curr) => Object.assign(acc, curr), {})
  // eslint-disable-next-line no-unused-vars
  const obj2 = search.reduce((acc, curr) => Object.assign(acc, curr), {})

  const listFilter = isP2P ? "P2P Market" : "NAKA Market"

  //  const handleResetSearch = () => {
  //    onResetSort()
  //    onResetSearch()
  //    setText("")
  //  }

  const handleCheckboxChange = ({
    _value,
    _checked
  }: {
    _value: string
    _checked: boolean
  }) => {
    const updatedFilter = { value: _value, checked: _checked }
    onSetFilter([updatedFilter])
  }

  const PRICELIST = [
    { label: "Lowest to Highest", value: 1 },
    { label: "Highest to Lowest", value: -1 }
  ]
  const TYPELIST = [
    {
      label: "Installment",
      value: "installment"
    },
    {
      label: "Fullpayment",
      value: "fullpayment"
    },
    {
      label: "Rental",
      value: "rental"
    }
  ]
  const DATELIST = [
    { label: "New", value: -1 },
    { label: "Oldest", value: 1 }
  ]

  return (
    <div className="grid gap-3">
      {isInventory !== -1 ? null : (
        <>
          <button
            type="button"
            onClick={handleOnExpandClick}
            className="mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-secondary-main px-5 text-[12px] text-white-primary"
          >
            <DragHandleIcon />
            <span>
              {pathName === "marketplace" ? land : pathName?.toString()}
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
            className="mt-10 w-[200px] rounded-[19px] p-2"
            sx={{
              backgroundColor: "#232329",
              zIndex: 99999,
              position: "absolute",
              width: "218px"
            }}
          >
            {MENU_MARKETPLACE &&
              MENU_MARKETPLACE.map((menu) => (
                <div key={menu.name}>
                  {menu.name === listFilter && (
                    <>
                      {menu.chide?.map((item) => {
                        const active = router.asPath.includes(item.link)
                        return (
                          <MenuItemCustom
                            key={item.name}
                            label={item.name}
                            icon=""
                            href={item.link}
                            id={item.name}
                            external={false}
                            active={active}
                            onClick={() => {
                              setLand(item.name)
                              setExpanded(!expanded)
                            }}
                          />
                        )
                      })}
                    </>
                  )}
                </div>
              ))}
          </Collapse>

          {(category === "nft_building" ||
            category === "nft_game" ||
            category === "nft_land" ||
            pathName === "marketplace") && (
            <>
              <Typography className="text-xs uppercase text-neutral-500">
                {category === "nft_land" || pathName === "marketplace"
                  ? "Land ID"
                  : "NFT Token"}
              </Typography>
              <TextField
                className="w-full"
                placeholder="e.g. 11900011"
                // onKeyDown={(event) => {
                //   if (event.key === "Enter" && text !== "") {
                //     pathName === "marketplace" || category === "nft_land"
                //       ? onSetSearch({ key: "land_id", value: text })
                //       : onSetSearch({ key: "nft_token", value: text })
                //   }
                // }}
                InputProps={{
                  style: {
                    fontSize: "14px",
                    fontFamily: "neueMachina",
                    width: "100%",
                    padding: 8
                  },
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className="cursor-pointer"
                      onClick={() => {}}
                    >
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(_event) => {
                  setText(_event.target.value)
                  // onSetSearch({ key: "land_id", value: text })
                  pathName === "marketplace" || category === "nft_land"
                    ? onSetSearch({ key: "land_id", value: text })
                    : onSetSearch({ key: "nft_token", value: text })
                }}
                value={text}
              />
            </>
          )}
        </>
      )}

      <div className="my-4 h-[10px] w-full rounded-[13px] bg-[url('/images/services/curvy-line.png')]" />
      <div className="flex justify-between rounded-lg border-2 border-neutral-700 p-3">
        <Typography className="text-sm uppercase text-white-default">
          filter
        </Typography>
        <div className="flex">
          <ArrowBackIcon
            color="secondary"
            sx={{ fontSize: 15 }}
          />
          <Typography
            component="button"
            onClick={() => {
              onResetSort()
              onResetSearch()
              setText("")
              setWallet("")
              setPrice("Price")
              setDate("Date")
              setType("Type")
            }}
            className="ml-2 cursor-pointer self-center text-xs uppercase text-secondary-main"
          >
            Clear
          </Typography>
        </div>
      </div>
      {(category === "nft_land" ||
        category === "game_item" ||
        category === "nft_material" ||
        category === "nft_building" ||
        category === "nft_naka_punk" ||
        category === "nft_game") && (
        <div>
          <Typography className="text-xs uppercase text-neutral-500">
            Wallet address
          </Typography>
          <TextField
            className="w-full"
            placeholder="e.g. 0x20E7B302f92185098082988c482C4218f5c58695"
            InputProps={{
              style: {
                fontSize: "14px",
                fontFamily: "neueMachina",
                width: "100%",
                padding: 8
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  className="cursor-pointer"
                  onClick={() => {}}
                >
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={(_event) => {
              setWallet(_event.target.value)
              if (wallet) {
                onSetSearch({ key: "seller_id", value: wallet })
              }
              // const searchWallet = _event?.target?.value
              // if (searchWallet) {
              //   onSetSearch({ key: "seller_id", value: searchWallet })
              // }
            }}
            value={wallet}
          />
        </div>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={handleOnExpandPrice}
          className="mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary"
        >
          <span>{price}</span>
          <div
            className={`${
              expandedPrice === true
                ? "rotate-180 transition-all duration-300"
                : "rotate-0 transition-all duration-300"
            }`}
          >
            <DropdownIcon />
          </div>
        </button>
        <Collapse
          in={expandedPrice}
          timeout="auto"
          className="absolute top-0 mt-10 w-[200px] rounded-[19px] p-2"
          sx={{
            backgroundColor: "#232329",
            zIndex: 99999,
            position: "absolute",
            width: "218px"
          }}
        >
          {PRICELIST.map((item) => (
            <MenuItemCustom
              key={item.label}
              label={item.label}
              icon=""
              href=""
              id=""
              external={false}
              active
              onClick={() => {
                setPrice(item.label)
                onSetSort({ key: "price", value: item.value })
                setExpandedPrice(!expandedPrice)
              }}
            />
          ))}
        </Collapse>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={handleOnExpandDate}
          className="mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary"
        >
          <span>{date}</span>
          <div
            className={`${
              expandDate === true
                ? "rotate-180 transition-all duration-300"
                : "rotate-0 transition-all duration-300"
            }`}
          >
            <DropdownIcon />
          </div>
        </button>
        <Collapse
          in={expandDate}
          timeout="auto"
          className="absolute top-0 mt-10 w-[200px] rounded-[19px] p-2"
          sx={{
            backgroundColor: "#232329",
            zIndex: 99999,
            position: "absolute",
            width: "218px"
          }}
        >
          {DATELIST.map((item) => (
            <MenuItemCustom
              key={item.label}
              label={item.label}
              icon=""
              href=""
              id=""
              external={false}
              active
              onClick={() => {
                setDate(item.label)
                onSetSort({ key: "created_at", value: item.value })
                setExpandDate(!expandDate)
              }}
            />
          ))}
        </Collapse>
      </div>

      {(category === "nft_land" ||
        category === "game_item" ||
        category === "nft_building" ||
        category === "nft_game") && (
        <div className="relative">
          <button
            type="button"
            onClick={handleOnExpandType}
            className="mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary"
          >
            <span>{type}</span>
            <div
              className={`${
                expandType === true
                  ? "rotate-180 transition-all duration-300"
                  : "rotate-0 transition-all duration-300"
              }`}
            >
              <DropdownIcon />
            </div>
          </button>
          <Collapse
            in={expandType}
            timeout="auto"
            className="absolute top-0 mt-10 w-[200px] rounded-[19px] p-2"
            sx={{
              backgroundColor: "#232329",
              zIndex: 99999,
              position: "absolute",
              width: "218px"
            }}
          >
            {TYPELIST.map((item) => (
              <MenuItemCustom
                key={item.label}
                label={item.label}
                icon=""
                href=""
                id=""
                external={false}
                active
                onClick={() => {
                  setType(item.label)
                  onSetSearch({ key: "selling_type", value: item.value })
                  setExpandType(!expandType)
                }}
              />
            ))}
          </Collapse>
        </div>
      )}

      <Typography className="text-xs uppercase text-neutral-500">
        Price Range (NAKA)
      </Typography>
      <TextField
        className="w-full"
        placeholder="00.0"
        InputProps={{
          style: {
            fontSize: "14px",
            fontFamily: "neueMachina",
            width: "100%"
          },
          startAdornment: (
            <InputAdornment position="start">
              <div className="flex items-center	">
                <SpeedHeight />
                <Typography className="ml-2 text-xs uppercase text-neutral-500">
                  max
                </Typography>
              </div>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              className="cursor-pointer"
              onClick={() => {}}
            >
              <INaka color="#E1E2E2" />
            </InputAdornment>
          )
        }}
        onChange={(_event) => {
          // const search = _event?.target?.value
        }}
      />
      <TextField
        className="w-full"
        placeholder="00.0"
        InputProps={{
          style: {
            fontSize: "14px",
            fontFamily: "neueMachina",
            width: "100%"
          },
          startAdornment: (
            <InputAdornment position="start">
              <div className="flex items-center	">
                <SpeedLow />
                <Typography className="ml-2 text-xs uppercase text-neutral-500">
                  min
                </Typography>
              </div>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              className="cursor-pointer"
              onClick={() => {}}
            >
              <INaka color="#E1E2E2" />
            </InputAdornment>
          )
        }}
        onChange={(_event) => {}}
      />
      <div className="my-4 h-[10px] w-full rounded-[13px] bg-[url('/images/services/curvy-line.png')]" />
      <div className="flex justify-between rounded-lg border-2 border-neutral-700 p-3">
        <Typography className="text-sm uppercase text-white-default">
          Resource type
        </Typography>
        <div className="flex">
          <ArrowBackIcon
            color="secondary"
            sx={{ fontSize: 15 }}
          />
          <Typography
            component="button"
            onClick={() => {
              // setIsCheck(!isCheck)
              // setCheckBoxKey((prevKey) => prevKey + 1)
              // setCheckBoxKey(checkBoxKey + 1)
              onResetFilter()
            }}
            className="corsor-pointer ml-2 self-center text-xs uppercase text-secondary-main"
          >
            Clear
          </Typography>
        </div>
      </div>
      <div>
        {FilterData &&
          FilterData.filter(
            (item, index, self) =>
              self.findIndex((t) => t.name === item.name) === index
          ).map((item) => (
            <CheckBoxNaka
              // key={checkBoxKey}
              key={item.name}
              value={item.checked}
              onHandle={() => {
                handleCheckboxChange({
                  _value: onSelectedFilterValue(category, item),
                  _checked: onFilterChange(category, item)
                })
              }}
              text={item.name}
              className="mr-4 items-center self-center uppercase"
              fontStyle="text-xs text-black-default"
              img={item.image}
            />
          ))}
      </div>
    </div>
  )
}

export default memo(FilterBox)
