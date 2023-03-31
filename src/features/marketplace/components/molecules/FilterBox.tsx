import SearchIcon from "@components/icons/SearchIcon"
import { InputAdornment, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ButtonDropdown from "@feature/gameItem/atoms/ButtonDropdown"
import INaka from "@components/icons/Naka"
import SpeedHeight from "@components/icons/marketplace/SpeedHeight"
import SpeedLow from "@components/icons/marketplace/SpeedLow"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import { useRouter } from "next/router"
import { TType } from "@feature/marketplace/interfaces/IMarketService"

const FilterBox = () => {
  const router = useRouter()
  // const { marketType } = useGlobal()

  // const pathName = router.asPath.includes("land")

  const pathName = router.asPath.split("/").pop()

  // const [marketType, setMarketType] = useState<TNFTType>()
  // const pathName = router.asPath.split("/")[1]

  const [marketType, setMarketType] = useState<TType>()

  useEffect(() => {
    let load = false

    if (!load) {
      if (router.asPath.includes("p2p/land")) {
        setMarketType("land")
      } else if (router.asPath.includes("p2p/building")) {
        setMarketType("building")
      } else if (router.asPath.includes("p2p/naka-punk")) {
        setMarketType("naka-punk")
      } else if (router.asPath.includes("p2p/material")) {
        setMarketType("material")
      } else if (router.asPath.includes("game-item")) {
        setMarketType("game-item")
      } else if (router.asPath.includes("arcade-game")) {
        setMarketType("arcade-game")
      }
    }
    return () => {
      load = true
    }
  }, [router.asPath])

  const CHIEKLIST = [
    {
      name: "Land",
      img: "/images/logo/Logo-Master1.png"
    },
    {
      name: "Building",
      img: "/images/logo/Logo-Master1.png"
    },
    {
      name: "NAKA Punks",
      img: "/images/logo/Logo-Master1.png"
    }
  ]

  return (
    <div className="grid w-full gap-3">
      <ButtonDropdown
        className="bg-secondary-main text-white-primary"
        leftContent={
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="px-2 uppercase">=</p>
            </div>
            <p className="px-2 text-white-primary">Game Asset</p>
          </div>
        }
        isOpen={false}
      />
      {(marketType === "building" ||
        marketType === "arcade-game" ||
        marketType === "land" ||
        pathName === "marketplace") && (
        <>
          <Typography className="text-xs uppercase text-neutral-500">
            {marketType === "land" || pathName === "land"
              ? "NFT Token"
              : "Land ID"}
          </Typography>
          <TextField
            className="w-full"
            placeholder="e.g. 11900011"
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
              // const search = _event?.target?.value
            }}
          />
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
            onClick={() => {}}
            className="ml-2 cursor-pointer self-center text-xs uppercase text-secondary-main"
          >
            Clear
          </Typography>
        </div>
      </div>
      {(marketType === "land" ||
        marketType === "game-item" ||
        marketType === "material" ||
        marketType === "naka-punk" ||
        marketType === "arcade-game") && (
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
              // const search = _event?.target?.value
            }}
          />
        </div>
      )}

      <ButtonDropdown
        leftContent={
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="px-2 uppercase">=</p>
            </div>
            <p className="px-2 text-[#ffffff]">price</p>
          </div>
        }
        isOpen={false}
      />
      <ButtonDropdown
        leftContent={
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="px-2 uppercase">=</p>
            </div>
            <p className="px-2 text-[#ffffff]">date</p>
          </div>
        }
        isOpen={false}
      />
      {(marketType === "land" ||
        marketType === "game-item" ||
        marketType === "building" ||
        marketType === "arcade-game") && (
        <ButtonDropdown
          leftContent={
            <div className="flex items-center">
              <div className="flex items-center">
                <p className="px-2 uppercase">=</p>
              </div>
              <p className="px-2 text-[#ffffff]">type</p>
            </div>
          }
          isOpen={false}
        />
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
          // console.log("search", search)
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
            onClick={() => {}}
            className="corsor-pointer ml-2 self-center text-xs uppercase text-secondary-main"
          >
            Clear
          </Typography>
        </div>
      </div>
      <div>
        {CHIEKLIST &&
          CHIEKLIST.map((item) => (
            <CheckBoxNaka
              key={item.name}
              value={false}
              onHandle={() => {}}
              text={item.name}
              className="mr-4 items-center self-center uppercase"
              fontStyle="text-xs text-black-default"
              img={item.img}
            />
          ))}
      </div>
    </div>
  )
}

export default FilterBox
