import { Collapse, InputAdornment, TextField, Typography } from "@mui/material"
import React, { memo, useMemo, useState } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { NextRouter, useRouter } from "next/router"
import DropdownIcon from "@components/icons/DropdownIcon"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import {
  MARKET_FILTER_DATE,
  MARKET_FILTER_PRICE,
  MARKET_FILTER_SELLINGTYPE,
  MENU_MARKETPLACE_FILTERBOX
} from "@configs/menu"
import useMarketFilterStore from "@stores/marketFilter"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ITypeBuild } from "@feature/building/interfaces/IBuildingService"
import useMarketCategTypes, { TCategory } from "@stores/marketCategTypes"
import { ITypeMaterials } from "@feature/material/marketplace/interfaces/IMaterialService"
import useGlobal from "@hooks/useGlobal"
import Helper from "@utils/helper"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import SpeedHeight from "@components/icons/marketplace/SpeedHeight"
import INaka from "@components/icons/Naka"
import SpeedLow from "@components/icons/marketplace/SpeedLow"
import MenuIcon from "@mui/icons-material/Menu"
import ResourceTree from "./ResourceTree"
import FilterSearchBox from "./FilterSearchBox"
import SearchDropDown from "./SearchDropDown"

const FilterBox = () => {
  const router: NextRouter = useRouter()
  // const isInventory = router.asPath.includes("inventory")
  const isForSale = router.asPath.includes("forsale")
  const isP2P = router.asPath.includes("p2p")
  const { convertNFTTypeToTType, getValueFromTKey } = Helper

  const {
    search,
    sort,
    onSetSearch,
    onSetSort,
    onSetFilterType,
    onResetSort,
    onResetSearch,
    onResetFilterType,
    filterType
  } = useMarketFilterStore()

  const [expanded, setExpanded] = useState<boolean>(false)
  const [expandedPrice, setExpandedPrice] = useState<boolean>(false)
  const [expandDate, setExpandDate] = useState<boolean>(false)
  const [expandType, setExpandType] = useState<boolean>(false)
  /* eslint-disable no-unused-vars */
  const [land, setLand] = useState<string>("Land")
  const [text, setText] = useState<string>("")
  const [wallet, setWallet] = useState<string>("")
  const [price, setPrice] = useState<string>("Price")
  const [date, setDate] = useState<string>("Date")
  const [type, setType] = useState<string>("Type")
  const [searchReset, setSearchReset] = useState<boolean>(false)

  const { fetchStatus, getCurrentTypes } = useMarketCategTypes()
  const { isMarketplace, marketType } = useGlobal()

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
        _checked = !!filterType.game_item.find((f) => f === _value.id)
        break
      case "nft_land":
        _checked =
          "name_type" in _value
            ? !!filterType.nft_land.find((f) => f === _value.name_type)
            : false
        break
      case "nft_building":
        _checked =
          "model_id" in _value
            ? !!filterType.nft_building.find(
                (f) => f === _value.model_id.toString()
              )
            : false
        break
      case "nft_material":
        _checked =
          "name_type" in _value
            ? !!filterType.nft_material.find((f) => f === _value.name_type)
            : false
        break
      default:
        _checked =
          "name_type" in _value
            ? !!filterType.nft_land.find((f) => f === _value.name_type)
            : false
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
        // /marketplace no marketTypes
        _data = "name_type" in _value ? _value.name_type : ""
        break
    }
    return _data
  }

  const _resourceType = useMemo(() => {
    let _arr: Array<
      (IGameItemListData | ITypeMaterials | ITypeBuild) & { checked: boolean }
    > = []
    if (fetchStatus && filterType) {
      const _curTypes = getCurrentTypes(marketType || "nft_land")
      if (_curTypes) {
        _arr = _curTypes.map((i) => ({
          ...i,
          checked: onFilterChange(marketType, i)
        }))
      }
    }
    return _arr
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, marketType, fetchStatus])

  const _gameItemType = useMemo(() => {
    let _arr: Array<IGameItemListData> = []
    if (fetchStatus) {
      _arr = getCurrentTypes("game_item") as Array<IGameItemListData>
    }
    return _arr
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus])

  const handleCheckboxChange = ({
    _value,
    _checked
  }: {
    _value: string
    _checked: boolean
  }) => {
    const updatedFilter = { value: _value, checked: _checked }
    onSetFilterType(marketType || "nft_land", [updatedFilter])
  }

  const _menuDropDown = useMemo(() => {
    let _menu: { name: string; href: string }[] = []
    if (router.asPath.includes("/p2p")) {
      _menu =
        MENU_MARKETPLACE_FILTERBOX.find((f) => f.page === "p2p")?.child || []
    } else if (router.asPath.includes("/forsale")) {
      _menu =
        MENU_MARKETPLACE_FILTERBOX.find((f) => f.page === "forsale")?.child ||
        []
    } else if (router.asPath.includes("/rental")) {
      _menu =
        MENU_MARKETPLACE_FILTERBOX.find((f) => f.page === "rental")?.child || []
    } else if (router.asPath.includes("process-payment")) {
      _menu =
        MENU_MARKETPLACE_FILTERBOX.find((f) => f.page === "process-payment")
          ?.child || []
    } else if (router.asPath.includes("inventory")) {
      _menu =
        MENU_MARKETPLACE_FILTERBOX.find((f) => f.page === "inventory")?.child ||
        []
    } else {
      _menu =
        MENU_MARKETPLACE_FILTERBOX.find((f) => f.page === "marketplace")
          ?.child || []
    }
    return _menu
  }, [router.asPath])

  const _priceLabel = useMemo(() => {
    let _date: string = "price"
    if (
      sort &&
      sort.length > 0 &&
      (getValueFromTKey(sort, "price") as number)
    ) {
      const _label = MARKET_FILTER_PRICE.find(
        (d) => d.value === (getValueFromTKey(sort, "price") as number)
      )
      if (_label) _date = _label.label
    }
    return _date
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort])

  const _dateLabel = useMemo(() => {
    let _date: string = "date"
    if (
      sort &&
      sort.length > 0 &&
      (getValueFromTKey(sort, "created_at") as number)
    ) {
      const _label = MARKET_FILTER_DATE.find(
        (d) => d.value === (getValueFromTKey(sort, "created_at") as number)
      )
      if (_label) _date = _label.label
    }
    return _date
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort])

  const _typeLabel = useMemo(() => {
    let _date: string = "selling type"
    if (
      search &&
      search.length > 0 &&
      (getValueFromTKey(search, "selling_type") as string)
    ) {
      const _label = MARKET_FILTER_SELLINGTYPE.find(
        (d) => d.value === (getValueFromTKey(search, "selling_type") as string)
      )
      if (_label) _date = _label.label
    }
    return _date
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  return (
    <div className="grid w-52 gap-3 ">
      <section>
        <button
          type="button"
          onClick={handleOnExpandClick}
          className="mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 bg-secondary-main px-5 text-[12px] text-white-primary"
        >
          <MenuIcon
            className="!rotate-0 text-white-primary "
            fontSize="small"
          />
          <span className="text-white capitalize">
            {convertNFTTypeToTType(marketType || "nft_land")}
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
          className="mt-10 flex w-[200px] flex-col rounded-[19px] p-2"
          sx={{
            backgroundColor: "#232329",
            zIndex: 99999,
            position: "absolute",
            width: "218px"
          }}
        >
          {_menuDropDown.map((ele) => {
            const active = router.asPath.includes(ele.href)
            return (
              <MenuItemCustom
                key={ele.name}
                id={ele.name}
                label={ele.name}
                icon=""
                href={ele.href}
                external={false}
                active={active}
                onClick={() => {
                  setExpanded(!expanded)
                }}
                byPassOnClick
              />
            )
          })}
        </Collapse>
      </section>

      <div className="my-4 h-[10px] w-full rounded-[13px] bg-[url('/images/services/curvy-line.png')]" />

      <div className="flex justify-between rounded-lg border-2 border-neutral-700 p-3">
        <Typography className="text-sm uppercase text-white-default">
          search
        </Typography>
        <div className="flex">
          <ArrowBackIcon
            color="secondary"
            sx={{ fontSize: 15 }}
          />
          <Typography
            component="button"
            onClick={() => {
              if (search && search.length > 0) onResetSearch()
              setSearchReset((prev: boolean) => !prev)
            }}
            className="ml-2 cursor-pointer self-center text-xs uppercase text-secondary-main"
          >
            Clear
          </Typography>
        </div>
      </div>
      <FilterSearchBox
        title="NFT Token"
        placeholder="e.g. 11900011"
        onClick={(_value) => {
          onSetSearch({ key: "nft_token", value: _value })
        }}
        onKey={(event, _value) => {
          if (event.key === "Enter") {
            event.preventDefault()
            onSetSearch({
              key: "nft_token",
              value: _value
            })
          }
        }}
        reset={searchReset}
      />
      {isP2P ? (
        <FilterSearchBox
          title="wallet address"
          placeholder="e.g. 0x20E7B302f92185098082988c482C4218f5c58695"
          onClick={(_value) => {
            onSetSearch({ key: "seller_id", value: _value })
          }}
          reset={searchReset}
        />
      ) : null}
      {(isP2P || isForSale) &&
      marketType !== "game_item" &&
      marketType !== "nft_material" ? (
        <>
          <SearchDropDown
            title={_typeLabel}
            dropDown={MARKET_FILTER_SELLINGTYPE}
            onClick={(_value) =>
              onSetSearch({ key: "selling_type", value: _value as string })
            }
          />
          {/* <>
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
              onChange={(_event) => {}}
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
          </> */}
        </>
      ) : null}
      {isP2P || isForSale ? (
        <>
          <div className="my-4 h-[10px] w-full rounded-[13px] bg-[url('/images/services/curvy-line.png')]" />
          <div className="flex justify-between rounded-lg border-2 border-neutral-700 p-3">
            <Typography className="text-sm uppercase text-white-default">
              sort
            </Typography>
            <div className="flex">
              <ArrowBackIcon
                color="secondary"
                sx={{ fontSize: 15 }}
              />
              <Typography
                component="button"
                onClick={() => {
                  if (sort && sort.length > 0) onResetSort()
                }}
                className="ml-2 cursor-pointer self-center text-xs uppercase text-secondary-main"
              >
                Clear
              </Typography>
            </div>
          </div>
          <SearchDropDown
            title={_priceLabel}
            dropDown={MARKET_FILTER_PRICE}
            onClick={(_value) =>
              onSetSort({ key: "price", value: _value as number })
            }
          />
          <SearchDropDown
            title={_dateLabel}
            dropDown={MARKET_FILTER_DATE}
            onClick={(_value) =>
              onSetSort({ key: "created_at", value: _value as number })
            }
          />
        </>
      ) : null}

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

      <div className="relative">
        <button
          type="button"
          onClick={handleOnExpandPrice}
          className="mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[8px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary"
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
          className="absolute top-0 mt-10 w-[200px] rounded-[19px] border-[6px] border-[#010101] p-1"
          sx={{
            backgroundColor: "#18181C",
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
          className="mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[8px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary"
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
          className="absolute top-0 mt-10 w-[200px] rounded-[19px] border-[6px] border-[#010101] p-1"
          sx={{
            backgroundColor: "#18181C",
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
      <div className="relative">
        <button
          type="button"
          onClick={handleOnExpandType}
          className="mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[8px] border-[1px] border-solid border-neutral-700 bg-neutral-800 px-5 text-[12px] text-black-default hover:text-white-primary"
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
          className="absolute top-0 mt-10 w-[200px] rounded-[19px] border-[6px] border-[#010101] p-1"
          sx={{
            backgroundColor: "#18181C",
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
              if (
                filterType &&
                (filterType.game_item.length > 0 ||
                  filterType.nft_land.length > 0 ||
                  filterType.nft_building.length > 0 ||
                  filterType.nft_material.length > 0)
              )
                onResetFilterType()
            }}
            className="corsor-pointer ml-2 self-center text-xs uppercase text-secondary-main"
          >
            Clear
          </Typography>
        </div>
      </div>
      <div>
        {marketType !== "game_item" && _resourceType && _resourceType.length > 0
          ? _resourceType
              .filter(
                (item, index, self) =>
                  self.findIndex((t) => t.name === item.name) === index
                // filter building level 2 & 3
              )
              .map((item) => (
                <CheckBoxNaka
                  key={item.name}
                  value={item.checked}
                  onHandle={() => {
                    handleCheckboxChange({
                      _value: onSelectedFilterValue(marketType, item),
                      _checked: onFilterChange(marketType, item)
                    })
                  }}
                  text={item.name}
                  className="mr-4 items-center self-center uppercase"
                  fontStyle="text-xs text-black-default"
                  img={item.image}
                />
              ))
          : null}
        {marketType === "game_item" && _gameItemType && _gameItemType.length > 0
          ? _gameItemType
              .filter(
                (item, index, self) =>
                  self.findIndex((t) => t.name === item.name) === index
              )
              .map((element) => (
                <ResourceTree
                  key={element._id}
                  _main={element}
                  _data={_gameItemType.filter((f) => f.name === element.name)}
                />
              ))
          : null}
      </div>
    </div>
  )
}

export default memo(FilterBox)
