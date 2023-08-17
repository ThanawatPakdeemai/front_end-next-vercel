/* eslint-disable no-nested-ternary */
import React, { useState } from "react"
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack
} from "@mui/material"
import { useTranslation } from "react-i18next"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import dynamic from "next/dynamic"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const ModalHeader = dynamic(
  () => import("@components/molecules/Modal/ModalHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const GameItemSingleCard = dynamic(
  () => import("@components/atoms/GameItemSingleCard"),
  {
    suspense: true,
    ssr: false
  }
)

interface IItemLists {
  _id: string
  name: string
  detail: string
  price: number
  min_item: number
  item_id_smartcontract: number
  item_size: string
  image_icon: string
  image_icon_color: string
  image: string
  id?: string
}

type IItems = IItemLists[]

interface IHowto {
  title: string
  details: string
}

interface IProps {
  gameDetails: string
  howto: IHowto
  item: IItems
}

type IMenuList = "game_details" | "how_to_play" | "game_items"

const MoreDetailGameMobile = ({ gameDetails = "", howto, item }: IProps) => {
  const listMenu = [
    { label: "game_details", icon: <Icomoon className="icon-Book" /> },
    { label: "how_to_play", icon: <SportsEsportsIcon /> },
    { label: "game_items", icon: <Icomoon className="icon-Dollar" /> }
  ]
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [toggleModal, setToggleModal] = useState(false)
  const [menuList, setMenuList] = useState<IMenuList>("game_details")

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleModel = (_menu) => {
    setMenuList(_menu)
    setToggleModal(!toggleModal)
  }

  const stylePopover = {
    "&.MuiListItemButton-root:hover": {
      backgroundColor: "#70727b2b"
    }
  }

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        className="pl-5"
      >
        <MoreVertIcon style={{ color: "#A6A9AE" }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <List>
          {listMenu.map((_elm) => (
            <ListItem
              disablePadding
              key={_elm.label}
            >
              <ListItemButton
                sx={stylePopover}
                onClick={() => handleModel(_elm.label)}
              >
                <ListItemIcon>{_elm.icon}</ListItemIcon>
                <ListItemText primary={t(_elm.label)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
      <ModalCustom
        open={toggleModal}
        onClose={() => setToggleModal(false)}
        className="m-auto gap-3 rounded-[34px] p-[10px] max-[420px]:w-[370px]"
        width={515}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2 uppercase">
            <ModalHeader
              handleClose={() => setToggleModal(false)}
              title={t(
                menuList === "game_details"
                  ? "game_details"
                  : menuList === "how_to_play"
                  ? "how_to_play"
                  : "game_items"
              )}
            />
          </div>

          <Box
            component="div"
            className="hide-scroll flex h-[220px] w-full flex-col overflow-y-scroll"
          >
            {menuList === "game_details" ? (
              <p className="mt-2.5 text-sm">{gameDetails}</p>
            ) : menuList === "how_to_play" ? (
              <div>
                <h3 className="font-neue-machina-bold">{howto.title}</h3>
                <Box
                  component="div"
                  className="custom-scroll overflow-y-scroll"
                >
                  <div
                    className="mt-2.5 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: howto.details || ""
                    }}
                  />
                </Box>
              </div>
            ) : (
              item.map((_elm, _index) => (
                <Box
                  component="div"
                  key={_elm._id}
                  className="mx-auto my-0 py-2"
                >
                  <GameItemSingleCard
                    image={_elm.image}
                    name={`${_elm.name} ${_elm.price.toString()}`}
                    description={`${_elm.name} ${_elm.price.toString()}$`}
                    showLink
                    itemId={_elm._id}
                  />
                </Box>
              ))
            )}
          </Box>
        </Stack>
      </ModalCustom>
    </>
  )
}

export default MoreDetailGameMobile
