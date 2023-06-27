import { Collapse, Typography } from "@mui/material"
import React, { memo, useMemo, useState } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { NextRouter, useRouter } from "next/router"
import DropdownIcon from "@components/icons/DropdownIcon"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import {
  MARKET_FILTER_DATE,
  MARKET_FILTER_MAP,
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
import MenuButtonExpandMobile from "@feature/page/marketplace/mobilescreen/MenuButtonExpandMobile"
import ResourceTree from "./ResourceTree"
import FilterSearchBox from "./FilterSearchBox"
import SearchDropDown from "./SearchDropDown"

const FilterBox = () => {
  const router: NextRouter = useRouter()
  // const isInventory = router.asPath.includes("inventory")
  const isForSale = router.asPath.includes("forsale")
  const isP2P = router.asPath.includes("p2p")
  const isMap = router.asPath.includes("map")
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

  const [searchReset, setSearchReset] = useState<boolean>(false)

  const { fetchStatus, getCurrentTypes } = useMarketCategTypes()
  const { marketType } = useGlobal()

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
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

  const _infoLabel = useMemo(() => {
    let _info: string = "Explore land slots"
    if (
      search &&
      search.length > 0 &&
      (getValueFromTKey(search, "infomap") as string)
    ) {
      const _label = MARKET_FILTER_MAP.find(
        (d) => d.value === getValueFromTKey(search, "infomap")
      )
      if (_label) _info = _label.label
    }
    return _info
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className="grid w-52 gap-3 ">
      {!isMap && (
        <section>
          <button
            type="button"
            onClick={handleOnExpandClick}
            className="mx-auto mb-1 flex h-[40px] w-full flex-row items-center justify-between rounded-[8px] border-[1px] border-solid border-neutral-700 bg-secondary-main px-5 text-[12px] text-white-primary"
          >
            <MenuButtonExpandMobile
              isOpen={expanded}
              strokeWidth="1"
              color="#F1F4F4"
              transition={{
                ease: "easeOut",
                duration: 0.2,
                stiffness: 10,
                bounce: 5
              }}
              width="16"
              height="10"
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
            className="absolute mt-[-4px] w-[200px] rounded-[19px] border-[6px] border-[#010101] p-1"
            sx={{
              backgroundColor: "#18181C",
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
      )}

      {!isMap && (
        <div className="my-4 h-[6px] w-full rounded-[13px] bg-[url('/images/services/curvy-line2.png')] bg-repeat-x" />
      )}

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
      {isP2P || isMap ? (
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
          <div className="my-4 h-[6px] w-full rounded-[13px] bg-[url('/images/services/curvy-line2.png')] bg-repeat-x" />
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
      {isMap ? (
        <>
          <div className="my-4 h-[6px] w-full rounded-[13px] bg-[url('/images/services/curvy-line2.png')] bg-repeat-x" />
          <div className="flex justify-between rounded-lg border-2 border-neutral-700 p-3">
            <Typography className="text-sm uppercase text-white-default">
              Land Slot
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
          <SearchDropDown
            title={_infoLabel}
            dropDown={MARKET_FILTER_MAP}
            onClick={(_value) => onSetSearch({ key: "infomap", value: _value })}
          />
        </>
      ) : null}
      <div>
        {marketType !== "game_item" &&
        _resourceType &&
        _resourceType.length > 0 ? (
          <section>
            <div className="mb-4 flex justify-between rounded-lg border-2 border-neutral-700 p-3">
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
            {marketType === "nft_building"
              ? _resourceType
                  .filter((item) => "level" in item && item.level === 1)
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
              : _resourceType
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
                  ))}
          </section>
        ) : null}
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
