import ButtonClose from "@components/atoms/button/ButtonClose"
import Dropdown from "@components/atoms/DropdownCustom"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import SearchIcon from "@components/icons/SearchIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"

export interface IHeaderRoomList {
  lobby: string
}

const HeaderRoomList = ({ lobby }: IHeaderRoomList) => {
  const router = useRouter()

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800">
            <ButtonClose onClick={() => router.back()} />
          </div>
          <h1 className="text-white-defzault self-center uppercase">
            Lobby :{lobby}
            <Typography className="text-secondary-main">Skull XL</Typography>
          </h1>
        </div>
        <div className="flex">
          <Dropdown
            title="All Categories"
            className="w-[174px] rounded-lg"
          />
          <TextField
            className="px-2"
            placeholder="Search Room"
            InputProps={{
              style: {
                fontSize: "14px",
                fontFamily: "neueMachina",
                width: "174px"
              },
              startAdornment: <SearchIcon className="mr-4" />
            }}
          />
          <ButtonToggleIcon
            handleClick={() => router.reload()}
            startIcon={<PlusIcon />}
            text="Create Room"
            className="btn-rainbow-theme z-[2] h-[50px] w-[156px] bg-secondary-main font-bold capitalize text-white-primary"
          />
        </div>
      </div>
    </>
  )
}

export default HeaderRoomList
